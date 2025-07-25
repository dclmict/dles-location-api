#!/bin/bash

# Script to convert .env file variables into Vault KV-v2 secrets, using a config .env file for Vault settings and custom secret key
# Handles values in secrets and config .env files with surrounding double quotes (e.g., DL_APP1="dclm" or VAULT_ADDR="https://vault.dclmict.org") by removing quotes

# Check if required arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <secrets_env_file_path> <config_env_file_path>"
    exit 1
fi

SECRETS_ENV_FILE=$1
CONFIG_ENV_FILE=$2

# Check if secrets env file exists
if [ ! -f "$SECRETS_ENV_FILE" ]; then
    echo "Error: Secrets environment file $SECRETS_ENV_FILE not found"
    exit 1
fi

# Check if config env file exists
if [ ! -f "$CONFIG_ENV_FILE" ]; then
    echo "Error: Config environment file $CONFIG_ENV_FILE not found"
    exit 1
fi

# Load variables from config .env file
while IFS='=' read -r key value; do
    if [[ -z "$key" || "$key" =~ ^# ]]; then
        continue
    fi
    key=$(echo "$key" | tr -d '[:space:]')
    value=$(echo "$value" | tr -d '[:space:]')
    
    # Remove surrounding double quotes from value, if present
    value=$(echo "$value" | sed 's/^"\(.*\)"$/\1/')
    
    case "$key" in
        VAULT_ADDR) VAULT_ADDR="$value" ;;
        VAULT_TOKEN) VAULT_TOKEN="$value" ;;
        VAULT_MOUNT_PATH) VAULT_MOUNT_PATH="$value" ;;
        VAULT_SECRET_KEY) VAULT_SECRET_KEY="$value" ;;
    esac
done < "$CONFIG_ENV_FILE"

# Validate required config variables
if [ -z "$VAULT_ADDR" ]; then
    echo "Error: VAULT_ADDR is not set in $CONFIG_ENV_FILE"
    exit 1
fi
if [ -z "$VAULT_TOKEN" ]; then
    echo "Error: VAULT_TOKEN is not set in $CONFIG_ENV_FILE"
    exit 1
fi
if [ -z "$VAULT_MOUNT_PATH" ]; then
    echo "Error: VAULT_MOUNT_PATH is not set in $CONFIG_ENV_FILE"
    exit 1
fi
if [ -z "$VAULT_SECRET_KEY" ]; then
    echo "Error: VAULT_SECRET_KEY is not set in $CONFIG_ENV_FILE"
    exit 1
fi

# Construct SECRET_PATH
SECRET_PATH="$VAULT_MOUNT_PATH/data/$VAULT_SECRET_KEY"

# Check if Vault is accessible
curl --header "X-Vault-Token: $VAULT_TOKEN" \
     --silent \
     "$VAULT_ADDR/v1/sys/health" > /dev/null
if [ $? -ne 0 ]; then
    echo "Error: Unable to connect to Vault at $VAULT_ADDR"
    exit 1
fi

# Read secrets .env file and create JSON payload
JSON_DATA="{ \"data\": {"
first=true
has_pairs=false

while IFS='=' read -r key value; do
    # Skip empty lines, comments, or lines without '='
    if [[ -z "$key" || "$key" =~ ^# || -z "$value" ]]; then
        continue
    fi
    
    # Remove leading/trailing whitespace
    key=$(echo "$key" | tr -d '[:space:]')
    value=$(echo "$value" | tr -d '[:space:]')
    
    # Skip if key or value is empty after trimming
    if [[ -z "$key" || -z "$value" ]]; then
        continue
    fi
    
    # Remove surrounding double quotes from value, if present
    value=$(echo "$value" | sed 's/^"\(.*\)"$/\1/')
    
    # Add comma before new key-value pairs (except first)
    if [ "$first" = false ]; then
        JSON_DATA+=","
    fi
    
    # Escape quotes in value for JSON
    value=$(echo "$value" | sed 's/"/\\"/g')
    JSON_DATA+="\"$key\": \"$value\""
    first=false
    has_pairs=true
done < "$SECRETS_ENV_FILE"

# Check if any valid key-value pairs were found
if [ "$has_pairs" = false ]; then
    echo "Error: No valid key-value pairs found in $SECRETS_ENV_FILE"
    exit 1
fi

JSON_DATA+="} }"

# Debug: Print JSON_DATA for verification
# echo "DEBUG: JSON_DATA=$JSON_DATA"

# Write secrets to Vault
curl --header "X-Vault-Token: $VAULT_TOKEN" \
     --header "Content-Type: application/json" \
     --request POST \
     --data "$JSON_DATA" \
     --silent \
     "$VAULT_ADDR/v1/$SECRET_PATH" > /dev/null

if [ $? -eq 0 ]; then
    echo "Successfully stored secrets in Vault at $SECRET_PATH"
else
    echo "Error: Failed to store secrets in Vault"
    exit 1
fi
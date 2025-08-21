// dto/create-metadata.dto.ts
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  LOCATION_TYPE,
  LOCATION_STATUS,
  METADATA_BOUNDARY_TYPE,
} from 'src/consts';
import { faker } from '@faker-js/faker';
import { v6 as uuid } from 'uuid';

export class CreateLocationAddressDto {
  @ApiPropertyOptional({ example: faker.location.street() })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ example: faker.location.city() })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: faker.location.state() })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: faker.location.country() })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: faker.location.zipCode('######') })
  @IsOptional()
  @IsString()
  postal_code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;
}

export class CreateLocationBoundaryDto {
  @ApiPropertyOptional({
    example: {
      lat: faker.location.latitude(),
      long: faker.location.longitude(),
    },
  })
  @IsOptional()
  boundary_geojson?: object;

  @ApiPropertyOptional({ enum: METADATA_BOUNDARY_TYPE })
  @IsOptional()
  @IsEnum(METADATA_BOUNDARY_TYPE)
  boundary_type?: METADATA_BOUNDARY_TYPE;

  @ApiPropertyOptional({ example: faker.location.timeZone() })
  @IsOptional()
  @IsString()
  timezone?: string;
}

export class CreateMetadataDto {
  @ApiProperty({ example: 'DCLM HQ' })
  @IsString()
  name: string;

  @ApiProperty({ example: uuid() })
  @IsString()
  location_id: string;

  @ApiProperty({ enum: LOCATION_TYPE })
  @IsEnum(LOCATION_TYPE)
  type: LOCATION_TYPE;

  @ApiPropertyOptional({ enum: LOCATION_STATUS })
  @IsOptional()
  @IsEnum(LOCATION_STATUS)
  status?: LOCATION_STATUS;

  @ApiPropertyOptional({ example: 'DL000000001' })
  @IsOptional()
  @IsString()
  admin?: string;

  @ApiPropertyOptional({ example: uuid() })
  @IsOptional()
  @IsString()
  language_id?: string;

  @ApiPropertyOptional({ example: uuid() })
  @IsOptional()
  @IsString()
  lga_id?: string;

  @ApiPropertyOptional({ type: CreateLocationAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationAddressDto)
  address?: CreateLocationAddressDto;

  @ApiPropertyOptional({ type: CreateLocationBoundaryDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationBoundaryDto)
  boundary?: CreateLocationBoundaryDto;
}

export class UpdateMetadataDto extends PartialType(CreateMetadataDto) {}

export class GetMetadataParamsDto {
  @ApiProperty({ example: uuid() })
  @IsString()
  id: string;
}

export class GetMetadataByTypeDto {
  @ApiProperty({ enum: LOCATION_TYPE })
  @IsEnum(LOCATION_TYPE)
  type: LOCATION_TYPE;

  @ApiPropertyOptional({ enum: LOCATION_STATUS })
  @IsOptional()
  @IsEnum(LOCATION_STATUS)
  status?: LOCATION_STATUS;
}

export const createMetadataResponseExample = {
  status: 201,
  message: 'Location metadata created successfully',
  data: {
    id: uuid(),
    name: 'Abuja Central Zone HQ',
    code: 'ZN-020',
    type: 'zone',
    path: ['country:127', 'state:12', 'district:110', 'zone:10'],
    status: 'active',
    admin: 'DL001234567',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
  },
};

export const getMetadataByIdResponseExample = {
  status: 200,
  message: 'Data retrieved successfully',
  data: {
    id: uuid(),
    name: 'Abuja Central Zone',
    code: 'ZN-020',
    type: 'zone',
    path: ['country:nigeria', 'state:fct', 'district:abuja', 'zone:central'],
    status: 'active',
    admin: 'DL001234567',
    address: {
      id: uuid(),
      metadata_id: uuid(),
      street: 'Plot 25, Central District',
      city: 'Abuja',
      state: 'FCT',
      country: 'Nigeria',
      postal_code: '900001',
      is_primary: true,
    },
    boundary: {
      id: uuid(),
      metadata_id: uuid(),
      boundary_geojson: { long: 3.12667, lat: 4.50656 },
      boundary_type: 'administrative',
      timezone: 'Africa/Lagos',
    },
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
  },
};

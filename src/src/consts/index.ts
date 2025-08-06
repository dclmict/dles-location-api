export const attributesToExclude = ['createdAt', 'updatedAt'];

export enum METADATA_COORDINATES_ACCURACY {
  EXACT = 'exact',
  APPROXIMATE = 'approximate',
  ESTIMATED = 'estimated',
}

export enum LOCATION_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum METADATA_BOUNDARY_TYPE {
  ADMINISTRATIVE = 'administrative',
  SERVICE_AREA = 'service_area',
  COVERAGE = 'coverage',
}

export enum LOCATION_TYPE {
  ZONE = 'zone',
  COUNTRY = 'country',
  CHURCH_STATE = 'church_state',
  REGION = 'region',
  GROUP = 'group',
  DISTRICT = 'district',
}

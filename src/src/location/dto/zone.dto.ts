import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateZoneDto {
  @ApiProperty({
    example: faker.location.continent(),
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: faker.finance.currency().code,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;
}

export const createZoneResponseExample = {
  statusCode: 201,
  message: 'Zone created successfully',
  data: {
    id: '1f067fd3-1e0f-6aa0-988b-b81efa5b6cc3',
    name: 'Europe',
    currency: 'RSD',
    updatedAt: '2025-07-23T19:45:15.178Z',
    createdAt: '2025-07-23T19:45:15.178Z',
  },
};

export const getZoneByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067fd3-1e0f-6aa0-988b-b81efa5b6cc3',
    name: 'Europe',
    currency: 'RSD',
  },
};

export const getAllZonesResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067fd3-1e0f-6aa0-988b-b81efa5b6cc3',
      name: 'Europe',
      currency: 'RSD',
    },
  ],
};

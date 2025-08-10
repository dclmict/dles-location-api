import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateCountryDto {
  @ApiProperty({
    example: faker.location.country(),
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '+233',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: faker.internet.url(),
  })
  @IsNotEmpty()
  @IsString()
  flag: string;

  @ApiProperty({
    example: uuid(),
  })
  @IsNotEmpty()
  @IsString()
  zone_id: string;
}

export const createCountryResponseExample = {
  statusCode: 201,
  message: 'Country created successfully',
  data: {
    id: '1f067fc3-e76a-6db0-b382-0e57d882b3b7',
    name: 'Solomon Islands',
    code: '+233',
    flag: 'https://difficult-monocle.biz',
    zone_id: '10',
    updatedAt: '2025-07-23T19:40:27.066Z',
    createdAt: '2025-07-23T19:40:27.066Z',
  },
};

export const getAllCountriesResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067fc3-e76a-6db0-b382-0e57d882b3b7',
      name: 'Solomon Islands',
      code: '+233',
      flag: 'https://difficult-monocle.biz',
      zone_id: '10',
    },
  ],
};

export const getCountryByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067fc3-e76a-6db0-b382-0e57d882b3b7',
    name: 'Solomon Islands',
    code: '+233',
    flag: 'https://difficult-monocle.biz',
    zone_id: '10',
  },
};

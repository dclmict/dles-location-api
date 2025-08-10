import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateDistrictDto {
  @ApiProperty({ example: faker.location.street() })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: uuid(),
  })
  @IsNotEmpty()
  @IsString()
  group_id: string;
}

export const createDistrictResponseExample = {
  statusCode: 201,
  message: 'District created successfully',
  data: {
    id: '1f067ffa-14a2-6e00-9ea3-d505ca72eec0',
    name: 'Itzel Unions',
    group_id: '1',
    district_group_id: 7,
    updatedAt: '2025-07-23T20:00:26.534Z',
    createdAt: '2025-07-23T20:00:26.534Z',
  },
};

export const getDistrictsByGroupIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067ffa-14a2-6e00-9ea3-d505ca72eec0',
      name: 'Itzel Unions',
      group_id: '1',
      district_group_id: 7,
    },
  ],
};

export const getDistrictByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067ffa-14a2-6e00-9ea3-d505ca72eec0',
    name: 'Itzel Unions',
    group_id: '1',
    district_group_id: 7,
  },
};

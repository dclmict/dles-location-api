import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

export class CreateGroupDto {
  @ApiProperty({ example: faker.location.city() })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: uuid(),
  })
  @IsNotEmpty()
  @IsString()
  region_id: string;
}

export const createGroupResponseExample = {
  statusCode: 201,
  message: 'Group created successfully',
  data: {
    id: '1f067fe9-3a71-6480-a343-c8c0a662b25b',
    name: 'Waynechester',
    region_id: '12',
    group_region_id: 9,
    updatedAt: '2025-07-23T19:52:58.716Z',
    createdAt: '2025-07-23T19:52:58.716Z',
  },
};

export const getGroupsByRegionIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067fe9-3a71-6480-a343-c8c0a662b25b',
      name: 'Waynechester',
      region_id: '12',
      group_region_id: 9,
    },
  ],
};

export const getGroupByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067fe9-3a71-6480-a343-c8c0a662b25b',
    name: 'Waynechester',
    region_id: '12',
    group_region_id: 9,
  },
};

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

export class CreateRegionDto {
  @ApiProperty({
    example: faker.location.city(),
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: uuid(),
  })
  @IsNotEmpty()
  @IsString()
  church_state_id?: string;
}

export const createRegionResponseExample = {
  statusCode: 201,
  message: 'Region created successfully',
  data: {
    id: '1f067ed4-446d-6c10-8f16-9e4f228d8c1b',
    name: 'Ernserton',
    church_state_id: '32',
    region_state_id: 25,
    updatedAt: '2025-07-23T19:02:09.473Z',
    createdAt: '2025-07-23T19:02:09.473Z',
  },
};

export const getRegionsByChurchStateIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067ed4-446d-6c10-8f16-9e4f228d8c1b',
      name: 'Ernserton',
      church_state_id: '32',
      region_state_id: 25,
    },
  ],
};

export const getRegionByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067ed4-446d-6c10-8f16-9e4f228d8c1b',
    name: 'Ernserton',
    church_state_id: '32',
    region_state_id: 25,
  },
};

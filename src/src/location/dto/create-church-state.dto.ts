import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

export class CreateChurchStateDto {
  @ApiProperty({
    example: faker.location.state(),
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: uuid(),
  })
  @IsNotEmpty()
  @IsString()
  country_id: string;
}

export const createChurchStateResponseExample = {
  statusCode: 201,
  message: 'Church state created successfully',
  data: {
    id: '1f067fb4-981f-6030-ba28-d4c9d93cd8d7',
    name: 'North Carolina',
    country_id: '127',
    state_country_id: 56,
    updatedAt: '2025-07-23T19:29:18.738Z',
    createdAt: '2025-07-23T19:29:18.738Z',
  },
};

export const getChurchStateByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067fb4-981f-6030-ba28-d4c9d93cd8d7',
    name: 'North Carolina',
    country_id: '127',
    state_country_id: 56,
  },
};

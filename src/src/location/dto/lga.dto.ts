import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateLGADto {
  @ApiProperty({
    example: faker.location.state(),
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: uuid(),
  })
  @IsNotEmpty()
  @IsString()
  state_id: string;
}

export const createLGAResponseExample = {
  statusCode: 201,
  message: 'LGA created successfully',
  data: {
    id: '1f067fb9-fa83-6aa0-9442-58863966f38f',
    name: 'Iowa',
    state_id: '127',
    updatedAt: '2025-07-23T19:33:05.413Z',
    createdAt: '2025-07-23T19:33:05.413Z',
  },
};

export const getLGAsByStateIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067fb9-fa83-6aa0-9442-58863966f38f',
      name: 'Iowa',
      state_id: '127',
    },
  ],
};

export const getLGAByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067fb9-fa83-6aa0-9442-58863966f38f',
    name: 'Iowa',
    state_id: '127',
  },
};

import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({
    example: faker.location.language().name,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export const createLanguageResponseExample = {
  statusCode: 201,
  message: 'Language created successfully',
  data: {
    id: '1f067fd3-1e0f-6aa0-988b-b81efa5b6cc3',
    name: 'English',
    updatedAt: '2025-07-23T19:45:15.178Z',
    createdAt: '2025-07-23T19:45:15.178Z',
  },
};

export const getLanguageByIdResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: {
    id: '1f067fd3-1e0f-6aa0-988b-b81efa5b6cc3',
    name: 'English',
  },
};

export const getAllLanguagesResponseExample = {
  statusCode: 200,
  message: 'Data retrieved successfully',
  data: [
    {
      id: '1f067fd3-1e0f-6aa0-988b-b81efa5b6cc3',
      name: 'English',
    },
  ],
};

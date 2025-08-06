import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMetadataDto,
  UpdateMetadataDto,
  GetMetadataParamsDto,
  GetMetadataByTypeDto,
  createMetadataResponseExample,
  getMetadataByIdResponseExample,
} from './dto';
import { PaginationMetadataDto } from 'src/utils/dto';

@ApiTags('Location Metadata')
@Controller('location-metadata')
export class MetadataController {
  constructor(private readonly locationMetadataService: MetadataService) {}

  @Post()
  @ApiOperation({ summary: 'Create location metadata' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Location metadata created successfully',
    example: createMetadataResponseExample,
  })
  createMetadata(@Body() createMetadataDto: CreateMetadataDto) {
    return this.locationMetadataService.createMetadata(createMetadataDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location metadata by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getMetadataByIdResponseExample,
  })
  getMetadataById(@Param() params: GetMetadataParamsDto) {
    return this.locationMetadataService.getMetadataById(params.id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get location metadata by code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
  })
  getMetadataByCode(@Param('code') code: string) {
    return this.locationMetadataService.getMetadataByCode(code);
  }

  @Get()
  @ApiOperation({ summary: 'Get all location metadata with pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
  })
  getAllMetadata(@Query() paginationMetadataDto: PaginationMetadataDto) {
    return this.locationMetadataService.getAllMetadata(paginationMetadataDto);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get location metadata by type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
  })
  getMetadataByType(@Query() query: GetMetadataByTypeDto) {
    return this.locationMetadataService.getMetadataByType(query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update location metadata' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Location metadata updated successfully',
  })
  updateMetadata(
    @Param() params: GetMetadataParamsDto,
    @Body() updateMetadataDto: UpdateMetadataDto,
  ) {
    return this.locationMetadataService.updateMetadata(
      params.id,
      updateMetadataDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete location metadata' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Location metadata deleted successfully',
  })
  deleteMetadata(@Param() params: GetMetadataParamsDto) {
    return this.locationMetadataService.deleteMetadata(params.id);
  }
}

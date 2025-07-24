import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { GrpcMethod } from '@nestjs/microservices';
// import { GetPoliticalStatePayload } from 'src/types/proto/location/GetPoliticalStatePayload';
// import { GetPoliticalStateResponse } from 'src/types/proto/location/GetPoliticalStateResponse';
import {
  CreateChurchStateDto,
  createChurchStateResponseExample,
  CreateCountryDto,
  createCountryResponseExample,
  CreateDistrictDto,
  createDistrictResponseExample,
  CreateGroupDto,
  createGroupResponseExample,
  CreatePoliticalStateDto,
  createPoliticalStateResponseExample,
  CreateRegionDto,
  createRegionResponseExample,
  CreateZoneDto,
  createZoneResponseExample,
  getPoliticalStateByIdResponseExample,
} from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GetPoliticalStatePayload,
  GetPoliticalStateResponse,
} from 'src/types/proto/index.location';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/zone')
  @ApiOperation({ summary: 'Create a zone' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Zone created successfully',
    type: CreateZoneDto,
    example: createZoneResponseExample,
  })
  createZone(@Body() createZoneDto: CreateZoneDto) {
    return this.locationService.createZone(createZoneDto);
  }

  @Post('/country')
  @ApiOperation({ summary: 'Create a country' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Country created successfully',
    type: CreateCountryDto,
    example: createCountryResponseExample,
  })
  createCountry(@Body() createCountryDto: CreateCountryDto) {
    return this.locationService.createCountry(createCountryDto);
  }

  @Post('/political-state')
  @ApiOperation({ summary: 'Create a political state' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Political state created successfully',
    type: CreatePoliticalStateDto,
    example: createPoliticalStateResponseExample,
  })
  createPoliticalState(
    @Body() createPoliticalStateDto: CreatePoliticalStateDto,
  ) {
    return this.locationService.createPoliticalState(createPoliticalStateDto);
  }

  @Post('/church-state')
  @ApiOperation({ summary: 'Create a church state' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Church state created successfully',
    type: CreateChurchStateDto,
    example: createChurchStateResponseExample,
  })
  createChurchState(@Body() createChurchStateDto: CreateChurchStateDto) {
    return this.locationService.createChurchState(createChurchStateDto);
  }

  @Post('/region')
  @ApiOperation({ summary: 'Create a region' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Region created successfully',
    type: CreateRegionDto,
    example: createRegionResponseExample,
  })
  createRegion(@Body() createRegionDto: CreateRegionDto) {
    return this.locationService.createRegion(createRegionDto);
  }

  @Post('/group')
  @ApiOperation({ summary: 'Create a group' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Group created successfully',
    type: CreateGroupDto,
    example: createGroupResponseExample,
  })
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.locationService.createGroup(createGroupDto);
  }

  @Post('/district')
  @ApiOperation({ summary: 'Create a district' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'District created successfully',
    type: CreateDistrictDto,
    example: createDistrictResponseExample,
  })
  createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    return this.locationService.createDistrict(createDistrictDto);
  }

  @Get('/political-state/:id')
  @ApiOperation({ summary: 'Get a political state by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getPoliticalStateByIdResponseExample,
  })
  getPoliticalStateById(@Param('id') id: string) {
    return this.locationService.getPoliticalStateById(id);
  }
}

@Controller()
export class GrpcLocationController {
  constructor(private readonly locationService: LocationService) {}

  @GrpcMethod('LocationService')
  async getPoliticalState({
    id,
  }: GetPoliticalStatePayload): Promise<GetPoliticalStateResponse> {
    const { data } = await this.locationService.getPoliticalStateById(id);
    return { political_state: data! };
  }
}

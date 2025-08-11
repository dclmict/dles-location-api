import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { GrpcMethod } from '@nestjs/microservices';
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
  getAllCountriesResponseExample,
  getAllZonesResponseExample,
  getChurchStateByIdResponseExample,
  getChurchStatesByCountryIdResponseExample,
  getCountryByIdResponseExample,
  getDistrictByIdResponseExample,
  getDistrictsByGroupIdResponseExample,
  getGroupByIdResponseExample,
  getGroupsByRegionIdResponseExample,
  getPoliticalStateByIdResponseExample,
  getPoliticalStatesByCountryIdResponseExample,
  getRegionByIdResponseExample,
  getRegionsByChurchStateIdResponseExample,
  getZoneByIdResponseExample,
} from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GetAllZonesResponse,
  GetChurchStatePayload,
  GetChurchStateResponse,
  GetCountryPayload,
  GetCountryResponse,
  GetDistrictPayload,
  GetDistrictResponse,
  GetGroupPayload,
  GetGroupResponse,
  GetPoliticalStatePayload,
  GetPoliticalStateResponse,
  GetRegionPayload,
  GetRegionResponse,
  GetZonePayload,
  GetZoneResponse,
} from 'src/types/proto/index.location';
import {
  CreateLGADto,
  createLGAResponseExample,
  getLGAByIdResponseExample,
  getLGAsByStateIdResponseExample,
} from './dto/lga.dto';

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

  @Post('/lga')
  @ApiOperation({ summary: 'Create an LGA' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'LGA created successfully',
    type: CreateLGADto,
    example: createLGAResponseExample,
  })
  createLGA(@Body() createLGADto: CreateLGADto) {
    return this.locationService.createLGA(createLGADto);
  }

  @Get('/zone')
  @ApiOperation({ summary: 'Get all zones' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getAllZonesResponseExample,
  })
  getAllZonesById() {
    return this.locationService.getAllZones();
  }

  @Get('/zone/:id')
  @ApiOperation({ summary: 'Get a zone by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getZoneByIdResponseExample,
  })
  getZoneById(@Param('id') id: string) {
    return this.locationService.getZoneById(id);
  }

  @Get('/country')
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getAllCountriesResponseExample,
  })
  getAllCountries() {
    return this.locationService.getAllCountries();
  }

  @Get('/country/zone/:id')
  @ApiOperation({ summary: 'Get all countries in a zone' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getAllCountriesResponseExample,
  })
  getCountriesByZone(@Param('id') id: string) {
    return this.locationService.getCountriesByZone(id);
  }

  @Get('/country/:id')
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getCountryByIdResponseExample,
  })
  getCountryById(@Param('id') id: string) {
    return this.locationService.getCountryById(id);
  }

  @Get('/political-state/country/:id')
  @ApiOperation({ summary: 'Get all political states by country id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getPoliticalStatesByCountryIdResponseExample,
  })
  getPoliticalStatesByCountryId(@Param('id') id: string) {
    return this.locationService.getPoliticalStatesByCountryId(id);
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

  @Get('/church-state/country/:id')
  @ApiOperation({ summary: 'Get all church states by country id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getChurchStatesByCountryIdResponseExample,
  })
  getChurchStatesByCountryId(@Param('id') id: string) {
    return this.locationService.getChurchStatesByCountryId(id);
  }

  @Get('/church-state/:id')
  @ApiOperation({ summary: 'Get a church state by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getChurchStateByIdResponseExample,
  })
  getChurchStateById(@Param('id') id: string) {
    return this.locationService.getChurchStateById(id);
  }

  @Get('/region/church-state/:id')
  @ApiOperation({ summary: 'Get all regions by church state id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getRegionsByChurchStateIdResponseExample,
  })
  getRegionsByChurchStateId(@Param('id') id: string) {
    return this.locationService.getRegionsByChurchStateId(id);
  }

  @Get('/region/:id')
  @ApiOperation({ summary: 'Get a region by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getRegionByIdResponseExample,
  })
  getRegionById(@Param('id') id: string) {
    return this.locationService.getRegionById(id);
  }

  @Get('/group/region/:id')
  @ApiOperation({ summary: 'Get all groups by region id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getGroupsByRegionIdResponseExample,
  })
  getGroupsByRegionId(@Param('id') id: string) {
    return this.locationService.getGroupsByRegionId(id);
  }

  @Get('/group/:id')
  @ApiOperation({ summary: 'Get a group by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getGroupByIdResponseExample,
  })
  getGroupById(@Param('id') id: string) {
    return this.locationService.getGroupById(id);
  }

  @Get('/district/group/:id')
  @ApiOperation({ summary: 'Get all districts by group id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getDistrictsByGroupIdResponseExample,
  })
  getDistrictsByGroupId(@Param('id') id: string) {
    return this.locationService.getDistrictsByGroupId(id);
  }

  @Get('/district/:id')
  @ApiOperation({ summary: 'Get a district by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getDistrictByIdResponseExample,
  })
  getDistrictById(@Param('id') id: string) {
    return this.locationService.getDistrictById(id);
  }

  @Get('/lga/state/:id')
  @ApiOperation({ summary: 'Get all lgas by state id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getLGAsByStateIdResponseExample,
  })
  getLGAsByStateId(@Param('id') id: string) {
    return this.locationService.getLGAsByStateId(id);
  }

  @Get('/lga/:id')
  @ApiOperation({ summary: 'Get an lga by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data retrieved successfully',
    example: getLGAByIdResponseExample,
  })
  getLGAById(@Param('id') id: string) {
    return this.locationService.getLGAById(id);
  }
}

@Controller()
export class GrpcLocationController {
  constructor(private readonly locationService: LocationService) {}

  @GrpcMethod('LocationService')
  async getAllZones(): Promise<GetAllZonesResponse> {
    const { data } = await this.locationService.getAllZones();
    return { zones: data };
  }

  @GrpcMethod('LocationService')
  async getZone({ id }: GetZonePayload): Promise<GetZoneResponse> {
    const { data } = await this.locationService.getZoneById(id);
    return { zone: data! };
  }

  @GrpcMethod('LocationService')
  async getCountry({ id }: GetCountryPayload): Promise<GetCountryResponse> {
    const { data } = await this.locationService.getCountryById(id);
    return { country: data! };
  }

  @GrpcMethod('LocationService')
  async getPoliticalState({
    id,
  }: GetPoliticalStatePayload): Promise<GetPoliticalStateResponse> {
    const { data } = await this.locationService.getPoliticalStateById(id);
    return { political_state: data! };
  }

  @GrpcMethod('LocationService')
  async getChurchState({
    id,
  }: GetChurchStatePayload): Promise<GetChurchStateResponse> {
    const { data } = await this.locationService.getChurchStateById(id);
    return { church_state: data! };
  }

  @GrpcMethod('LocationService')
  async getRegion({ id }: GetRegionPayload): Promise<GetRegionResponse> {
    const { data } = await this.locationService.getRegionById(id);
    return { region: data! };
  }

  @GrpcMethod('LocationService')
  async getGroup({ id }: GetGroupPayload): Promise<GetGroupResponse> {
    const { data } = await this.locationService.getGroupById(id);
    return { group: data! };
  }

  @GrpcMethod('LocationService')
  async getDistrict({ id }: GetDistrictPayload): Promise<GetDistrictResponse> {
    const { data } = await this.locationService.getDistrictById(id);
    return { district: data! };
  }
}

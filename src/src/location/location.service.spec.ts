/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import {
  mockCountry,
  mockDistrict,
  mockGroup,
  mockPoliticalState,
  mockRegion,
  mockZone,
} from './__mocks__/location.mock';
import { UtilsService } from 'src/utils/utils.service';
import {
  createChurchStateResponseExample,
  createCountryResponseExample,
  createDistrictResponseExample,
  createGroupResponseExample,
  createPoliticalStateResponseExample,
  createRegionResponseExample,
  createZoneResponseExample,
  getChurchStateByIdResponseExample,
  getCountryByIdResponseExample,
  getDistrictByIdResponseExample,
  getGroupByIdResponseExample,
  getPoliticalStateByIdResponseExample,
  getRegionByIdResponseExample,
  getZoneByIdResponseExample,
} from './dto';
import { getModelToken } from '@nestjs/sequelize';
import {
  ChurchState,
  Country,
  District,
  Group,
  PoliticalState,
  Region,
  Zone,
} from 'src/models';
import { HttpException } from '@nestjs/common';
import { MockedModel } from 'src/types';

describe('LocationService', () => {
  let locationService: LocationService;
  let zoneModel: MockedModel<Zone>;
  let countryModel: MockedModel<Country>;
  let politicalStateModel: MockedModel<PoliticalState>;
  let churchStateModel: MockedModel<ChurchState>;
  let regionModel: MockedModel<Region>;
  let groupModel: MockedModel<Group>;
  let districtModel: MockedModel<District>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        UtilsService,
        {
          provide: getModelToken(Zone),
          useValue: {
            create: jest.fn().mockResolvedValue(createZoneResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getZoneByIdResponseExample.data),
          },
        },
        {
          provide: getModelToken(Country),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createCountryResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getCountryByIdResponseExample.data),
          },
        },
        {
          provide: getModelToken(PoliticalState),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createPoliticalStateResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getPoliticalStateByIdResponseExample.data),
          },
        },
        {
          provide: getModelToken(ChurchState),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createChurchStateResponseExample.data),
            findOne: jest
              .fn()
              .mockResolvedValue(getChurchStateByIdResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getChurchStateByIdResponseExample.data),
          },
        },
        {
          provide: getModelToken(Region),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createRegionResponseExample.data),
            findOne: jest
              .fn()
              .mockResolvedValue(getRegionByIdResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getRegionByIdResponseExample.data),
          },
        },
        {
          provide: getModelToken(Group),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createGroupResponseExample.data),
            findOne: jest
              .fn()
              .mockResolvedValue(getGroupByIdResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getGroupByIdResponseExample.data),
          },
        },
        {
          provide: getModelToken(District),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createDistrictResponseExample.data),
            findOne: jest
              .fn()
              .mockResolvedValue(getDistrictByIdResponseExample.data),
            findByPk: jest
              .fn()
              .mockResolvedValue(getDistrictByIdResponseExample.data),
          },
        },
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
    zoneModel = module.get(getModelToken(Zone));
    countryModel = module.get(getModelToken(Country));
    politicalStateModel = module.get(getModelToken(PoliticalState));
    churchStateModel = module.get(getModelToken(ChurchState));
    regionModel = module.get(getModelToken(Region));
    groupModel = module.get(getModelToken(Group));
    districtModel = module.get(getModelToken(District));
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });

  // CREATE TESTS
  describe('createZone', () => {
    it('should call LocationService.createZone and return the result', async () => {
      const result = await locationService.createZone(mockZone);

      expect(result).toEqual(createZoneResponseExample);
      expect(zoneModel.create).toHaveBeenCalledWith(mockZone);
    });

    it('should throw HttpException when creation fails', async () => {
      zoneModel.create.mockRejectedValue(new Error('Database error'));

      await expect(locationService.createZone(mockZone)).rejects.toBeInstanceOf(
        HttpException,
      );
    });
  });

  describe('createCountry', () => {
    it('should call LocationService.createCountry and return the result', async () => {
      const result = await locationService.createCountry(mockCountry);

      expect(result).toEqual(createCountryResponseExample);
      expect(countryModel.create).toHaveBeenCalledWith(mockCountry);
    });

    it('should throw HttpException when creation fails', async () => {
      countryModel.create.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.createCountry(mockCountry),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createPoliticalState', () => {
    it('should call LocationService.createPoliticalState and return the result', async () => {
      const result =
        await locationService.createPoliticalState(mockPoliticalState);

      expect(result).toEqual(createPoliticalStateResponseExample);
      expect(politicalStateModel.create).toHaveBeenCalledWith(
        mockPoliticalState,
      );
    });

    it('should throw HttpException when creation fails', async () => {
      politicalStateModel.create.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.createPoliticalState(mockPoliticalState),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createChurchState', () => {
    it('should call LocationService.createChurchState and return the result', async () => {
      const mockChurchState = {
        ...mockPoliticalState,
        country_id: 'country-123',
      };
      churchStateModel.findOne.mockResolvedValue({ state_country_id: 5 });

      const result = await locationService.createChurchState(mockChurchState);

      expect(result).toEqual(createChurchStateResponseExample);
      expect(churchStateModel.findOne).toHaveBeenCalledWith({
        where: { country_id: 'country-123' },
        order: [['state_country_id', 'DESC']],
        attributes: ['state_country_id'],
        raw: true,
      });
      expect(churchStateModel.create).toHaveBeenCalledWith({
        ...mockChurchState,
        state_country_id: 6,
      });
    });

    it('should create with state_country_id = 1 when no existing church state', async () => {
      const mockChurchState = {
        ...mockPoliticalState,
        country_id: 'country-123',
      };
      churchStateModel.findOne.mockResolvedValue(null);

      await locationService.createChurchState(mockChurchState);

      expect(churchStateModel.create).toHaveBeenCalledWith({
        ...mockChurchState,
        state_country_id: 1,
      });
    });

    it('should call LocationService.createChurchState and fail due to missing payload', async () => {
      await expect(
        locationService.createChurchState(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createRegion', () => {
    it('should call LocationService.createRegion and return the result', async () => {
      const mockRegionWithState = {
        ...mockRegion,
        church_state_id: 'state-123',
      };
      regionModel.findOne.mockResolvedValue({ region_state_id: 3 });

      const result = await locationService.createRegion(mockRegionWithState);

      expect(result).toEqual(createRegionResponseExample);
      expect(regionModel.findOne).toHaveBeenCalledWith({
        where: { church_state_id: 'state-123' },
        order: [['region_state_id', 'DESC']],
        attributes: ['region_state_id'],
        raw: true,
      });
      expect(regionModel.create).toHaveBeenCalledWith({
        ...mockRegionWithState,
        region_state_id: 4,
      });
    });

    it('should create with region_state_id = 1 when no existing regions', async () => {
      const mockRegionWithState = {
        ...mockRegion,
        church_state_id: 'state-123',
      };
      regionModel.findOne.mockResolvedValue(null);

      await locationService.createRegion(mockRegionWithState);

      expect(regionModel.create).toHaveBeenCalledWith({
        ...mockRegionWithState,
        region_state_id: 1,
      });
    });

    it('should call LocationService.createRegion and fail due to missing payload', async () => {
      await expect(
        locationService.createRegion(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createGroup', () => {
    it('should call LocationService.createGroup and return the result', async () => {
      const mockGroupWithRegion = { ...mockGroup, region_id: 'region-123' };
      groupModel.findOne.mockResolvedValue({ group_region_id: 2 });

      const result = await locationService.createGroup(mockGroupWithRegion);

      expect(result).toEqual(createGroupResponseExample);
      expect(groupModel.findOne).toHaveBeenCalledWith({
        where: { region_id: 'region-123' },
        order: [['group_region_id', 'DESC']],
        attributes: ['group_region_id'],
        raw: true,
      });
      expect(groupModel.create).toHaveBeenCalledWith({
        ...mockGroupWithRegion,
        group_region_id: 3,
      });
    });

    it('should create with group_region_id = 1 when no existing groups', async () => {
      const mockGroupWithRegion = { ...mockGroup, region_id: 'region-123' };
      groupModel.findOne.mockResolvedValue(null);

      await locationService.createGroup(mockGroupWithRegion);

      expect(groupModel.create).toHaveBeenCalledWith({
        ...mockGroupWithRegion,
        group_region_id: 1,
      });
    });

    it('should call LocationService.createGroup and fail due to missing payload', async () => {
      await expect(
        locationService.createGroup(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createDistrict', () => {
    it('should call LocationService.createDistrict and return the result', async () => {
      const mockDistrictWithGroup = { ...mockDistrict, group_id: 'group-123' };
      districtModel.findOne.mockResolvedValue({ district_group_id: 4 });

      const result = await locationService.createDistrict(
        mockDistrictWithGroup,
      );

      expect(result).toEqual(createDistrictResponseExample);
      expect(districtModel.findOne).toHaveBeenCalledWith({
        where: { group_id: 'group-123' },
        order: [['district_group_id', 'DESC']],
        attributes: ['district_group_id'],
        raw: true,
      });
      expect(districtModel.create).toHaveBeenCalledWith({
        ...mockDistrictWithGroup,
        district_group_id: 5,
      });
    });

    it('should create with district_group_id = 1 when no existing districts', async () => {
      const mockDistrictWithGroup = { ...mockDistrict, group_id: 'group-123' };
      districtModel.findOne.mockResolvedValue(null);

      await locationService.createDistrict(mockDistrictWithGroup);

      expect(districtModel.create).toHaveBeenCalledWith({
        ...mockDistrictWithGroup,
        district_group_id: 1,
      });
    });

    it('should call LocationService.createDistrict and fail due to missing payload', async () => {
      await expect(
        locationService.createDistrict(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  // GET TESTS
  describe('getZoneById', () => {
    it('should get zone by id and return the result', async () => {
      const zoneId = 'zone-123';
      const result = await locationService.getZoneById(zoneId);

      expect(result).toEqual(getZoneByIdResponseExample);
      expect(zoneModel.findByPk).toHaveBeenCalledWith(zoneId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      zoneModel.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.getZoneById('zone-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getCountryById', () => {
    it('should get country by id and return the result', async () => {
      const countryId = 'country-123';
      const result = await locationService.getCountryById(countryId);

      expect(result).toEqual(getCountryByIdResponseExample);
      expect(countryModel.findByPk).toHaveBeenCalledWith(countryId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      countryModel.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.getCountryById('country-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getPoliticalStateById', () => {
    it('should get political state by id and return the result', async () => {
      const stateId = 'state-123';
      const result = await locationService.getPoliticalStateById(stateId);

      expect(result).toEqual(getPoliticalStateByIdResponseExample);
      expect(politicalStateModel.findByPk).toHaveBeenCalledWith(stateId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      politicalStateModel.findByPk.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(
        locationService.getPoliticalStateById('state-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getChurchStateById', () => {
    it('should get church state by id and return the result', async () => {
      const churchStateId = 'church-state-123';
      const result = await locationService.getChurchStateById(churchStateId);

      expect(result).toEqual(getChurchStateByIdResponseExample);
      expect(churchStateModel.findByPk).toHaveBeenCalledWith(churchStateId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      churchStateModel.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.getChurchStateById('church-state-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getRegionById', () => {
    it('should get region by id and return the result', async () => {
      const regionId = 'region-123';
      const result = await locationService.getRegionById(regionId);

      expect(result).toEqual(getRegionByIdResponseExample);
      expect(regionModel.findByPk).toHaveBeenCalledWith(regionId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      regionModel.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.getRegionById('region-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getGroupById', () => {
    it('should get group by id and return the result', async () => {
      const groupId = 'group-123';
      const result = await locationService.getGroupById(groupId);

      expect(result).toEqual(getGroupByIdResponseExample);
      expect(groupModel.findByPk).toHaveBeenCalledWith(groupId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      groupModel.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.getGroupById('group-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getDistrictById', () => {
    it('should get district by id and return the result', async () => {
      const districtId = 'district-123';
      const result = await locationService.getDistrictById(districtId);

      expect(result).toEqual(getDistrictByIdResponseExample);
      expect(districtModel.findByPk).toHaveBeenCalledWith(districtId, {
        attributes: { exclude: expect.any(Array) },
      });
    });

    it('should throw HttpException when findByPk fails', async () => {
      districtModel.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(
        locationService.getDistrictById('district-123'),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });
});

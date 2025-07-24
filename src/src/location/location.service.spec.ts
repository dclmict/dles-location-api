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
  getDistrictByIdResponseExample,
  getGroupByIdResponseExample,
  getRegionByIdResponseExample,
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

describe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        UtilsService,
        {
          provide: getModelToken(Zone),
          useValue: {
            create: jest.fn().mockResolvedValue(createZoneResponseExample.data),
          },
        },
        {
          provide: getModelToken(Country),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createCountryResponseExample.data),
          },
        },
        {
          provide: getModelToken(PoliticalState),
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(createPoliticalStateResponseExample.data),
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
          },
        },
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });

  describe('createZone', () => {
    it('should call LocationService.createZone and return the result', async () => {
      const result = await locationService.createZone(mockZone);

      expect(result).toEqual(createZoneResponseExample);
    });
  });

  describe('createCountry', () => {
    it('should call LocationService.createCountry and return the result', async () => {
      const result = await locationService.createCountry(mockCountry);

      expect(result).toEqual(createCountryResponseExample);
    });
  });

  describe('createPoliticalState', () => {
    it('should call LocationService.createPoliticalState and return the result', async () => {
      const result =
        await locationService.createPoliticalState(mockPoliticalState);

      expect(result).toEqual(createPoliticalStateResponseExample);
    });
  });

  describe('createChurchState', () => {
    it('should call LocationService.createChurchState and return the result', async () => {
      const result =
        await locationService.createChurchState(mockPoliticalState);

      expect(result).toEqual(createChurchStateResponseExample);
    });

    it('should call LocationService.createChurchState and fail due to missing payload', async () => {
      await expect(
        locationService.createChurchState(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createRegion', () => {
    it('should call LocationService.createRegion and return the result', async () => {
      const result = await locationService.createRegion(mockRegion);

      expect(result).toEqual(createRegionResponseExample);
    });

    it('should call LocationService.createRegion and fail due to missing payload', async () => {
      await expect(
        locationService.createRegion(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createGroup', () => {
    it('should call LocationService.createGroup and return the result', async () => {
      const result = await locationService.createGroup(mockGroup);

      expect(result).toEqual(createGroupResponseExample);
    });

    it('should call LocationService.createGroup and fail due to missing payload', async () => {
      await expect(
        locationService.createGroup(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createDistrict', () => {
    it('should call LocationService.createDistrict and return the result', async () => {
      const result = await locationService.createDistrict(mockDistrict);

      expect(result).toEqual(createDistrictResponseExample);
    });

    it('should call LocationService.createDistrict and fail due to missing payload', async () => {
      await expect(
        locationService.createDistrict(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });
});

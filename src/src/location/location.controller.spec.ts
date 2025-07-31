/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import {
  LocationController,
  GrpcLocationController,
} from './location.controller';
import { LocationService } from './location.service';
import { UtilsService } from 'src/utils/utils.service';
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
import {
  mockCountry,
  mockDistrict,
  mockGroup,
  mockPoliticalState,
  mockRegion,
  mockZone,
} from './__mocks__/location.mock';
import { HttpException } from '@nestjs/common';

describe('LocationController', () => {
  let locationController: LocationController;
  let grpcLocationController: GrpcLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController, GrpcLocationController],
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

    locationController = module.get<LocationController>(LocationController);
    grpcLocationController = module.get<GrpcLocationController>(
      GrpcLocationController,
    );
  });

  it('should be defined', () => {
    expect(locationController).toBeDefined();
    expect(grpcLocationController).toBeDefined();
  });

  // CREATE TESTS
  describe('createZone', () => {
    it('should call LocationController.createZone and return the result', async () => {
      const result = await locationController.createZone(mockZone);

      expect(result).toEqual(createZoneResponseExample);
    });
  });

  describe('createCountry', () => {
    it('should call LocationController.createCountry and return the result', async () => {
      const result = await locationController.createCountry(mockCountry);

      expect(result).toEqual(createCountryResponseExample);
    });
  });

  describe('createPoliticalState', () => {
    it('should call LocationController.createPoliticalState and return the result', async () => {
      const result =
        await locationController.createPoliticalState(mockPoliticalState);

      expect(result).toEqual(createPoliticalStateResponseExample);
    });
  });

  describe('createChurchState', () => {
    it('should call LocationController.createChurchState and return the result', async () => {
      const result =
        await locationController.createChurchState(mockPoliticalState);

      expect(result).toEqual(createChurchStateResponseExample);
    });

    it('should call LocationController.createChurchState and fail due to missing payload', async () => {
      await expect(
        locationController.createChurchState(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createRegion', () => {
    it('should call LocationController.createRegion and return the result', async () => {
      const result = await locationController.createRegion(mockRegion);

      expect(result).toEqual(createRegionResponseExample);
    });

    it('should call LocationController.createRegion and fail due to missing payload', async () => {
      await expect(
        locationController.createRegion(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createGroup', () => {
    it('should call LocationController.createGroup and return the result', async () => {
      const result = await locationController.createGroup(mockGroup);

      expect(result).toEqual(createGroupResponseExample);
    });

    it('should call LocationController.createGroup and fail due to missing payload', async () => {
      await expect(
        locationController.createGroup(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('createDistrict', () => {
    it('should call LocationController.createDistrict and return the result', async () => {
      const result = await locationController.createDistrict(mockDistrict);

      expect(result).toEqual(createDistrictResponseExample);
    });

    it('should call LocationController.createDistrict and fail due to missing payload', async () => {
      await expect(
        locationController.createDistrict(null as any),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });

  // GET TESTS - REST API
  describe('getZoneById', () => {
    it('should call LocationController.getZoneById and return the result', async () => {
      const result = await locationController.getZoneById(
        getZoneByIdResponseExample.data.id,
      );

      expect(result).toEqual(getZoneByIdResponseExample);
    });
  });

  describe('getCountryById', () => {
    it('should call LocationController.getCountryById and return the result', async () => {
      const result = await locationController.getCountryById(
        getCountryByIdResponseExample.data.id,
      );

      expect(result).toEqual(getCountryByIdResponseExample);
    });
  });

  describe('getPoliticalStateById', () => {
    it('should call LocationController.getPoliticalStateById and return the result', async () => {
      const result = await locationController.getPoliticalStateById(
        getPoliticalStateByIdResponseExample.data.id,
      );

      expect(result).toEqual(getPoliticalStateByIdResponseExample);
    });
  });

  describe('getChurchStateById', () => {
    it('should call LocationController.getChurchStateById and return the result', async () => {
      const result = await locationController.getChurchStateById(
        getChurchStateByIdResponseExample.data.id,
      );

      expect(result).toEqual(getChurchStateByIdResponseExample);
    });
  });

  describe('getRegionById', () => {
    it('should call LocationController.getRegionById and return the result', async () => {
      const result = await locationController.getRegionById(
        getRegionByIdResponseExample.data.id,
      );

      expect(result).toEqual(getRegionByIdResponseExample);
    });
  });

  describe('getGroupById', () => {
    it('should call LocationController.getGroupById and return the result', async () => {
      const result = await locationController.getGroupById(
        getGroupByIdResponseExample.data.id,
      );

      expect(result).toEqual(getGroupByIdResponseExample);
    });
  });

  describe('getDistrictById', () => {
    it('should call LocationController.getDistrictById and return the result', async () => {
      const result = await locationController.getDistrictById(
        getDistrictByIdResponseExample.data.id,
      );

      expect(result).toEqual(getDistrictByIdResponseExample);
    });
  });

  // GRPC TESTS
  describe('GrpcLocationController', () => {
    describe('getZone', () => {
      it('should call GrpcLocationController.getZone and return the result', async () => {
        const result = await grpcLocationController.getZone({
          id: getZoneByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          zone: getZoneByIdResponseExample.data,
        });
      });
    });

    describe('getCountry', () => {
      it('should call GrpcLocationController.getCountry and return the result', async () => {
        const result = await grpcLocationController.getCountry({
          id: getCountryByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          country: getCountryByIdResponseExample.data,
        });
      });
    });

    describe('getPoliticalState', () => {
      it('should call GrpcLocationController.getPoliticalState and return the result', async () => {
        const result = await grpcLocationController.getPoliticalState({
          id: getPoliticalStateByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          political_state: getPoliticalStateByIdResponseExample.data,
        });
      });
    });

    describe('getChurchState', () => {
      it('should call GrpcLocationController.getChurchState and return the result', async () => {
        const result = await grpcLocationController.getChurchState({
          id: getChurchStateByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          church_state: getChurchStateByIdResponseExample.data,
        });
      });
    });

    describe('getRegion', () => {
      it('should call GrpcLocationController.getRegion and return the result', async () => {
        const result = await grpcLocationController.getRegion({
          id: getRegionByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          region: getRegionByIdResponseExample.data,
        });
      });
    });

    describe('getGroup', () => {
      it('should call GrpcLocationController.getGroup and return the result', async () => {
        const result = await grpcLocationController.getGroup({
          id: getGroupByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          group: getGroupByIdResponseExample.data,
        });
      });
    });

    describe('getDistrict', () => {
      it('should call GrpcLocationController.getDistrict and return the result', async () => {
        const result = await grpcLocationController.getDistrict({
          id: getDistrictByIdResponseExample.data.id,
        });

        expect(result).toEqual({
          district: getDistrictByIdResponseExample.data,
        });
      });
    });
  });
});

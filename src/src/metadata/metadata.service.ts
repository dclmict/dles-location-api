/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UtilsService } from 'src/utils/utils.service';
import { attributesToExclude, LOCATION_TYPE } from 'src/consts';
import { LOCATION_STATUS } from 'src/consts';
import { Metadata, LocationAddress, LocationBoundary } from 'src/models';
import {
  CreateMetadataDto,
  UpdateMetadataDto,
  GetMetadataByTypeDto,
} from './dto';
import { PaginationMetadataDto } from 'src/utils/dto';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class MetadataService {
  constructor(
    @InjectModel(Metadata)
    private readonly metadataModel: typeof Metadata,
    @InjectModel(LocationAddress)
    private readonly locationAddressModel: typeof LocationAddress,
    @InjectModel(LocationBoundary)
    private readonly locationBoundaryModel: typeof LocationBoundary,
    private readonly utilService: UtilsService,
    private readonly locationService: LocationService,
  ) {}

  async createMetadata({
    type,
    location_id,
    status,
    admin,
    name,
    address,
    boundary,
  }: CreateMetadataDto) {
    const transaction = await this.metadataModel.sequelize?.transaction();
    try {
      const code = this.getLocaionCode(type, location_id);

      let checkExistingLocationQuery: Promise<any> | null;
      let path: string[] = [];

      switch (type) {
        case LOCATION_TYPE.ZONE:
          checkExistingLocationQuery =
            this.locationService.getZoneById(location_id);
          break;
        case LOCATION_TYPE.COUNTRY:
          checkExistingLocationQuery = this.locationService.getCountryById(
            location_id,
            true,
          );
          break;
        case LOCATION_TYPE.CHURCH_STATE:
          checkExistingLocationQuery = this.locationService.getChurchStateById(
            location_id,
            true,
          );
          break;
        case LOCATION_TYPE.REGION:
          checkExistingLocationQuery = this.locationService.getRegionById(
            location_id,
            true,
          );
          break;
        case LOCATION_TYPE.GROUP:
          checkExistingLocationQuery = this.locationService.getGroupById(
            location_id,
            true,
          );
          break;
        case LOCATION_TYPE.DISTRICT:
          checkExistingLocationQuery = this.locationService.getDistrictById(
            location_id,
            true,
          );
          break;
        default:
          checkExistingLocationQuery = null;
          break;
      }

      // Throw an error if location doesn't exist
      if (checkExistingLocationQuery) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = (await checkExistingLocationQuery).data.toJSON();

        switch (type) {
          case LOCATION_TYPE.ZONE:
            path = [`zone:${data.id}`];
            break;
          case LOCATION_TYPE.COUNTRY:
            path = [`country:${data.id}`, `zone:${data.zone.id}`];
            break;
          case LOCATION_TYPE.CHURCH_STATE:
            path = [
              `church_state:${data.id}`,
              `country:${data.country.id}`,
              `zone:${data.country.zone.id}`,
            ];
            break;
          case LOCATION_TYPE.REGION:
            path = [
              `region:${data.id}`,
              `church_state:${data.church_state.id}`,
              `country:${data.church_state.country.id}`,
              `zone:${data.church_state.country.zone.id}`,
            ];
            break;
          case LOCATION_TYPE.GROUP:
            path = [
              `group:${data.id}`,
              `region:${data.region.id}`,
              `church_state:${data.region.church_state.id}`,
              `country:${data.region.church_state.country.id}`,
              `zone:${data.region.church_state.country.zone.id}`,
            ];
            break;
          case LOCATION_TYPE.DISTRICT:
            path = [
              `district:${data.id}`,
              `group:${data.group.id}`,
              `region:${data.group.region.id}`,
              `church_state:${data.group.region.church_state.id}`,
              `country:${data.group.region.church_state.country.id}`,
              `zone:${data.group.region.church_state.country.zone.id}`,
            ];
        }
      }

      const existingMetadata = await this.metadataModel.findOne({
        where: { code },
        transaction,
      });

      if (existingMetadata)
        throw new ConflictException('Location metadata already exists');

      const metadata = await this.metadataModel.create(
        {
          name,
          code,
          type,
          location_id,
          path,
          status,
          admin,
        },
        { transaction },
      );

      if (address) {
        await this.locationAddressModel.create(
          {
            metadata_id: metadata.id,
            ...address,
          },
          { transaction },
        );
      }

      if (boundary) {
        await this.locationBoundaryModel.create(
          {
            metadata_id: metadata.id,
            ...boundary,
          },
          { transaction },
        );
      }

      await transaction?.commit();

      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Location metadata created successfully',
        metadata,
      );
    } catch (err) {
      await transaction?.rollback();
      console.log(err);
      throw new HttpException(
        err?.message || 'Failed to create location metadata',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMetadataById(id: string) {
    try {
      const metadata = await this.metadataModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        include: [
          {
            model: LocationAddress,
            as: 'address',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
          {
            model: LocationBoundary,
            as: 'boundary',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
        ],
      });

      if (!metadata) throw new NotFoundException('Location metadata not found');

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        metadata,
      );
    } catch (err) {
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateMetadata(id: string, updateMetadataDto: UpdateMetadataDto) {
    const transaction = await this.metadataModel.sequelize?.transaction();

    try {
      const metadata = await this.metadataModel.findByPk(id);
      if (!metadata) throw new NotFoundException('Location metadata not found');

      // Update main metadata
      await metadata.update(updateMetadataDto, { transaction });

      // Update address if provided
      if (updateMetadataDto.address)
        await this.locationAddressModel.upsert(
          {
            metadata_id: id,
            ...updateMetadataDto.address,
          },
          { transaction },
        );

      // Update boundary if provided
      if (updateMetadataDto.boundary)
        await this.locationBoundaryModel.upsert(
          {
            metadata_id: id,
            ...updateMetadataDto.boundary,
          },
          { transaction },
        );

      await transaction?.commit();

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Location metadata updated successfully',
        metadata,
      );
    } catch (err) {
      await transaction?.rollback();
      throw new HttpException(
        err?.message || 'Failed to update location metadata',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteMetadata(id: string) {
    const transaction = await this.metadataModel.sequelize?.transaction();

    try {
      const metadata = await this.metadataModel.findByPk(id);
      if (!metadata) throw new NotFoundException('Location metadata not found');

      // Delete related records (cascade should handle this, but being explicit)
      await this.locationAddressModel.destroy({
        where: { metadata_id: id },
        transaction,
      });

      await this.locationBoundaryModel.destroy({
        where: { metadata_id: id },
        transaction,
      });

      // Delete the metadata
      await metadata.destroy({ transaction });

      await transaction?.commit();

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Location metadata deleted successfully',
        null,
      );
    } catch (err) {
      await transaction?.rollback();
      throw new HttpException(
        err?.message || 'Failed to delete location metadata',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMetadataByType(query: GetMetadataByTypeDto) {
    try {
      const whereClause: { type: LOCATION_TYPE; status?: LOCATION_STATUS } = {
        type: query.type,
      };

      if (query.status) {
        whereClause.status = query.status;
      }

      const metadata = await this.metadataModel.findAll({
        where: whereClause,
        attributes: { exclude: attributesToExclude },
        include: [
          {
            model: LocationAddress,
            as: 'address',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
          {
            model: LocationBoundary,
            as: 'boundary',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
        ],
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        metadata,
      );
    } catch (err) {
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getMetadataByCode(code: string) {
    try {
      const metadata = await this.metadataModel.findOne({
        where: { code },
        attributes: { exclude: attributesToExclude },
        include: [
          {
            model: LocationAddress,
            as: 'address',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
          {
            model: LocationBoundary,
            as: 'boundary',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
        ],
      });

      if (!metadata) throw new NotFoundException('Location metadata not found');

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        metadata,
      );
    } catch (err) {
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllMetadata(paginationMetadata: PaginationMetadataDto) {
    try {
      const { count, rows } = await this.metadataModel.findAndCountAll({
        attributes: { exclude: attributesToExclude },
        include: [
          {
            model: LocationAddress,
            as: 'address',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
          {
            model: LocationBoundary,
            as: 'boundary',
            attributes: { exclude: attributesToExclude },
            required: false,
          },
        ],
        ...this.utilService.queryPaginator(paginationMetadata),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        this.utilService.shapePaginatedResponse(
          rows,
          paginationMetadata,
          count,
        ),
      );
    } catch (err) {
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  private getLocaionCode(type: LOCATION_TYPE, location_id: string): string {
    switch (type) {
      case LOCATION_TYPE.ZONE:
        return `ZN-${location_id}`;
      case LOCATION_TYPE.COUNTRY:
        return `CNTY-${location_id}`;
      case LOCATION_TYPE.CHURCH_STATE:
        return `ST-${location_id}`;
      case LOCATION_TYPE.REGION:
        return `RGN-${location_id}`;
      case LOCATION_TYPE.GROUP:
        return `GRP-${location_id}`;
      case LOCATION_TYPE.DISTRICT:
        return `DSTRT-${location_id}`;
      default:
        throw new BadRequestException('Invalid location type supplied');
    }
  }
}

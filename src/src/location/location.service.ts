/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  Zone,
  Country,
  PoliticalState,
  ChurchState,
  Region,
  Group,
  District,
  LGA,
  Language,
  ChurchLanguage,
} from 'src/models';
import { UtilsService } from 'src/utils/utils.service';
import {
  CreateChurchLanguageDto,
  CreateChurchStateDto,
  CreateCountryDto,
  CreateDistrictDto,
  CreateGroupDto,
  CreateLanguageDto,
  CreateLGADto,
  CreatePoliticalStateDto,
  CreateRegionDto,
  CreateZoneDto,
} from './dto';
import { attributesToExclude } from 'src/consts';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Zone)
    private readonly zoneModel: typeof Zone,

    @InjectModel(Country)
    private readonly countryModel: typeof Country,

    @InjectModel(PoliticalState)
    private readonly politicalStateModel: typeof PoliticalState,

    @InjectModel(LGA)
    private readonly lgaModel: typeof LGA,

    @InjectModel(ChurchState)
    private readonly churchStateModel: typeof ChurchState,

    @InjectModel(Region)
    private readonly regionModel: typeof Region,

    @InjectModel(Group)
    private readonly groupModel: typeof Group,

    @InjectModel(District)
    private readonly districtModel: typeof District,

    @InjectModel(Language)
    private readonly languageModel: typeof Language,

    @InjectModel(ChurchLanguage)
    private readonly churchLanguageModel: typeof ChurchLanguage,

    private readonly utilService: UtilsService,
  ) {}

  async createZone(createZoneDto: CreateZoneDto) {
    try {
      const data = await this.zoneModel.create({ ...createZoneDto });
      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Zone created successfully',
        data,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create zone',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createLanguage(createLanguageDto: CreateLanguageDto) {
    try {
      const data = await this.languageModel.create({ ...createLanguageDto });
      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Language created successfully',
        data,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create language',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createChurchLanguage(createChurchLanguageDto: CreateChurchLanguageDto) {
    try {
      const data = await this.churchLanguageModel.create({
        ...createChurchLanguageDto,
      });
      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Church language created successfully',
        data,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create church language',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createCountry(createCountryDto: CreateCountryDto) {
    try {
      const data = await this.countryModel.create({ ...createCountryDto });
      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Country created successfully',
        data,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create country',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPoliticalState(createPoliticalStateDto: CreatePoliticalStateDto) {
    try {
      const data = await this.politicalStateModel.create({
        ...createPoliticalStateDto,
      });
      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Political state created successfully',
        data,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create political state',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createLGA(createLGADto: CreateLGADto) {
    try {
      const data = await this.lgaModel.create({
        ...createLGADto,
      });
      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'LGA created successfully',
        data,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create lga state',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createChurchState(createChurchStateDto: CreateChurchStateDto) {
    try {
      const { country_id } = createChurchStateDto;

      const latestChurchState = await this.churchStateModel.findOne({
        where: { country_id },
        order: [['state_country_id', 'DESC']],
        attributes: ['state_country_id'],
        raw: true,
      });

      /* istanbul ignore next */
      const nextStateCountryId = latestChurchState
        ? latestChurchState.state_country_id + 1
        : 1;

      const newChurchState = await this.churchStateModel.create({
        ...createChurchStateDto,
        state_country_id: nextStateCountryId,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Church state created successfully',
        newChurchState,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create church state',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createRegion(createRegionDto: CreateRegionDto) {
    try {
      const { church_state_id } = createRegionDto;

      const latestRegion = await this.regionModel.findOne({
        where: { church_state_id },
        order: [['region_state_id', 'DESC']],
        attributes: ['region_state_id'],
        raw: true,
      });

      /* istanbul ignore next */
      const nextRegionStateId = latestRegion
        ? latestRegion.region_state_id + 1
        : 1;

      const newRegion = await this.regionModel.create({
        ...createRegionDto,
        region_state_id: nextRegionStateId,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Region created successfully',
        newRegion,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create region',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      const { region_id } = createGroupDto;

      const latestGroup = await this.groupModel.findOne({
        where: { region_id },
        order: [['group_region_id', 'DESC']],
        attributes: ['group_region_id'],
        raw: true,
      });

      /* istanbul ignore next */
      const nextGroupRegionId = latestGroup
        ? latestGroup.group_region_id + 1
        : 1;

      const newGroup = await this.groupModel.create({
        ...createGroupDto,
        group_region_id: nextGroupRegionId,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'Group created successfully',
        newGroup,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create group',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createDistrict(createDistrictDto: CreateDistrictDto) {
    try {
      const { group_id } = createDistrictDto;

      const latestDistrict = await this.districtModel.findOne({
        where: { group_id },
        order: [['district_group_id', 'DESC']],
        attributes: ['district_group_id'],
        raw: true,
      });

      /* istanbul ignore next */
      const nextDistrictGroupId = latestDistrict
        ? latestDistrict.district_group_id + 1
        : 1;

      const newDistrict = await this.districtModel.create({
        ...createDistrictDto,
        district_group_id: nextDistrictGroupId,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.CREATED,
        'District created successfully',
        newDistrict,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'Failed to create district',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllZones() {
    try {
      const zones = await this.zoneModel.findAll({
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        zones,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllLanguages() {
    try {
      const languages = await this.languageModel.findAll({
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        languages,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllChurchLanguages() {
    try {
      const churchLanguages = await this.churchLanguageModel.findAll({
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        churchLanguages,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getZoneById(id: string) {
    try {
      const start = Date.now();
      console.log(`Raw DB time: ${Date.now() - start}ms`);
      const zone = await this.zoneModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        plain: true,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        zone,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLanguageById(id: string) {
    try {
      const language = await this.languageModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        plain: true,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        language,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getChurchLanguageById(id: string) {
    try {
      const churchLanguage = await this.churchLanguageModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        plain: true,
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        churchLanguage,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCountries() {
    try {
      const countries = await this.countryModel.findAll({
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        countries,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountriesByZone(zone_id: string) {
    try {
      const countries = await this.countryModel.findAll({
        where: { zone_id },
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        countries,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountryById(id: string, detailed?: boolean) {
    try {
      const country = await this.countryModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        ...(detailed && {
          include: [
            { model: Zone, attributes: { exclude: attributesToExclude } },
          ],
          plain: true,
        }),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        country,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPoliticalStatesByCountryId(country_id: string) {
    try {
      const politicalStates = await this.politicalStateModel.findAll({
        where: { country_id },
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        politicalStates,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPoliticalStateById(id: string, detailed?: boolean) {
    try {
      const politicalState = await this.politicalStateModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        ...(detailed && {
          include: [
            {
              model: Country,
              attributes: { exclude: attributesToExclude },
              include: [
                { model: Zone, attributes: { exclude: attributesToExclude } },
              ],
            },
          ],
          plain: true,
        }),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        politicalState,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getChurchStatesByCountryId(country_id: string) {
    try {
      const churchStates = await this.churchStateModel.findAll({
        where: { country_id },
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        churchStates,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getChurchStateById(id: string, detailed?: boolean) {
    try {
      const churchState = await this.churchStateModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        ...(detailed && {
          include: [
            {
              model: Country,
              attributes: { exclude: attributesToExclude },
              include: [
                { model: Zone, attributes: { exclude: attributesToExclude } },
              ],
            },
          ],
          plain: true,
        }),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        churchState,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRegionsByChurchStateId(church_state_id: string) {
    try {
      const regions = await this.regionModel.findAll({
        where: { church_state_id },
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        regions,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRegionById(id: string, detailed?: boolean) {
    try {
      const region = await this.regionModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        ...(detailed && {
          include: [
            {
              model: ChurchState,
              attributes: { exclude: attributesToExclude },
              include: [
                {
                  model: Country,
                  attributes: { exclude: attributesToExclude },
                  include: [
                    {
                      model: Zone,
                      attributes: { exclude: attributesToExclude },
                    },
                  ],
                },
              ],
            },
          ],
          plain: true,
        }),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        region,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLGAById(id: string) {
    try {
      const lga = await this.lgaModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        lga,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLGAsByStateId(state_id: string) {
    try {
      const lgas = await this.lgaModel.findAll({
        where: { state_id },
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        lgas,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getGroupsByRegionId(region_id: string) {
    try {
      const groups = await this.groupModel.findAll({
        where: { region_id },
        attributes: { exclude: attributesToExclude },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        groups,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getGroupById(id: string, detailed?: boolean) {
    try {
      const group = await this.groupModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        ...(detailed && {
          include: [
            {
              model: Region,
              attributes: { exclude: attributesToExclude },
              include: [
                {
                  model: ChurchState,
                  attributes: { exclude: attributesToExclude },
                  include: [
                    {
                      model: Country,
                      attributes: { exclude: attributesToExclude },
                      include: [
                        {
                          model: Zone,
                          attributes: { exclude: attributesToExclude },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          plain: true,
        }),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        group,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getDistrictsByGroupId(group_id: string) {
    try {
      const districts = await this.districtModel.findAll({
        attributes: { exclude: attributesToExclude },
        where: { group_id },
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        districts,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getDistrictById(id: string, detailed?: boolean) {
    try {
      const district = await this.districtModel.findByPk(id, {
        attributes: { exclude: attributesToExclude },
        ...(detailed && {
          include: [
            {
              model: Group,
              attributes: { exclude: attributesToExclude },
              include: [
                {
                  model: Region,
                  attributes: { exclude: attributesToExclude },
                  include: [
                    {
                      model: ChurchState,
                      attributes: { exclude: attributesToExclude },
                      include: [
                        {
                          model: Country,
                          attributes: { exclude: attributesToExclude },
                          include: [
                            {
                              model: Zone,
                              attributes: { exclude: attributesToExclude },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          plain: true,
        }),
      });

      return this.utilService.HttpSuccess(
        HttpStatus.OK,
        'Data retrieved successfully',
        district,
      );
    } catch (err) {
      /* istanbul ignore next */
      throw new HttpException(
        err?.message || 'An error occurred',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

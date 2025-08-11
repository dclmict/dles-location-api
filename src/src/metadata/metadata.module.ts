import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { UtilsService } from 'src/utils/utils.service';
import {
  ChurchState,
  Country,
  District,
  Group,
  LGA,
  LocationAddress,
  LocationBoundary,
  Metadata,
  PoliticalState,
  Region,
  Zone,
} from 'src/models';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationService } from 'src/location/location.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Metadata,
      LocationAddress,
      LocationBoundary,
      Zone,
      Country,
      PoliticalState,
      ChurchState,
      Region,
      Group,
      District,
      LGA,
    ]),
  ],
  controllers: [MetadataController],
  providers: [MetadataService, UtilsService, LocationService],
})
export class MetadataModule {}

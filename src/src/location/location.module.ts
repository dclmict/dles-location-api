/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import {
  GrpcLocationController,
  LocationController,
} from './location.controller';
import { UtilsService } from 'src/utils/utils.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Zone,
  Country,
  PoliticalState,
  ChurchState,
  Region,
  Group,
  District,
} from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Zone,
      Country,
      PoliticalState,
      ChurchState,
      Region,
      Group,
      District,
    ]),
  ],
  controllers: [LocationController, GrpcLocationController],
  providers: [LocationService, UtilsService],
})
export class LocationModule {}

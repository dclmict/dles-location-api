/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { UtilsService } from './utils/utils.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || ''),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      models: ['./models/*.model{.ts,.js}'],
      autoLoadModels: true,
      synchronize: true,
      sync: {},
      logging: console.log,
    }),
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}

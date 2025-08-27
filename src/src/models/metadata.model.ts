/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { LOCATION_STATUS, LOCATION_TYPE } from 'src/consts';
import { v6 as uuid } from 'uuid';
import { LocationBoundary } from './location-boundary.model';
import { LocationAddress } from './location-address.model';
import { ChurchLanguage } from './church-language.model';
import { LGA } from './lga.model';

@Table({
  timestamps: true,
  tableName: 'metadata',
})
export class Metadata extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING(50),
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare location_id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  declare code: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      isIn: [Object.values(LOCATION_TYPE)],
    },
  })
  declare type: LOCATION_TYPE;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: [],
    get(): object | null {
      const rawValue: string = this.getDataValue<'path'>('path');
      return rawValue ? (JSON.parse(rawValue) as []) : null;
    },
    set(value: any) {
      this.setDataValue('path', JSON.stringify(value));
    },
  })
  declare path: string[];

  @Column({
    type: DataType.STRING(20),
    defaultValue: LOCATION_STATUS.ACTIVE,
    validate: {
      isIn: [Object.values(LOCATION_STATUS)],
    },
  })
  declare status: LOCATION_STATUS;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  declare admin: string;

  @ForeignKey(() => ChurchLanguage)
  @Column({ allowNull: true })
  declare language_id: string;

  @ForeignKey(() => LGA)
  @Column({ allowNull: true })
  declare lga_id: string;

  @HasOne(() => LocationAddress)
  declare address: LocationAddress;

  @HasOne(() => LocationBoundary)
  declare boundary: LocationBoundary;

  @BelongsTo(() => ChurchLanguage)
  declare language: ChurchLanguage;

  @BelongsTo(() => LGA)
  declare lga: LGA;
}

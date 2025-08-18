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
  location_id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  code: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      isIn: [Object.values(LOCATION_TYPE)],
    },
  })
  type: LOCATION_TYPE;

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
  path: string[];

  @Column({
    type: DataType.STRING(20),
    defaultValue: LOCATION_STATUS.ACTIVE,
    validate: {
      isIn: [Object.values(LOCATION_STATUS)],
    },
  })
  status: LOCATION_STATUS;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  admin: string;

  @ForeignKey(() => ChurchLanguage)
  @Column({ allowNull: true })
  language_id: string;

  @HasOne(() => LocationAddress)
  address: LocationAddress;

  @HasOne(() => LocationBoundary)
  boundary: LocationBoundary;

  @BelongsTo(() => ChurchLanguage)
  language: ChurchLanguage;
}

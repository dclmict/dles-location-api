/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { METADATA_BOUNDARY_TYPE } from 'src/consts';
import { v6 as uuid } from 'uuid';
import { Metadata } from './metadata.model';

@Table({
  timestamps: true,
  tableName: 'location_boundary',
})
export class LocationBoundary extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING(50),
    defaultValue: uuid,
  })
  declare id: string;

  @ForeignKey(() => Metadata)
  @Column({ type: DataType.STRING(50), allowNull: false })
  metadata_id: string;

  @BelongsTo(() => Metadata)
  metadata: Metadata;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get(): object | null {
      const rawValue: string =
        this.getDataValue<'boundary_geojson'>('boundary_geojson');
      return rawValue ? (JSON.parse(rawValue) as []) : null;
    },
    set(value: any) {
      this.setDataValue('boundary_geojson', JSON.stringify(value));
    },
  })
  boundary_geojson: object;

  @Column({
    type: DataType.STRING(50),
    defaultValue: METADATA_BOUNDARY_TYPE.ADMINISTRATIVE,
    validate: {
      isIn: [Object.values(METADATA_BOUNDARY_TYPE)],
    },
  })
  boundary_type: METADATA_BOUNDARY_TYPE;

  @Column({ type: DataType.STRING(50), defaultValue: 'Africa/Lagos' })
  timezone: string;
}

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { v6 as uuid } from 'uuid';
import { Metadata } from './metadata.model';

@Table({
  timestamps: true,
  tableName: 'location_address',
})
export class LocationAddress extends Model {
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

  @Column({ type: DataType.TEXT, allowNull: true })
  street: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  city: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  state: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  country: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  postal_code: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_primary: boolean;
}

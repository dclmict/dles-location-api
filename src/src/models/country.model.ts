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
import { Zone } from './zone.model';

@Table({
  timestamps: true,
  tableName: 'countries',
})
export class Country extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare flag: string;

  @ForeignKey(() => Zone)
  @Column({ allowNull: true })
  declare zone_id: string;

  @BelongsTo(() => Zone)
  declare zone: Zone;
}

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
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  flag: string;

  @ForeignKey(() => Zone)
  @Column({ allowNull: true })
  zone_id: string;

  @BelongsTo(() => Zone)
  zone: Zone;
}

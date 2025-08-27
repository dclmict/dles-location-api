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
import { Region } from '.';

@Table({
  timestamps: true,
  tableName: 'groups',
})
export class Group extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => Region)
  @Column({ allowNull: false })
  declare region_id: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare group_region_id: number;

  @BelongsTo(() => Region)
  declare region: Region;
}

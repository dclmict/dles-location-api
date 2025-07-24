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
import { Group } from '.';

@Table({
  timestamps: true,
  tableName: 'districts',
})
export class District extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid(),
  })
  declare id?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Group)
  @Column({ allowNull: false })
  group_id: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  district_group_id: number;

  @BelongsTo(() => Group)
  group: Group;
}

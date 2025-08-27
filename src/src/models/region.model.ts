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
import { ChurchState } from '.';

@Table({
  timestamps: true,
  tableName: 'regions',
})
export class Region extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => ChurchState)
  @Column({ allowNull: false })
  declare church_state_id: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare region_state_id: number;

  @BelongsTo(() => ChurchState)
  declare church_state: ChurchState;
}

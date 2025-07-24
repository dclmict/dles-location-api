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
    defaultValue: uuid(),
  })
  declare id?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => ChurchState)
  @Column({ allowNull: false })
  church_state_id: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  region_state_id: number;

  @BelongsTo(() => ChurchState)
  church_state: ChurchState;
}

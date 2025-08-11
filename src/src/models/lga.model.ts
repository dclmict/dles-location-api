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
import { PoliticalState } from '.';

@Table({
  timestamps: true,
  tableName: 'lga',
})
export class LGA extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => PoliticalState)
  @Column({ allowNull: false })
  state_id: string;

  @BelongsTo(() => PoliticalState)
  state: PoliticalState;
}

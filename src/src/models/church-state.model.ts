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
import { Country } from './country.model';

@Table({
  timestamps: true,
  tableName: 'church_states',
})
export class ChurchState extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid(),
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Country)
  @Column({ allowNull: true })
  country_id: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  state_country_id: number;

  @BelongsTo(() => Country)
  country: Country;
}

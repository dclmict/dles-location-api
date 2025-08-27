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
  tableName: 'political_states',
})
export class PoliticalState extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => Country)
  @Column({ allowNull: true })
  declare country_id: string;

  @BelongsTo(() => Country)
  declare country: Country;
}

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { v6 as uuid } from 'uuid';

@Table({
  timestamps: true,
  tableName: 'zones',
})
export class Zone extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: uuid(),
  })
  declare id?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  currency: string;
}

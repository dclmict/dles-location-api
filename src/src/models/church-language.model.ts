import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { v6 as uuid } from 'uuid';
import { Metadata } from './metadata.model';

@Table({
  timestamps: true,
  tableName: 'church_languages',
})
export class ChurchLanguage extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: uuid,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Metadata)
  metadata: Metadata[];
}

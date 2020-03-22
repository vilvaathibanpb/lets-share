import { Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user';

export class Item extends Model {
  public id!: number;
  public text!: string;
  public userId!: number;
}

export function initItem(sequelize: Sequelize) {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
      }
    },
    {
      tableName: 'items',
      sequelize: sequelize
    }
  );
}

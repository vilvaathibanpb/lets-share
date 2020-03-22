import { Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user';

export class ItemRequest extends Model {
  public id!: number;
  public text!: string;
  public pincode!: string;
  public userId!: number;
}

export function initRequest(sequelize: Sequelize) {
  ItemRequest.init(
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
      pincode: {
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
      tableName: 'requests',
      sequelize: sequelize
    }
  );
}

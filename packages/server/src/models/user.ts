import { Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public pincode!: string;
  public address!: string;
  public contact!: string;
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      sequelize: sequelize
    }
  );
}

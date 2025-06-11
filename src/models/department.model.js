import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {}
  }

  Department.init(
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Department',
      tableName: 'tbl_department',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {},
    },
  );

  return Department;
};

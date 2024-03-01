const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const Subscriber = sequelize.define(
	"subscriber",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		emailAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		source: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		modifiedAt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		modifiedBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "subscriber",
		timestamps: false,
	}
);

module.exports = Subscriber;

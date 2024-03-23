const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const SiteMenuModel = sequelize.define(
	"SiteMenumodel",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		target: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "site_menu",
		timestamps: false,
	}
);

module.exports = SiteMenuModel;

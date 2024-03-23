const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const SiteMenuMappingModel = sequelize.define(
	"SiteMenuMappingModel",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		sectionId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		siteMenuId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "site_menu_mapping",
		timestamps: false,
	}
);

module.exports = SiteMenuMappingModel;

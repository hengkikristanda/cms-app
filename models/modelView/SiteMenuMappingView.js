const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Your Sequelize instance

const SiteMenuMappingView = sequelize.define(
	"SiteMenuMappingView",
	{
		sectionId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		sectionName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		siteMenuId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		menuName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isHidden: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "site_menu_mapping_view",
		timestamps: false,
	}
);

module.exports = SiteMenuMappingView;

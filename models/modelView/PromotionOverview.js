const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Your Sequelize instance

const PromotionOverview = sequelize.define(
	"PromotionOverview",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		heroImage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		heading: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		subHeading: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		footNote: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		contentStatus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lang: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		modifiedBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		modifiedAt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "promotion_overview",
		timestamps: false,
	}
);

module.exports = PromotionOverview;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const ContentModel = sequelize.define(
	"ContentModel",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		imageId: {
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
		textContent: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ctaButtonLabel: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ctaButtonLink: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lang: {
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
		tableName: "content",
		timestamps: false,
	}
);

module.exports = ContentModel;

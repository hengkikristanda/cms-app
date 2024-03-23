const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Your Sequelize instance

const ContentView = sequelize.define(
	"ContentView",
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
		imageFileName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mimeType: {
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
		userId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastModifiedBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastModifiedDate: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "contentview",
		timestamps: false,
	}
);

module.exports = ContentView;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const ImagesModel = sequelize.define(
	"ImagesModel",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		originalFileName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mimeType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fileName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		imageData: {
			type: DataTypes.BLOB("long"),
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
		tableName: "images",
		timestamps: false,
	}
);

module.exports = ImagesModel;

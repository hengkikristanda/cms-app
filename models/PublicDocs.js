const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const PublicDocs = sequelize.define(
	"PublicDocs",
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
		documentData: {
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
		tableName: "public_docs",
		timestamps: false,
	}
);

module.exports = PublicDocs;

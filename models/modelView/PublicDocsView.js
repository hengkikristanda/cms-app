const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Your Sequelize instance

const PublicDocsView = sequelize.define(
	"PublicDocsView",
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
		createdBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "public_docs_view",
		timestamps: false,
	}
);

module.exports = PublicDocsView;

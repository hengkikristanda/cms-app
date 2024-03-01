const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const LanguagesModel = sequelize.define(
	"LanguagesModel",
	{
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "languages",
		timestamps: false,
	}
);

module.exports = LanguagesModel;

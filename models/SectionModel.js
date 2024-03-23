const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const SectionModel = sequelize.define(
	"SectionModel",
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
	},
	{
		tableName: "section",
		timestamps: false,
	}
);

module.exports = SectionModel;

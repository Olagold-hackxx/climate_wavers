const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbconnect");


const User = sequelize.define(
  "User",
  {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	  },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
    last_name: {
      type: DataTypes.STRING,
	  allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
	  defaultValue: false
    },
    username: {
      type: DataTypes.STRING,
	  allowNull: false,
	  unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
	profile_pic: {
		type: DataTypes.STRING
	},
	bio: {
		type: DataTypes.STRING
	},
	country: {
		type: DataTypes.STRING
	},
	state: {
		type: DataTypes.STRING
	},
	auth_provide: {
		type: DataTypes.STRING
	},

  },
  { tableName: 'user', timestamps: true, underscored: true }
);

sequelize.sync({ alter: true})
  .then(() => {
    console.log('Database & tables synced!');
  });

module.exports = User;

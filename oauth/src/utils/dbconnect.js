const { Sequelize } = require("sequelize");

//Connect to disaXta database
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: process.env.CA,
      },
    },
    define: {
      underscored: true,
    },
    logging: (msg) => {
      if (msg.includes("error")) {
        console.error(msg);
      }
    },
  }
);
module.exports = sequelize;

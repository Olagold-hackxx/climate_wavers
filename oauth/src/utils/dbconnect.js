const { Sequelize } = require("sequelize");

//Connect to disaXta database
const sequelize = new Sequelize(
  process.env.DATABASE_URI,
  {
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

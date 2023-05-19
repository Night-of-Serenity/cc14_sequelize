const { Sequelize: Seq, DataTypes, DATE } = require("sequelize");

const sequelize = new Seq({
  host: "localhost",
  username: "root",
  password: "Mysql123456789",
  database: "cc14_shop",
  dialect: "mysql",
});

sequelize.authenticate().then(console.log("DB CONNECT OK"));

sequelize.query("SELECT * FROM products").then(([rs]) => console.log(rs));

sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: "No specify",
    },
  },
  {
    timestamps: true,
    // freezeTableName: true,
    // tableName: "Alluser"
    underscored: true,
  }
);
// Person.drop();
// sequelize.models.person.sync({ force: true });
// Customer.sync({ force: true });

// sequelize.models.Product.findAll().then((rs) => {
//   //   console.log(rs);
//   //   console.log(JSON.stringify(rs));
//   console.log(JSON.parse(JSON.stringify(rs)));
// });

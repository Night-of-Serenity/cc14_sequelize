const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CONNECT);

sequelize
  .authenticate()
  .then(console.log("DB Connected"))
  .catch((err) => console.log(err.message));

const User = sequelize.define(
  "User",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   allowNull: false,
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 15],
      },
      get() {
        const rawValue = this.getDataValue("name");
        return rawValue.toUpperCase();
      },
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

// User.sync({ force: true });

const Todo = sequelize.define(
  "Todo",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    nextSevenDay: {
      type: DataTypes.VIRTUAL,
      get() {
        // console.log(this.dueDate);
        let dueDate = new Date(this.dueDate);
        let sevenDay = new Date();
        sevenDay.setDate(dueDate.getDate() + 7);
        return sevenDay;
      },
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

// Todo.sync({ force: true });

User.hasMany(Todo, {
  foreignKey: "userId",
  onDelete: "Restrict",
  onUpdate: "Restrict",
});

Todo.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "Restrict",
  onUpdate: "Restrict",
});

// sequelize.sync({ alter: true });

module.exports = { User, Todo, sequelize };

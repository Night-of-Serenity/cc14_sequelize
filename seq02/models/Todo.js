module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: {
        type: DataTypes.STRING,
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remainday: {
        type: DataTypes.VIRTUAL,
        get() {
          const currentDate = new Date();
          const timeDifference = new Date(this.dueDate).getTime() - currentDate.getTime();
          const remainingDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          return remainingDays;
        },
      },
      // nextSevenDay: {
      //   type: DataTypes.VIRTUAL,
      //   get() {
      //     let nextSevenDay = new Date();
      //     nextSevenDay.setDate(new Date(this.dueDate).getDate() + 7);
      //     return nextSevenDay;
      //   },
      // },
    },
    {
      underscored: true,
    }
  );

  Todo.associate = (db) => {
    Todo.belongsTo(db.User, {
      foreignKey: "userId",
      onDelete: "Restrict",
      onUpdate: "Restrict",
    });
  };

  return Todo;
};

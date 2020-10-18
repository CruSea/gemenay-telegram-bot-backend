module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define("issue", {
      issue: {
        type: DataTypes.TEXT
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      status: {
          type: DataTypes.BOOLEAN
      },
      telegramId: {
        type: DataTypes.INTEGER
      },
      buttonId: {
        type: DataTypes.INTEGER
      },
      sent: {
        type: DataTypes.BOOLEAN
      }
    });
  
    return Issue;
  };
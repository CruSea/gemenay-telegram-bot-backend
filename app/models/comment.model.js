module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        comment: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER
        }
    });

    return Comment;
};
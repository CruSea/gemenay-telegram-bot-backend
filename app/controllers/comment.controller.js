const db = require("../models");
const Issue = db.issues;
const Comment = db.comments;

exports.getCommentsByIssue = async (req, res) => {
    const comments = await Comment.findAll({
        where: {
            issueId: req.params.issueId
        }
    });

    if(comments.length != 0) {
        res.send(comments)
    } else {
        res.send({
            message: 'no comments'
        })
    }
};
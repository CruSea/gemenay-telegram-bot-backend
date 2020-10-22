const db = require("../models");
const Issue = db.issues;
const Comment = db.comments;


exports.createIssue = (req, res) => {
    return Issue.create({
        issue: req.body.issue,
        user_id: req.body.user_id,
        status: 0,
        sent: 0,
        categoryId: req.body.categoryId
    })
        .then((issue) => {
            console.log(">> Created issue: " + JSON.stringify(issue, null, 4));
            return res.send({
                message: "success",
                issue: issue
            });
        })
        .catch((err) => {
            res.send({
                message: ">> Error while creating issue: ",
                error: err
            })
        });
};

exports.createComment = (req, res) => {
    return Comment.create({
        comment: req.body.comment,
        user_id: req.body.user_id,
        issueId: req.params.issueId,
        status: 1
    })
        .then(async (comment) => {
            const issue = await Issue.findByPk(comment.issueId);
            const buttonId = issue.buttonId;
            const telegramId = issue.telegramId;
            const count = await Comment.count({
                where: {
                    issueId: comment.issueId
                }
            })
            res.send({
                message: ">> Created comment: ",
                buttonId: buttonId,
                telegramId: telegramId,
                count: count
            })
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.findIssueById = (req, res) => {
    return Issue.findByPk(req.params.issueId, { include: ["comments", "category"] })
        .then((issue) => {
            res.send(issue);
        })
        .catch((err) => {
            res.send(">> Error while finding issue: ");
        });
};

exports.findCommentById = (id) => {
    return Comment.findByPk(id, { include: ["issue"] })
        .then((comment) => {
            return comment;
        })
        .catch((err) => {
            console.log(">> Error while finding comment: ", err);
        });
};

exports.findAll = (req, res) => {
    return Issue.findAll({
        include: ["comments", "category"],
    }).then((issues) => {
        if(issues.length != 0) {
            res.send(issues);
        } else {
            res.send({
                message: "no data"
            })
        }
    }).catch(err => {
        res.send({
            message: 'failure',
            error: err
        });
    })
};

exports.getApproved = async (req, res) => {
    // console.log('started');
    const issues = await Issue.findAll({
        include: [
            "category"
        ],
        where: {
            status: 1,
            sent: 0
        }
    });

    if (issues.length != 0) {
        issue = issues[0];
        console.log(issue);
        Issue.update({
            sent: 1
        },
            {
                where: {
                    id: issue.id
                }
            }).then(() => {
                res.send(issue);
            }).catch(err => {
                res.send(err);
            })
    } else {
        res.send({
            message: 'no data'
        })
    }
};

exports.adminGetApproved = async (req, res) => {
    const issues = await Issue.findAll({
        where: {
            status: 1,
        }
    });

    if (issues.length != 0) {
      res.send(issues);
    } else {
        res.send({
            message: 'no data'
        })
    }
};

exports.adminPendingIssues = async (req, res) => {
    const issues = await Issue.findAll({
        include: [
            "category"
        ],
        where: {
            status: 0,
        }
    });

    if (issues.length != 0) {
      res.send(issues);
    } else {
        res.send({
            message: 'no data'
        })
    }
};


exports.adminGetDeclined = async (req, res) => {
    const issues = await Issue.findAll({
        include: [
            "category"
        ],
        where: {
            status: 3,
        }
    });

    if (issues.length != 0) {
      res.send(issues);
    } else {
        res.send({
            message: 'no data'
        })
    }
};



exports.deleteIssue = (req, res) => {
    const id = req.params.issueId;
    Issue.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).send('deleted an issue successfully with id = ' + id);
    }).catch(err => {
        res.send({
            message: 'failure',
            erorr: err
        })
    })
};

exports.updateIssue = (req, res) => {
    const id = req.params.issueId;
    Issue.update({
        user_id: req.body.user_id,
        issue: req.body.issue,
        status: req.body.status
    },
        {
            where:
            {
                id: req.params.issueId
            }
        }
    ).then(() => {
        res.status(200).send('updated an issue successfully with id = ' + id);
    }).catch(err => {
        res.send({
            message: 'failure',
            erorr: err
        })
    })
};
exports.approveIssue = (req, res) => {
    const id = req.params.issueId;
    Issue.update({
        user_id: req.body.user_id,
        issue: req.body.issue,
        status: 1
    },
        {
            where:
            {
                id: req.params.issueId
            }
        }
    ).then(() => {
        res.status(200).send('approved an issue successfully with id = ' + id);
    }).catch(err => {
        res.send({
            message: 'failure',
            erorr: err
        })
    })
};

exports.declineIssue = (req, res) => {
    const id = req.params.issueId;
    Issue.update({
        user_id: req.body.user_id,
        issue: req.body.issue,
        status: 3
    },
        {
            where:
            {
                id: req.params.issueId
            }
        }
    ).then(() => {
        res.status(200).send('decline an issue successfully with id = ' + id);
    }).catch(err => {
        res.send({
            message: 'failure',
            erorr: err
        })
    })
};


exports.addDetails = (req, res) => {
    Issue.update({
        telegramId: req.body.telegramId,
        buttonId: req.body.buttonId
    },
    {
        where:
        {
            id: req.params.issueId
        }
    }).then(() => {
        res.send({
            message: 'added details to an issue with id = ' + req.params.issueId
        });
    }).catch(err => {
        res.send(err);
    })
};

exports.getIssuesByCategory = (req, res) => {
    Issue.findAll({
        where: {
            categoryId: req.params.categoryId,
        }
    }).then(issues => {
        if (issues) {
            res.send(issues);
        } else {
            res.send({
                message: 'no data'
            })
        }
    }).catch(err => {
        res.send(err);
    })
}

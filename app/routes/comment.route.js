module.exports = function(app) {
    const comments = require('../controllers/comment.controller');
    
    app.get('/api/issues/:issueId/comments', comments.getCommentsByIssue);
}


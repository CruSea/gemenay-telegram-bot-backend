const { categories } = require('../models');

module.exports = function(app) {
 
    const issues = require('../controllers/issue.controller');
    const categories = require('../controllers/category.controller');
 
    // Create a new Issue
    app.post('/api/issues', issues.createIssue);

    //Retrive Approved Issues
    app.get('/api/issues/getApproved', issues.adminGetApproved);

    //Retrive pending Issues
    app.get('/api/issues/pending', issues.adminPendingIssues);

    //Retrive Declined Issues
    app.get('/api/issues/getDeclined', issues.adminGetDeclined);

    //Retrive Approved and unsent Issues
    app.get('/api/issues/approved', issues.getApproved);

    // Retrieve a single Issue by Id
    app.get('/api/issues/:issueId', issues.findIssueById);
 
    // Retrieve all issues
    app.get('/api/issues', issues.findAll);


    //Update the telegram button and issue Ids
    app.post('/api/issues/:issueId/addDetails', issues.addDetails);
 
    // Update an Issue with Id
    app.put('/api/issues/:issueId', issues.updateIssue);

    // Approve an issue
    app.post('/api/issues/:issueId/approve', issues.approveIssue);

    // Approve an issue
    app.post('/api/issues/:issueId/decline', issues.declineIssue);
 
    // Delete an Issue with Id
    app.delete('/api/issues/:issueId', issues.deleteIssue);

    // app.get('/api/issues/comment/:id', issues.findByIssue);

    // Create a comment for an Issue
    app.post('/api/issues/:issueId/comment', issues.createComment);

    // get issues by category
    app.get('/api/issues/:categoryId/issues', issues.getIssuesByCategory);
}

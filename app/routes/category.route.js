module.exports = function(app) {
    const categories = require('../controllers/category.controller');
     
    // app.get('/api/issues/:categoryId/issues', comments.getIssuesByCategory);
    
    // create a category
    app.post('/api/categories', categories.createCategory);

    // create a category
    app.get('/api/categories', categories.getCategories);

    // update a category
    app.put('/api/:categoryId/categories', categories.updateCategory);

    // delete a category
    app.delete('/api/:categoryId/categories', categories.deleteCategory);

    // Retrieve a single Issue by Id
    app.get('/api/issues/:categoryId/categories', categories.findCategoriesById);
}


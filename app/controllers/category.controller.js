const db = require("../models");
const Issue = db.issues;
const Category = db.categories;

module.exports.createCategory = (req, res) => {
    return Category.create({
        name: req.body.name,
    })
    .then((category) => {
        return res.send({
            message: "success",
            category: category
        });
    })
    .catch((err) => {
        res.send(err);
    });
};

module.exports.getCategories = (req, res) => {
    return Category.findAll().then((categories) => {
        if(categories.length != 0) {
            res.send(categories);
        } else {
            res.send({
                message: "no data"
            });
        }
    }).catch(err => {
        res.send({
            message: 'failure',
            error: err
        });
    })
};

module.exports.updateCategory = (req, res) => {
    const id = req.params.categoryId;
    Category.update({
        name: req.body.name,
    },
        {
            where:
            {
                id: req.params.categoryId
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

module.exports.findCategoriesById = (req, res) => {
    return Category.findByPk(req.params.categoryId, { include: ["issues"] })
        .then((category) => {
            if(category.length != 0) {
                res.send(category);
            }else {

            }
        })
        .catch((err) => {
            res.send({
                message: ">> Error while finding category: ",
                error : err
            })
        });
}

module.exports.deleteCategory = (req, res) => {
    const id = req.params.categoryId;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete category with id=${id}. Maybe category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete category with id=" + id,
        error: err
      });
    });
};

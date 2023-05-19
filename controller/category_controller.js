const Category = require("../model/category_model");


exports.createCategory = async (req, res, next) => {
  const dbCategory = await Category.findOne({ categoryName: req.body.categoryName });
  if (dbCategory) return res.status(400).send("category already exist");

  const newCategory = new Category({ categoryName: req.body.categoryName });

  newCategory.save((error, savedCategory) => {
    if (error) return res.status(400).send("an error occurred", error);
    return res.status(200).send({ message: "category created successfully", category: savedCategory });
  });
};

exports.getCategories = (req, res, next) => {
  Category.find({}, "name createdAt _id",(error, categories) => {
    if (error) return res.status(400).send("an error occurred", error);
    return res.status(200).send({ message: "showing category list", count: categories.length, categories, });
  });
};


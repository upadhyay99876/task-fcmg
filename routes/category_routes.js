const router = require('express').Router();
const cateController = require('../controller/category_controller')

router.post('/createcategory', cateController.createCategory);

router.get('/show', cateController.getCategories);

module.exports = router;
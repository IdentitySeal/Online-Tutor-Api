const Category = require("../model/category");
// const Subjects = require("../model/subject");
// const Tutor = require("../model/tutor");
// const Lesson = require("../model/lesson");


let CategoryController = {
    // Create a category
    create: async(req, res) => {
        const { name, description } = (req.body);
        const savedCategory = await Category.create({
            name,
            description
        });
        res.json(savedCategory);
    },
    // Get all Category
    findAll: async(req, res) => {
        const allCategory = await Category.find({});
        res.json(allCategory);
    },
    //update a category
    updateCategory: async(req, res) => {
        const updateCategory = {
            name: req.body.name,
            description: req.body.description
        };
        const newCategory = await Category.findByIdAndUpdate(
            req.params.categoryId, updateCategory
        );
        res.json(newCategory);
    },
    deleteCategory: async(req, res) => {
        const findCategory = await Category.findById(req.params.categoryId);
        await findCategory.remove();
    }
}
module.exports = CategoryController;
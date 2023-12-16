const Product = require('../models/products');

const createProduct = async (req, res) => {
    try {
        const { title, imgLink, body, price } = req.body;

        const productData = new Product({
            title, imgLink, body, price
        });

        const savedProduct = await productData.save();

        res.status(201).json({
            created: true,
            data: savedProduct,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, sort, search } = req.query;
        const skip = (page - 1) * pageSize;

        let sortOptions = {};
        if (sort === 'price') {
            sortOptions = { price: 1 };
        } else if (sort === 'price-desc') {
            sortOptions = { price: -1 };
        } else if (sort === 'recent') {
            sortOptions = { createdAt: -1 };
        }

        // Build the search query
        const searchQuery = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { body: { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        const products = await Product.find(searchQuery)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(pageSize));

        const totalProducts = await Product.countDocuments(searchQuery);

        res.status(200).json({
            data: products,
            totalPages: Math.ceil(totalProducts / pageSize),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};






const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({ _id: id });

        if (!product) {
            res.status(400).json({
                message: "Data not found"
            });
        } else {
            res.status(200).json({
                data: product
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(400).json({
                message: "Data not found"
            });
        } else {
            res.status(200).json({
                data: product,
                message: "product deleted successfully"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

const updateProductById = async (req, res) => {
    try {


        const { id, title, imgLink, body, price } = req.body;

        const data = await Product.findByIdAndUpdate({ _id: id }, { id, title, imgLink, body, price });

        res.status(200).json({
            message: "Updated",
            data: data,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductsById,
    deleteProductById,
    updateProductById
};

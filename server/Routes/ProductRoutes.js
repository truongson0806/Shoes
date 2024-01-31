import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import Order from "./../Models/OrderModel.js";
import { admin, employee, protect } from "./../Middleware/AuthMiddleware.js";

import { v2 as cloudinary } from "cloudinary";
import sendMail from "../utils/mailer.js";

import uploadCloud from "../config/uploader.js";
import buyOk from "../Middleware/buyOk.js";
const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 18;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: 1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  protect,
  employee,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

productRoute.get(
  "/search/:type",
  asyncHandler(async (req, res) => {
    const products = await Product.find({
      $text: {
        $search: req.params.type,
      },
    });
    res.json(products);
  })
);

//get love product
productRoute.get(
  "/loving",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).limit(4).sort({ rating: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyBuy = Order.findById(req.user._id.toString());
      console.log(alreadyBuy);
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Bạn đã đánh giá Món này rồi");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  // admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// HIDE REVIEW
productRoute.put(
  "/review/:id",
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    const index = req.body.index;
    const product = await Product.findById(req.params.id);
    if (product) {
      const reviews = product.reviews;
      reviews[index].comment = "";
      console.log(reviews[index]);
      const updateProductd = await product.save();
      res.status(201).json(updateProductd);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

//DELETE REVIEW
// productRoute.delete(
//   "/review/:id",
//   // protect,
//   // admin,
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     console.log(product)
//     if (product) {
//       console.log(product.review[req.index])
//       await product.review[req.index].remove();
//       res.json({ message: "Product deleted" });
//     } else {
//       res.status(404);
//       throw new Error("Product not Found");
//     }
//   })
// );

//delete all
productRoute.delete(
  "/",
  asyncHandler(async (req, res) => {
    const product = await Product.findById({});
    await product.deleteMany();
  })
);
// CREATE PRODUCT
productRoute.post(
  "/",
  // protect,
  // admin,
  uploadCloud.single("image"),
  asyncHandler(async (req, res) => {
    const fileData = req.file;
    const { name, price, description, image, category, isShow } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      console.log(fileData);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        category,
        isShow,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        if (fileData) cloudinary.uploader.destroy(fileData.filename);
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  // admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      // image,
      category,
      isShow,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      // product.image = image || product.image;
      product.category = category || product.category;
      product.isShow = isShow || product.isShow;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

productRoute.get(
  "/searchProduct/:option",
  asyncHandler(async (req, res) => {
    const option = req.params.option;
    if (option == "old") {
      const products = await Product.find({}).sort({ _id: -1 });
      res.json(products);
    } else {
      const products = await Product.find({ created_at: 1 });
      res.json(products);
    }
  })
);

productRoute.get(
  "/category/:q",
  asyncHandler(async (req, res) => {
    const product = await Product.find({
      category: req.params.q,
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

export default productRoute;

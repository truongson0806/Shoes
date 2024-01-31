import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const fakeTotalQuantity = 100;
      const fakeTotalPrice = 5000;

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isEmployee: user.isEmployee,
        token: generateToken(user._id),
        createdAt: user.createdAt,
        totalQuantity: fakeTotalQuantity,
        totalPrice: fakeTotalPrice,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);


// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// add amin
userRouter.post(
  "/addAdmin",
  asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);
// add employee
userRouter.post(
  "/addEmployee",
  asyncHandler(async (req, res) => {
    const { name, email, password, isEmployee } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      isEmployee,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmployee: user.isEmployee,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);
// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    // async function setPropertiesForAllDocuments() {
    //   try {
    //     // Update all documents in the collection
    //     await User.collection.updateMany({}, {$set:{isActive: true}})

    //     console.log('Properties updated for all documents.');
    //   } catch (error) {
    //     console.error('Error updating properties:', error);
    //   }
    // }

    // setPropertiesForAllDocuments();
    const users = await User.find({});
    res.json(users);
  })
);
//get all admin account

userRouter.get(
  "/admin",
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    const admins = await User.find({ isAdmin: true });
    if (admins) {
      res.status(200).json(admins);
    } else {
      res.status(404);
      throw new Error("can not get user");
    }
  })
);
//get all employee acount
userRouter.get(
  "/employee",
  // protect,
  asyncHandler(async (req, res) => {
    const employees = await User.find({ isEmployee: true });
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(404);
      throw new Error("can not get user");
    }
  })
);

//Deactive admin account

userRouter.delete(
  "/:id",
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "user deleted" });
    } else {
      res.status(404);
      throw new Error("user not Found");
    }
  })
);

//BAN USER
userRouter.put(
  "/ban",
  protect,
  asyncHandler(async (req, res) => {
    const user = User.findByIdAndUpdate(req.user._id);
    if (user) {
      user.isActive = false;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser.isActive,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
// UPDATE TO EMPLOYEE
userRouter.put(
  "/upToEmployee/:id",
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.isEmployee = true;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isEmployee: updatedUser.isEmployee,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
userRouter.put(
  "/downToUser/:id",
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.isEmployee = false;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isEmployee: updatedUser.isEmployee,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);
export default userRouter;

import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import pdfRoutes from "./Routes/PdfRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import categoryRouter from "./Routes/categoryRoutes.js";
import TransactionRoute from "./Routes/transactionRoute.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
const allowOrigin=["http://localhost:4000","http://localhost:3000","*"]
const corsOption={
  origin:allowOrigin,
  method:['PUT','GET','PATCH','DELETE','OPTIONS'],
  optionsSuccessStatus:200,
  credentials:true
}
app.use(cors(corsOption));
app.use(express.static("public"));
// API
app.use("/api/pdf", pdfRoutes);
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/transaction", TransactionRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));  


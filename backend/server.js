import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "../backend/routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path"; // import path

dotenv.config(); // the value will be loaded in process env
//conect to mongodb database

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
//you need to convert to json format file

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use api seed
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/api/products", (req, res) => {
  res.send(productRouter);
});

const __dirname = path.resolve(); // gets the path of the folder
// ser files as static  files  (middleware)

app.use(express.static(path.join(__dirname, "/frontend/build"))); 
app.get('*',(req,res)=>res.sendFile(path.join(__dirname, ' /frontend/build/index.html'))) // serves index.html in the backend
//error handler for epress
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message }); //error message coming from asynchandler
});

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

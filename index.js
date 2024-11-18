const express = require("express");
const cors = require("cors");
const connectDB = require("./Db");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoutes");
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 8001;


app.use("/api", userRoute);
app.use("/cart", cartRoute);



app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});















// app.get("/post", async (req, res) => {
//   try {
//     const data = res.send("helloo");
//   } catch (error) {
//     console.log("error", error);
//   }
// }); 








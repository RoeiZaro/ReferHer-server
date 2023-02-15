// const io = require("socket.io")(2000, {
//     cors: {
//       origin: [
//         "http://localhost:5174",
//         "http://localhost:5173",
//         "http://localhost:8000",
//       ],
//     },
//   });

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const users = require("./routes/userRoute");

// io.on("connection", (socket) => {
//   console.log(`a user {${socket.id}} connected`);
//   socket.on("disconnect", () => {
//     console.log(`user {${socket.id}} disconnected`);
//   });
// });

mongoose
  .connect(process.env.mongo, {})
  .then(() => console.log("connected to atlas succsesfully"))
  .catch((err) => console.log("connection failed", err));

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("connected to database");

//   const actions = connection.collection("actions").watch();
//   actions.on("change", async (change) => {
//     switch (change.operationType) {
//       case "insert":
//         const action = change.fullDocument;
//         io.emit("new-action", action);
//         break;
//       case "update":
//         const documentKey = change.documentKey;
//         const data = await connection
//           .collection("actions")
//           .findOne({ _id: documentKey._id });
//         io.emit("update-action", data);
//         break;
//       case "delete":
//         const acti = change.fullDocument;
//         io.emit("delete-action", acti);
//         break;
//     }
//   });

// io.on('add-watch', (data) => {
//     actions.
// })
// });

app.use(bodyParser.json());
app.use(cors());
app.use("/", users);

app.listen(8000, () => {
  console.log("listening on port 8000");
});

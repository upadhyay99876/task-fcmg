const mongoose = require("mongoose");

const database = mongoose.connect(
  "mongodb://localhost:27017/fcmgProduct1",
  { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

module.exports = database;

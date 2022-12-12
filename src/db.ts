import mongoose from "mongoose";

const connectDB=()=>{
    const connectionOptions:any = {
        useNewUrlParser: true,
        // useCreateIndex: true,
        connectTimeoutMS: 300000, // 5 minutes
        useUnifiedTopology: true,
    }
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB,connectionOptions,(err)=>{
     if(err){
            console.log(err);
        }
    });
    mongoose.connection.on("connecting", function () {
        console.log("Connecting to MongoDB...");
      });
      mongoose.connection.on("connected", function () {
        console.log("Connected to MongoDB...");
      });
      mongoose.connection.on("open", function () {
        console.log("MongoDB connection opened!");
      });
      mongoose.connection.on("error", function (err) {
        console.log(err);
        mongoose.disconnect();
      });
      mongoose.connection.on("disconnected", function () {
        console.log("MongoDB disconnected!");
        mongoose.connect(process.env.DB, connectionOptions, function (err) {
          if (err) console.log(err);
        });
      });
      mongoose.connection.on("reconnected", function () {
        console.log("MongoDB reconnected!");
      });
      mongoose.connection.on("close", function () {
        console.log("MongoDB closed");
      });
}
export default connectDB;
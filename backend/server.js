import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const poem = new mongoose.Schema({
  date: String,
  id: Number,
  img: Array,
  text: Array,
  title: String,
  likes: Number,
});

const poemdb = mongoose.connection.useDb("poem");
const Poem = poemdb.model("poem", poem);
const Writing = poemdb.model("writing", poem);

app.get("/getAll", async (req, res) => {
  const poems = await Poem.find();
  const writings = await Writing.find();
  res.status(200).json({ poems: poems, writings: writings });
});

app.post("/add", (req, res) => {
  const { collection, document } = req.body;
  let data;
  if (collection == "poem") {
    data = Poem.insertOne(document);
  } else {
    data = Writing.insertOne(document);
  }
  res.status(200).json(data);
});

app.post("/edit", async (req,res) => {
  const {collection, filter, update} = req.body;
  let data;
  if(collection == "poem"){
    data = await Poem.updateOne(filter, update, {upsert: false})
  } else{
    data = await Writing.updateOne(filter, update, {upsert: false})
  }
  res.status(200).json(data)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

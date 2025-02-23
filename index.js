const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./userModel");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("read", { users: allUsers });
});

app.post("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    imageUrl: req.body.image,
  });
  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.listen(3000, () => console.log("Server is running on Port : 3000"));

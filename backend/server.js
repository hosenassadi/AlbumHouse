const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, "data");

const readJsonFile = (filename) => {
  const filePath = path.join(dataPath, filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeJsonFile = (filename, data) => {
  const filePath = path.join(dataPath, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

//for users
app.post("/api/users", (req, res) => {
  const users = readJsonFile("users.json");
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  writeJsonFile("users.json", users);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const users = readJsonFile("users.json");
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    writeJsonFile("users.json", users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const users = readJsonFile("users.json");
  const userId = parseInt(req.params.id);
  const filteredUsers = users.filter((user) => user.id !== userId);
  writeJsonFile("users.json", filteredUsers);
  res.status(204).send();
});


app.get("/api/users", (req, res) => {
  const users = readJsonFile("users.json");
  res.json(users);
});

//for albums

app.get("/api/albums", (req, res) => {
  const albums = readJsonFile("albums.json");
  res.json(albums);
});

app.post("/api/albums", (req, res) => {
  const albums = readJsonFile("albums.json");
  const newAlbum = { id: albums.length + 1, ...req.body };
  albums.push(newAlbum);
  writeJsonFile("albums.json", albums);
  res.status(201).json(newAlbum);
});

app.put("/api/albums/:id", (req, res) => {
  const albums = readJsonFile("albums.json");
  const albumId = parseInt(req.params.id);
  const updatedAlbum = req.body;
  const index = albums.findIndex((album) => album.id === albumId);
  if (index !== -1) {
    albums[index] = { ...albums[index], ...updatedAlbum };
    writeJsonFile("albums.json", albums);
    res.json(albums[index]);
  } else {
    res.status(404).json({ message: "Album not found" });
  }
});

app.delete("/api/albums/:id", (req, res) => {
  const albums = readJsonFile("albums.json");
  const albumId = parseInt(req.params.id);
  const filteredAlbums = albums.filter((album) => album.id !== albumId);
  writeJsonFile("albums.json", filteredAlbums);
  res.status(204).send();
});

// for images

app.get("/api/images", (req, res) => {
  const images = readJsonFile("images.json");
  res.json(images);
});

app.post("/api/images", (req, res) => {
  const images = readJsonFile("images.json");
  const newImage = { id: images.length + 1, ...req.body };
  images.push(newImage);
  writeJsonFile("images.json", images);
  res.status(201).json(newImage);
});

app.put("/api/images/:id", (req, res) => {
  const images = readJsonFile("images.json");
  const imageId = parseInt(req.params.id);
  const updatedImage = req.body;
  const index = images.findIndex((image) => image.id === imageId);
  if (index !== -1) {
    images[index] = { ...images[index], ...updatedImage };
    writeJsonFile("images.json", images);
    res.json(images[index]);
  } else {
    res.status(404).json({ message: "Image not found" });
  }
});

app.delete("/api/images/:id", (req, res) => {
  const images = readJsonFile("images.json");
  const imageId = parseInt(req.params.id);
  const filteredImages = images.filter((image) => image.id !== imageId);
  writeJsonFile("images.json", filteredImages);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
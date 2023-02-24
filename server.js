const express = require("express");
const app = express();
const port = 3000;
const uuid = require("uuid");
console.log(uuid.v4());

app.use(express.static("public"));
app.use(express.json());

let users = [
  { name: "Rose's Fav Boi", email: "rosefavboi", age: 22, id: uuid.v4() },
  { name: "Jenny's Fav Boi", email: "jennyfavboi", age: 23, id: uuid.v4() },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = uuid.v4();
  users.push(newUser);
  res.send(users);
});

const isCheckError = (req, res, next) => {
  const id = req.params.id;
  const findUser = users.find((user) => user.id === id);
  if (findUser) {
    next();
  } else {
    res.send({ message: "Error" });
  }
};

app.delete("/users/:id", isCheckError, (req, res) => {
  const userId = req.params.id;
  const filterUser = users.filter((user) => {
    return user.id !== userId;
  });
  users = filterUser;
  res.send(users);
});

app.put("/users", (req, res) => {
  const userId = req.body;
  console.log(userId);
  const newUserId = userId.id;
  const checkUserId = users.find((user) => {
    return user.id === newUserId;
  });
  if (checkUserId) {
    checkUserId.name = userId.name;
    checkUserId.email = userId.email;
    checkUserId.age = userId.age;
    res.send(users);
  }
});

app.listen(port, () => {
  console.log(`Server Started: Listenning on port ${port}`);
});

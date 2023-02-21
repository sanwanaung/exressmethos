// const express = require("express");
// const app = express();
// const port = 3000;

// app.use(express.static("public"));
// app.use(express.json());

// const users = [
//   { name: "Rose's Fav Boi", email: "rosefavboi@gmail.com", age: 22 },
//   { name: "Lisa's Fav Boi", email: "lisafavboi@gmail.com", age: 23 },
// ];

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.post("/users", (req, res) => {
//   console.log(req.body);
//   const newUser = req.body;
//   users.push(newUser);
//   res.send(users);
// });

// app.listen(port, () => {
//   console.log(`Server Started: Listenning on port ${port}`);
// });

// Trying Again

const express = require("express");
const app = express();
const port = 3000;

let users = [
  { name: "Rose's Fav Boi", email: "rosefavboi", age: 22, id: 1 },
  { name: "Jenny's Fav Boi", email: "jennyfavboi", age: 23, id: 2 },
];

app.use(express.static("public"));
app.use(express.json());

app.post("/users", (req, res) => {
  // console.log(req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(users);
});

app.delete("/users", (req, res) => {
  const userId = req.body;
  const newUserId = userId.id;
  const filterUser = users.filter((user) => {
    return user.id !== Number.parseInt(newUserId);
  });
  users = filterUser;
  console.log(users);
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
    checkUserId.age = Number.parseInt(userId.age);
    res.send(users);
  }
});

app.listen(port, () => {
  console.log(`Server Started: Listenning on port ${port}`);
});

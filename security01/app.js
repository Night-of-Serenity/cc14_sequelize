const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// let msg = "Codecamp14";
// let hashMsg = bcrypt.hashSync(msg);
// console.log(hashMsg);
// console.log(bcrypt.hashSync("Codecamp14"));

// console.log(
//   bcrypt.compareSync("Codecamp14", "$2a$10$5wkqBmVW9LbO8h.XB6cNteukOv3..7x7QrqexOY7CYiGzjlor5hly")
// );

let payload = { id: 3, name: "Andy" };

let token = jwt.sign(payload, "Codecamp14", { expiresIn: "7d" });

console.log(token);

let token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkJvYmJ5IiwiaWF0IjoxNjg0NDcxNDc1LCJleHAiOjE2ODUwNzYyNzV9.Hh1erSgDWwvV_r0gyNRnWkGQgZ221WRbCxhZHaPV7mQ";
let token3 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkJvYmJ5IiwiaWF0IjoxNjg0NDcxNDc1LCJleHAiOjE2ODUwNzYyNzV9.xKT1eMaADeX0WB6D0LRXoW5w5AbeR9QvQ_1cRATlCJQ";
let token4 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkJvYmJ5IiwiaWF0IjoxNjg0NDcxNDc1LCJleHAiOjE2ODUwNzYyNzV9.Hh1erSgDWwvV_r0gyNRnWkGQgZ221WRbCxhZHaPV7mQ";
let token5 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhYWRzIjoyMzQzMiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyMn0.LBXEwqUaV5vJqlMV9K6clPMhuDu4LD0JyFyTnETPEGw";
let checkToken = jwt.verify(token4, "Codecamp14");
console.log(checkToken);

import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.vn",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Tuan Anh",
    email: "tuananh@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;

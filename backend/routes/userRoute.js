import express from "express";
import User from "../models/userModel";
import { getToken, isAuth } from "../util";

const router = express.Router();
//  http://localhost:5000/api/users/:id
//    use: /api/users
router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else res.status(404).send({ message: "User Not Found" });
});

// api đăng nhập
router.post("/signin", async (req, res) => {
  // tìm account trong database
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  // kiểm tra account đó có hay không
  if (signinUser) {
    //trả về front-end thông tin account (đăng nhập thành công)

    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    //trả về front-end lỗi (đăng nhập thất bại)
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});

//đăng kí
router.post("/register", async (req, res) => {
  // tạo tài khoản (req.body là thông tin frontend gửi lên)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();

  //kiểm tra tài khoản mới có hay không
  if (newUser) {
    //trả về thông tin tài khoản

    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    //trả về front-end lỗi (đăng kí thất bại)
    res.status(401).send({ message: "Invalid User Data." });
  }
});

// api tạo admin
router.get("/createadmin", async (req, res) => {
  try {
    // tạo account
    const user = new User({
      name: "Basir",
      email: "admin@example.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    //trả về front-end lỗi (đăng kí admin thất bại)
    res.send({ message: error.message });
  }
});

export default router;

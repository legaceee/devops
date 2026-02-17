import * as express from "express";
import { hash } from "bcrypt";
import { prisma } from "@repo/db/client";
const app = express.default();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hii there");
});
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        msg: "err",
      });
    }
    const hashpassword = await hash(req.body.password, 12);

    const user = await prisma.user.create({
      data: { username, password: hashpassword },
    });
    res.json({
      msg: "success",
      id: user.id,
    });
  } catch (error) {
    return res.json({
      msg: "error",
    });
  }
});
app.listen(3002);

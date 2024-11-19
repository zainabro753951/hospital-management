const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { adminModel } = require("../../hospitalCollection");

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let emailVerified = await adminModel.findOne({ email });
    if (!emailVerified) {
      return res.json({ notFound: "Admin not found" });
    }
    let isMatch = await bcrypt.compare(password, emailVerified.password);
    if (!isMatch) {
      return res.json({ wrongCred: "Invalid credentials" });
    }
    req.session.AdminId = emailVerified._id;
    res.status(200).json({ successMessage: "Login successful" });
  } catch (err) {
    return res.json({ err: "Server error" });
  }
});

module.exports = router;

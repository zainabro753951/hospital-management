const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { adminModel } = require("../../hospitalCollection");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/admin");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/signup", upload.single("image"), async (req, res) => {
  const { file } = req;
  let filePath = file.path;
  let dataBasefilePath = filePath.substring(8);

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validate passwords
  if (password !== confirmPassword) {
    // Remove the uploaded file
    if (file && filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
    }
    return res.json({ errorMessage: "Passwords do not match" });
  }
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new admin model instance
    const newAdmin = new adminModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      profileImage: file ? dataBasefilePath : null,
    });

    // Save to database
    const result = await newAdmin.save();
    return res.status(200).json({ successMessage: "Successfully registered" });
  } catch (err) {
    // Remove the uploaded file in case of an error
    if (file && filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
    }
    console.error("Error during submission:", err);
    return res.json({
      errorMessage: "Something went wrong during submission",
    });
  }
});

module.exports = router;

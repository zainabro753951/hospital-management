const router = require("express").Router();
const isAdminAuthenticate = require("../../middleware/auth");
const { adminModel } = require("../../hospitalCollection");
router.get("/dashboard", isAdminAuthenticate, (req, res) => {
  let adminId = req.session.AdminId;
  res.status(200).json({ message: "Welcome to the Dashboard!", adminId });
});

// admindata
router.get("/admin-data", isAdminAuthenticate, async (req, res) => {
  let adminId = req.session.AdminId;
  let data = await adminModel.findOne({ _id: adminId });
  res.json(data);
});

module.exports = router;

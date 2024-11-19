const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { doctorModel } = require("../../hospitalCollection");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Doctors");
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

router.post("/add_doctor", upload.single("doctorImage"), async (req, res) => {
  let doctorImage = req.file.path;
  let {
    doctor_name,
    DoB,
    Specialization,
    Experience,
    age,
    phoneNumber,
    email,
    gender,
    doctorDetials,
    address,
  } = req.body;
  let data = await doctorModel.findOne({ email });
  if (data) {
    return res.json({ doctorFound: "Doctor Already Registered" });
  }
  try {
    let sendData = await doctorModel({
      doctor_name: doctor_name,
      DoB: DoB,
      Specialization: Specialization,
      Experience: Experience,
      age: age,
      phoneNumber: phoneNumber,
      email: email,
      gender: gender,
      doctorDetials: doctorDetials,
      address: address,
      doctorImage: doctorImage,
    });
    let result = await sendData.save();
    res.json({ success: "Doctor successfully added" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get_doctors", async (req, res) => {
  let data = await doctorModel.find();
  res.json(data);
});
router.post("/search", async (req, res) => {
  let keyword = req.body.search;
  let searcheData = await doctorModel.find({
    doctor_name: { $regex: `^${keyword}`, $options: "i" },
  });
  res.json(searcheData);
});
router.delete("/delete_doc", async (req, res) => {
  let ids = req.body.ids;
  let deleted = await doctorModel.deleteMany({ _id: { $in: ids } });
  res.json({ Successmessage: "Items deleted successfully" });
});

module.exports = router;

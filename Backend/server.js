const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const path = require("path");
const PATH = 2000;
const signup = require("./Routes/Admin/signup");
const login = require("./Routes/Admin/login");
const dashboard = require("./Routes/Admin/dashboard");
const doctor = require("./Routes/Admin/doctor");
// middlewares
const sessionStore = new session.MemoryStore();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "AdminId",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

// Routes
app.use(signup);
app.use(login);
// protected Routes
app.use(dashboard);
app.use(doctor);

app.listen(PATH, () => console.log(`http://localhost:${PATH}/`));

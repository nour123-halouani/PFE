//import B
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//import routes
const signup = require("./Routes/signupUser");
const login = require("./Routes/Route_login");
const forgot = require ("./Routes/Password_forgot")
const getData = require ("./Routes/Dashboard")
const affiche = require ("./Routes/profilEtud")
const visio = require ("./Routes/Visio")
const logger = require("morgan");
const forum = require ("./Routes/forum")



//import file env
const dotenv = require("dotenv");
dotenv.config();

//MongoDB config
require("./connection/db");

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(cors());

const API_KEY = process.env.daily_API_KEY;




const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};



const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};

app.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;
  console.log(roomId);

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});




// user routes
app.use("/api/user", signup);
app.use("/api/userlogin", login);
app.use("/api/userforgot", forgot)
app.use("/api/data",getData)
app.use("/api/Affiche", affiche)
app.use("/api/visio", visio)
app.use("/api/forum", forum)

//listen //port 5000
app.listen(process.env.PORT || 4000);
const express = require("express");
const router = express.Router()


const { addForum , getForum , addComment, getForumById , updateForum, updateComment ,deleteCom} = require("../controllers/forum")




router.post("/addForum", addForum);
router.get('/getForum', getForum);
router.post("/addComment", addComment);
router.post("/getForumById" , getForumById);
router.put("/updateForum" , updateForum)
router.put("/updateComment" , updateComment)
router.put("/deleteCom" , deleteCom)

module.exports = router
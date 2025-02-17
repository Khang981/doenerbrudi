const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const router = express.Router();

router.route("/user").post(postControllers.getUser);

router.route("/getFindUser").post(postControllers.getFindUser);

router.route("/Friends").post(postControllers.getFriendList);

router.route("/getFriendRequest").post(postControllers.getFriendRequest)

router.route("/postFriendRequest").post(postControllers.postFriendRequest);

router.route("/getLogin").post(postControllers.getLogin);

router.route("/chat").post(postControllers.getChatMessages)

router.route("/postMessage").post(postControllers.postMessage)

router.route("/postNewAppointment").post(postControllers.postNewAppointment)

router.route("/getAppointment").post(postControllers.getAppointment)

module.exports = router;
const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const router = express.Router();

router.route("/user").get(postControllers.getUser).post(postControllers.postChangeUserData);

router.route("/getFindUser").get(postControllers.getFindUser);

router.route("/Friends").get(postControllers.getFriendList);

router.route("/FriendRequest").get(postControllers.getFriendRequest).post(postControllers.postFriendRequest);

router.route("/getLogin").get(postControllers.getLogin);

router.route("/chat").get(postControllers.getChatMessages).post(postControllers.postMessage)

module.exports = router;
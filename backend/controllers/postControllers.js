const Get = require("../modules/Get");
const Post = require("../modules/Post");

exports.getUser = async (req, res, next) => {
    let {userId} = req.body;
    let post = new Get();
    try{
        post = await Get.getUser(userId);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log(error);
        next(error);
    }
}

exports.getFriendList = async (req, res, next) => {
    let {userId} = req.body;
    let post = new Get();
    try{
        post = await Get.getFriendList(userId);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log(error);
        next(error);
    }
}

exports.getFindUser = async (req, res, next) => {
    let {search} = req.body;
    let post = new Get();
    try{
        post = await Get.getFindUser(search);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log(error);
        next(error);
    }
}

exports.getChatMessages = async (req, res, next) => {
    let {search} = req.body;
    let post = new Get();
    try{
        post = await Get.getFindUser(search);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log(error);
        next(error);
    }
}

exports.getLogin = async (req, res, next) => {
    let {username, email, password} = req.body;
    let post = new Get();
    try{
        post = await Get.getLogin(username, email, password);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log("error", error);
        next(error);
    }
}

exports.getFriendRequest = async (req, res, next) => {
    let {userId} = req.body;
    let post = new Get();
    try{
        post = await Get.getFriendRequest(userId);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log("error", error);
        next(error);
    }
}

//####################################################################//

exports.postChangeUserData = async (req, res, next) => {
    let body = req.body;
    let post = new Post();
    try{
        post = await Post.postChangeUserData(body);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log("error", error);
        next(error);
    }
}

exports.postMessage = async (req, res, next) => {
    let body = req.body;
    let post = new Post();
    try{
        post = await Post.postChangeUserData(body);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log("error", error);
        next(error);
    }
}

exports.postFriendRequest = async (req, res, next) => {
    let body = req.body;
    let post = new Post();
    try{
        post = await Post.postFriendRequest(body);
        console.log(post[0]);
        res.json(post[0]);

    } catch (error){
        console.log("error", error);
        next(error);
    }
}

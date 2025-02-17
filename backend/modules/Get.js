/** 
 * This part of the code will be used by the server to send 
 * SQL queries to the database and retrieve, and return the response from the 
 * database back to the endpoints
*/ 

const db = require("../config/db")
class Get {

    static getUser(userId) {
        let sql = 
            `
            SELECT * FROM user  
            WHERE id = '${userId}'
        `;
            
        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getFindUser(search) {
        let sql = 
            `
            SELECT 
                id,
                username, 
                nickname, 
                email, 
                lastlogin 
            FROM user  
            WHERE deleted = 0 AND (username LIKE '%${search}%' OR nickname LIKE '%${search}%')
        `;
            
        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getFriendList(userId) {
        let sql = `
            SELECT 
                fl.friendId AS userId, 
                u.username, 
                u.nickname, 
                u.email, 
                u.lastlogin 
            FROM friendlist AS fl
            LEFT JOIN user AS u ON fl.friendId = u.id
            WHERE fl.userId = '${userId}' AND u.deleted = 0
        `;
    
        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getFriendRequest(userId) {
        let sql = `
            SELECT 
                *
            FROM friendrequest
            WHERE receiverId = '${userId}'
        `;
    
        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getLogin(username, email, password) {
        let sql = '';

        if(!!username){
            sql = `
                SELECT 
                    id
                FROM user
                WHERE username = '${username}' AND password = '${password}' AND deleted = 0
            `;
        }else if(!!email){
            sql = `
                SELECT 
                    id
                FROM user
                WHERE email = '${email}' AND password = '${password}' AND deleted = 0
            `;  
        }
    
        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getAppointments(userId) {
        let sql = 
            `
            SELECT 
                a.*,
                at.appointmentDate,
                at.accepted,
                at.creatorId,
                at.active
            FROM appointmentstable AS at
            LEFT JOIN appointments AS a ON at.appointmentId = a.id
            WHERE at.userId = '${userId}' AND active = 1
            `;
        
        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getHistory(userId) {
        let sql = 
            `
            SELECT 
                a.*,
                at.appointmentDate
                at.accepted,
                at.creatorId,
                at.active
            FROM appointmentstable AS at
            LEFT JOIN appointments AS a ON at.appointmentId = a.id
            WHERE at.userId = '${userId}' AND active = 0
        `;

        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }

    static getChatMessages(userId) {
        let sql = 
            `
            SELECT
                c.timestamp AS chatTimestamp,
                m.*
            FROM messages AS m
            LEFT JOIN chat AS c ON c.id = m.chatId
            LEFT JOIN chattable AS ct ON ct.chatId = m.chatId
            WHERE ct.userId = '${userId}'
        `;

        try{
            return db.execute(sql);
        }catch (error){
            console.log(error);
            return error
        }
    }
}

module.exports = Get;
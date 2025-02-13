const db = require("../config/db")
class Post {

    static postChangeUserData(body) {
        if (!body || Object.keys(body).length === 0) {
            return Promise.resolve(); 
        }
    
        const updates = [];
        const values = [];
    
        if (body.nickname) {
            updates.push("nickname = ?");
            values.push(body.nickname);
        }
    
        if (body.password) {
            updates.push("password = ?");
            values.push(body.password);
        }
    
        if (body.lastlogin) {
            updates.push("lastlogin = ?");
            values.push(body.lastlogin);
        }
    
        if (body.deleted !== undefined) { 
            updates.push("deleted = ?");
            values.push(body.deleted);
        }
    
        if (updates.length === 0) {
          return Promise.resolve(); 
        }
    
        let sql = `UPDATE user SET ${updates.join(", ")} WHERE id = ?`;
        values.push(body.userId);     
        // console.log("SQL:", sql, values);
    
        return db.execute(sql, values);
    }

    static async postNewChat(body) {
        await db.execute(`
            INSERT INTO chat (timestamp) VALUES ('${body.chatTimestamp}')
        `)

        for (const id of body.ids) {
            await db.execute(`
                INSERT INTO chattable (userId, chatId) VALUES = ('${id}', '${body.chatId}')
            `)
        };

        const sql =
        `
        INSERT INTO messages (chatId, senderId, messagetext)
        VALUES ('${body.chatId}','${body.senderId}','${body.messagetext}')
        `;

        return db.execute(sql, values);
    }


    static async postMessage(body) {
        await db.execute(`
            UPDATE chat SET timestamp = '${body.chatTimestamp}'
        `)

        const sql =
        `
        INSERT INTO messages (chatId, senderId, messagetext)
        VALUES (${body.chatId},${body.senderId},${body.messagetext})
        `;

        return db.execute(sql, values);
    }

    static async postFriendRequest(body) {
        const sql =
        `
        INSERT INTO friendrequest (senderId, senderId, messagetext)
        VALUES (${body.chatId},${body.senderId},${body.messagetext})
        `;

        return db.execute(sql, values);
    }

}

module.exports = Post;
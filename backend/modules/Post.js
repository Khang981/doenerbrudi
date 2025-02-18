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

    static async postNewAppointment(body) {
        // const test = {
            // invited: ["1", "3"], 
            // appointmentDate: "2025-02-20",
            // creatorId: "1", 
            // businessName: 'name',
            // businessLocation: 'test2 street' 
        // }

        try{
            const newAppointment = await db.execute(`
                INSERT INTO appointments (businessName, businessLocation) VALUES ('${body.businessName}', '${body.businessLocation}')
            `)

            body.invited.map(async e => {
                console.log(e);
                try{
                    await db.execute(`
                        INSERT INTO appointmentstable (userId, appointmentId, appointmentDate, creatorId) 
                        VALUES ('${e}', '${newAppointment[0].insertId}', '${body.appointmentDate}','${body.creatorId}')
                    `)
                }catch (error){
                    console.log("error", error);
                    return error;
                }
            })
        }catch (error){
            console.log("error", error);
            return error;
        }

        return { success: true, message: "Termin erfolgreich erstellt." };
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

        return db.execute(sql);
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

        return db.execute(sql);
    }

    static postFriendRequest(body) {
        const sql =
        `
        INSERT INTO friendrequest (senderId, receiverId)
        VALUES (${body.senderId},${body.receiverId})
        `;

        return db.execute(sql);
    }

}

module.exports = Post;
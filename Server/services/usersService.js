const { firebase, db } = require('../utils/admin');

const usersService = {

    // async getUserByEmail(email) {
    //     try{
    //         let doc = await db.collection('users').where('email','==',email).limit(1).get();
    //         if(doc.empty) {
    //             return ({ email: "this email is not exists" });
    //         }
    //         let user = doc.docs[0].data();
    //         return user;
    //     } catch(err) {
    //         console.log(e);
    //         throw Error(e);
    //     }
    // },

    async registerUser(newUser) {
        try{
            let token, userId;
            let doc = await db.collection('users').where('email','==',newUser.email).get();
            if(!doc.empty) {
                return ({ email: "this email is already in use" });
            }
            let data = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            userId = data.user.uid;
            token = await data.user.getIdToken();
            const userCredentials = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            };
            await db.collection('users').add(userCredentials);
            return token;

        } catch(e) {
            console.log(e);
            throw Error(e);
        }
    },
    
    async loginUser(user) {
        try{
            let data = await firebase.auth().signInWithEmailAndPassword(user.email,user.password);
            if(data.user != null) {
                return (await data.user.getIdToken());
            }
            return ({error:"server error"});
        } catch(e) {
            console.log(e);
            throw Error(e);
        }
    }
}

module.exports = usersService;
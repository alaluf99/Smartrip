const { firebase, db } = require('../utils/admin');

const usersService = {

    async registerUser(newUser) {
        try{
            let token, userId;
            let doc = await db.doc(`/users/${newUser.handle}`).get();
            if(doc.exists) {
                return ({ handle: "this handle is already taken" });
            }
            let data = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            userId = data.user.uid;
            token = await data.user.getIdToken();
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            };
            await db.doc(`/users/${newUser.handle}`).set(userCredentials);
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
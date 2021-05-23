const usersService = require('../services/usersService');
const { validateSignupData, validateLoginData, } = require("../utils/validators");
const { admin, db } = require('../utils/admin');

const UsersController = {

    async getUserByEmail(req, res) {
        try {
            const userEmail = req.body.email;
            let user = await usersService.getUserByEmail(userEmail);
            return res.status(200).json({ user });
        } catch(err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: err.message });
            
        }
    },

    async getUser(req, res) {
        let idToken;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer ')
        ) {
          idToken = req.headers.authorization.split('Bearer ')[1];
        } else {
          console.error('No token found');
          return res.status(403).json({ error: 'Unauthorized' });
        }
      
        admin
          .auth()
          .verifyIdToken(idToken)
          .then((decodedToken) => {
            req.user = decodedToken;
            return db
              .collection('users')
              .where('userId', '==', req.user.uid)
              .limit(1)
              .get();
          })
          .then((data) => {
            let user = data.docs[0].data();
            return res.status(200).json({ user });
          })
          .catch((err) => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
          });
    },

    async registerUser(req, res) {
        const newUser = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
    
        const { valid, errors } = validateSignupData(newUser);
    
        if (!valid) return res.status(400).json(errors);
        try{
            var token = await usersService.registerUser(newUser);
            return res.status(201).json({ token });
        } catch(err) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
            return res.status(400).json({ email: "Email is already is use" });
            } else {
            return res
                .status(500)
                .json({ error: err.message });
            }
        }
    },
    
    async loginUser(req, res) {
        const user = {
            email: req.body.email,
            password: req.body.password,
          };
          const { valid, errors } = validateLoginData(user);
        
          if (!valid) return res.status(400).json(errors);
          try {
                var token = await usersService.loginUser(user);
                if(token.error) return res.status(400).json(token);
                return res.status(200).json({token:token})
          } catch(e) {
                console.error(e);
                return res.status(400).json({error:e.message});
          }
    },
}

module.exports = UsersController;
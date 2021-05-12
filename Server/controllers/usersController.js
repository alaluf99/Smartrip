const usersService = require('../services/usersService');
const { validateSignupData, validateLoginData, } = require("../utils/validators");

const UsersController = {

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
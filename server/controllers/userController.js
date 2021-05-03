const user = require('../models/user');

async function addUser(req, res) {
  if (req.body.firstName === undefined
    || req.body.lastName === undefined
    || req.body.email === undefined
    || req.body.password === undefined
  ) {
    res.status(400);
    res.send({ message: 'Invalid body' });
  } else {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    try {
      const preExistingUser = await user.findOne({email})
      if (preExistingUser) {
        res.status(409)
        res.send({ message: 'Cannot create user'})
      }
      else {
        const newUser = await user.create({
          firstName,
          lastName,
          email,
          password,
        });
        res.status(201);
        res.send({ message: 'Successfully created new user', _id: newUser._id });
      }
    } catch (error) {
      res.status(500);
      console.error(error);
    }
  }
}

async function loginUser(req, res) {
  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(400);
    res.send({ message: 'Invalid body' });
  }
  else {
    const {email, password} = req.body;
    try {
      const userToLogin = await user.findOne({email, password});
      if (userToLogin) {
        res.status(200);
        res.send({message: 'Successfully Logged in user', _id: userToLogin._id });
      }
      else {
        res.status(401);
        res.send({message: 'Failed to Login user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = { addUser, loginUser };

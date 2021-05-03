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
      const newUser = await user.create({
        firstName,
        lastName,
        email,
        password,
      });
      res.status(201);
      res.send({ message: 'Successfully created new user', _id: newUser._id }); // eslint-disable-line
    } catch (error) {
      res.status(500);
      console.error(error); // eslint-disable-line
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

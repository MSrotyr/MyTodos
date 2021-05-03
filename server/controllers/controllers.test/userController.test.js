const express = require('express');
const router = require('../../router');
const supertest = require('supertest');

const User = require('../../models/user');

const mongoose = require('mongoose');
const databaseName = 'testUser';

const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);

describe('User controller tests', () => {
  const mockUser = { firstName: 'John', lastName: 'Doe', email: 'email@email.com', password: 'password' };
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  })

  it('should create and save a new user to the database', async () => {
    await request.post('/users/').send(mockUser);

    const user1 = await User.findOne({ firstName: mockUser.firstName });

    expect(user1.firstName).toBe(mockUser.firstName);
    expect(user1.lastName).toBe(mockUser.lastName);
    expect(user1.email).toBe(mockUser.email);
    expect(user1.password).toBe(mockUser.password);
  });


  it('Should not create a user if the email already exists', async () => {
    await request.post('/users/').send(mockUser);
    const {body, status} = await request.post('/users/').send(mockUser);

    expect(body.message).toBe('Cannot create user')
    expect(status).toBe(409);
  })

  it('should not create user if the credentials are undefined ', async () => {
    const {body, status} = await request.post('/users/').send({});
    expect(body.message).toBe('Invalid body')
    expect(status).toBe(400)

    const user1 = await User.findOne({ firstName: mockUser.firstName });
    expect(user1).toBeFalsy();
  });

  it('Should login the user if the user exists', async () => {
    await User.create(mockUser)
    const {body, status} = await request.post('/users/login')
      .send({email: mockUser.email, password: mockUser.password})
      expect(body).toEqual(expect.objectContaining(
        {
          _id: expect.any(String),
          message: 'Successfully Logged in user'
        }
      ));
      expect(status).toBe(200);
  })

  it('Should not login in the user if credentials are undefined', async () => {
    await User.create(mockUser);
    const {body, status} = await request.post('/users/login')
      .send({});
      expect(body.message).toBe('Invalid body')
      expect(status).toBe(400)
  })

  it('Should not login in the user if credentials are incorrect', async () => {
    await User.create(mockUser);
    const {body, status} = await request.post('/users/login')
      .send({email: 'Wrong email', password: 'Wrong password'})
      expect(body.message).toBe('Failed to Login user')
      expect(status).toBe(401)
  })
});

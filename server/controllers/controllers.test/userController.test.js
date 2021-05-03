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
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should create and save a new user to the database', async done => {
    const mockUser = { firstName: 'John', lastName: 'Doe', email: 'email@email.com', password: 'password' };

    await request.post('/users/').send(mockUser);

    const user1 = await User.findOne({ firstName: mockUser.firstName });

    expect(user1.firstName).toBe(mockUser.firstName);
    expect(user1.lastName).toBe(mockUser.lastName);
    expect(user1.email).toBe(mockUser.email);
    expect(user1.password).toBe(mockUser.password);
    done();
  });
});

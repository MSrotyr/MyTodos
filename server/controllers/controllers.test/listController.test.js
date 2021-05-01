const express = require('express');
const supertest = require('supertest');
const mongoose = require('mongoose');

const router = require('../../router');
const List = require('../../models/list');
const User = require('../../models/user');

const databaseName = 'test';

describe('Integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  let mockUser;
  let mockList;
  let mockListObj;

  beforeEach(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

    mockUser = await User.create(
      {
        firstName: 'Larry',
        lastName: 'Cobalt',
        email: 'larryCob@hotmail.com',
        password: 'Password123',
        lists: [],
      }
    );

    mockList = await List.create(
      {
        title: "Larry's Todos",
        color: 'pink',
        userId: mockUser._id,
      }
    );

    mockListObj =  {
      title: "Larry's Todos",
      color: 'pink',
      sections: [],
      userId: mockUser.id,
      _id: expect.any(String),
    }

    mockUser.lists.push(mockList._id);
    await mockUser.save();
  });

  afterEach(async () => {
    await List.deleteMany();
    await User.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  })

  it('Should get lists', async () => {
    const {body, status} = await request.get(`/users/${mockUser._id}/lists`)
    expect(body).toContainEqual(expect.objectContaining(mockListObj));
    expect(status).toBe(200);
  });

  it('Should add lists', async () => {
    const {body, status} = await request.post(`/users/${mockUser._id}/lists`)
      .send({title: 'My list'})
    const list = await List.findById(body[0]._id);
    expect(list).toEqual(expect.objectContaining({
      title: 'My list',
      color: 'default',
      _id: expect.any(Object),
      sections: expect.any(Array),
      userId: mockUser._id,
    }));
    expect(status).toBe(201)
  })
});

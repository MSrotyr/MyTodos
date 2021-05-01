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
      //Using strings for id because server returns in JSON
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
      sections: expect.any(Array),
      //Using objects for id because retrieving from database
      _id: expect.any(Object),
      userId: mockUser._id,
    }));
    expect(status).toBe(201)
  })

  it('Should re-order lists', async () => {
    const list1 = await List.create({userId: mockUser._id, title: 'Another List'});
    const list2 = await List.create({userId: mockUser._id, title: 'Another List again'});

    const {body, status} = await request.put(`/users/${mockUser._id}/lists`)
      .send({lists: [list2, list1, mockList]});
    expect(body).toEqual([list2.id, list1.id, mockList.id]);
    expect(status).toBe(200);
  })

});



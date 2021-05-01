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

  beforeAll(async () => {
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
        sections: [],
        userId: mockUser.id,
      }
    );

    mockUser.lists.push(mockList.id);
    await mockUser.save();
  });

  afterEach(async () => {
    await List.deleteMany();
    await User.deleteMany();
    mongoose.connection.close();
  });

  it('Should get lists', async (done) => {
    const {body} = await request.get(`/users/${mockUser.id}/lists`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(body[0].title).toBe(mockList.title);
    expect(body[0].color).toBe(mockList.color);
    expect(body[0].userId).toEqual(String(mockList.userId));
    done();
  });
});

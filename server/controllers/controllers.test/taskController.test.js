const express = require('express');
const router = require('../../router');
const supertest = require('supertest');

const User = require('../../models/user');
const List = require('../../models/list');
const Task = require('../../models/task');

const mongoose = require('mongoose');
const databaseName = 'test';

describe('Adding new tasks', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  const mockUser = { firstName: 'John', lastName: 'Doe', email: 'email@email.com', password: 'password' };
  let userId;
  let listId;

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
    const request = supertest(app);

    userId = await request.post('/users').send(mockUser);
    userId = userId.body._id;
    listId = await request.post(`/users/${userId}/lists`).send({
      title: 'title'
    });
    listId = listId.body[0]._id;
  });

  afterEach(async () => {
    await User.deleteMany();
    await List.deleteMany();
    await Task.deleteMany();
  });

  it('should save a task to the database', async done => {
    const thisList = await List.findById(listId);
    const sectionId = thisList.sections[0]._id;

    const title = 'This is a test task';

    const taskRes = await request
      .post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`)
      .send({ title });

    const task = await Task.findOne({ title });
    expect(task.title).toBe(title);
    done();
  });
});

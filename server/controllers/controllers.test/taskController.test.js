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
  });

  beforeEach(async () => {
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

    const title1 = 'This is a test task';
    const title2 = 'This is another test task';

    await request
      .post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`)
      .send({ title: title1 });
    await request
      .post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`)
      .send({ title: title2 });

    const task1 = await Task.findOne({ title: title1 });
    expect(task1.title).toBe(title1);
    const task2 = await Task.findOne({ title: title2 });
    expect(task2.title).toBe(title2);
    done();
  });

  it('should not save a task to the database if no title is passed in the body', async done => {
    const thisList = await List.findById(listId);
    const sectionId = thisList.sections[0]._id;

    const res = await request.post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`);

    const tasks = await Task.find();
    expect(res.status).toBe(500);
    expect(tasks).toHaveLength(0);
    done();
  });
});

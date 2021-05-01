const express = require('express');
const router = require('../../router');
const supertest = require('supertest');

const User = require('../../models/user');
const List = require('../../models/list');
const Task = require('../../models/task');

const mongoose = require('mongoose');
const databaseName = 'test';

const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);

const mockUser = { firstName: 'John', lastName: 'Doe', email: 'email@email.com', password: 'password' };
let userId;
let listId;
let sectionId;
let taskId;

describe('Adding new tasks', () => {
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
    const curList = await List.findById(listId);
    const sectionId = curList.sections[0]._id;

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
    const curList = await List.findById(listId);
    const sectionId = curList.sections[0]._id;

    const res = await request.post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`);

    const tasks = await Task.find();
    expect(res.status).toBe(500);
    expect(tasks).toHaveLength(0);
    done();
  });
});

describe('Adding existing tasks', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  beforeEach(async () => {
    userId = await request.post('/users').send(mockUser);
    userId = userId.body._id;
    listId = await request.post(`/users/${userId}/lists`).send({ title: 'title' });
    listId = listId.body[0]._id;
    const curList = await List.findById(listId);
    sectionId = curList.sections[0]._id;
    taskId = await request
      .post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`)
      .send({ title: 'title' });
    taskId = taskId.body[0].sections[0].tasks[0]._id;
  });

  afterEach(async () => {
    await User.deleteMany();
    await List.deleteMany();
    await Task.deleteMany();
  });

  it('should add an existing task to a new section', async done => {
    const temp = await request
      .post(`/users/${userId}/lists/${listId}/sections`)
      .send({ title: 'New section' });
    const newSection = temp.body[0].sections[1];

    const res = await request
      .put(`/users/${userId}/lists/${listId}/sections/${newSection._id}/tasks`)
      .send({ taskId });

    const curList = await List.findById(listId);
    const newTaskId = curList.sections[1].tasks[0]._id.toString();
    expect(newTaskId).toBe(taskId);
    done();
  });
});

describe('Updating task', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  beforeEach(async () => {
    userId = await request.post('/users').send(mockUser);
    userId = userId.body._id;
    listId = await request.post(`/users/${userId}/lists`).send({ title: 'title' });
    listId = listId.body[0]._id;
    const curList = await List.findById(listId);
    sectionId = curList.sections[0]._id;
    taskId = await request
      .post(`/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`)
      .send({ title: 'title' });
    taskId = taskId.body[0].sections[0].tasks[0]._id;
  });

  afterEach(async () => {
    await User.deleteMany();
    await List.deleteMany();
    await Task.deleteMany();
  });

  it('should update a task', async done => {
    const title = 'New title';
    const res = await request.put(`/users/${userId}/tasks/${taskId}`).send({ title });

    const task = await Task.findById(taskId);
    expect(task.title).toBe(title);
    done();
  });
});

const express = require('express');
const router = require('../../router');
const supertest = require('supertest');
const Task = require('../../models/task');

const mongoose = require('mongoose');
const databaseName = 'test';

describe('Adding new tasks', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    await Task.deleteMany();
  });
});

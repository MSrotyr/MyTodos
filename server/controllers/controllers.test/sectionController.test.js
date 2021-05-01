const express = require('express')
const supertest = require('supertest')
const router = require('../../router')
const User = require('../../models/user')
const List = require('../../models/list')

const mongoose = require('mongoose')

const dbName = 'test'

describe('Section controller tests', () => {
  const app = express()
  app.use(express.json())
  app.use(router)
  const request = supertest(app)
  let mockUser
  let mockList


  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${dbName}`

    await mongoose.connect(url, { useNewUrlParser: true })

    mockUser = await User.create({
      firstName: 'Foysal',
      lastName: 'Mo',
      email: 'foysal@gmail.com',
      password: 'alauddin1',
      lists: [],
    })
    mockList = await List.create({
      title: 'Add color',
      color: 'orange',
      sections: [],
      userId: mockUser.id,
    })


    mockUser.lists.push(mockList)

    await mockUser.save()
  })

  afterAll(async () => {
    await User.deleteMany()
    await List.deleteMany()
  })

  it('should add a section to the database', async (done) => {
    const title = 'This is a test section'

    await request
      .post(`/users/${mockUser.id}/lists/${mockList.id}/sections`)
      .send({ title })
      .expect(201)

    const list = await List.findOne({ _id: mockList.id })
    expect(list.sections.length).toBe(1)
    expect(list.sections[0].title).toBe(title)
    done()
  })

  it('should delete a section from the database', async (done) => {
    const list = await List.findOne({ _id: mockList.id })

    const section = list.sections[0]

    await request
      .delete(`/users/${mockUser.id}/lists/${mockList.id}/sections/${section.id}`)
      .send()
      .expect(200)

    const updatedList = await List.findOne({ _id: list.id })
    const updatedSection = updatedList.sections.find(s => s.id === section.id && '')

    expect(updatedSection).toBe()
    done()
  })
})

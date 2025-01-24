import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index';
import Todo from '../../models/TodoModel';

describe('Todos Controller', () => {
  // Before each test, clear the Todo collection
  beforeEach(async () => {
    await Todo.deleteMany({});
  });

  // After all tests, close the Mongoose connection
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new todo', async () => {
    const response = await request(app).post('/api/todos').send({ title: 'Test Todo' }).expect(201);

    expect(response.body.title).toBe('Test Todo');
    expect(response.body.completed).toBe(false);
  });

  it('should retrieve all todos', async () => {
    const todo1 = new Todo({ title: 'First Test Todo' });
    const todo2 = new Todo({ title: 'Second Test Todo' });
    await todo1.save();
    await todo2.save();

    const response = await request(app).get('/api/todos').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe(todo1.title);
    expect(response.body[1].title).toBe(todo2.title);
  });

  it('should retrieve a todo by ID', async () => {
    const newTodo = new Todo({ title: 'Test Todo' });
    await newTodo.save();

    const response = await request(app).get(`/api/todos/${newTodo._id}`).expect(200);

    expect(response.body.title).toBe(newTodo.title);
  });

  it('should update an existing todo', async () => {
    const newTodo = new Todo({ title: 'Test Todo' });
    await newTodo.save();

    const response = await request(app)
      .put(`/api/todos/${newTodo._id}`)
      .send({ title: 'Updated Test Todo' })
      .expect(200);

    expect(response.body.todo.title).toBe('Updated Test Todo');
  });

  it('should delete an existing todo', async () => {
    const newTodo = new Todo({ title: 'Test Todo' });
    await newTodo.save();

    await request(app).delete(`/api/todos/${newTodo._id}`).expect(202);

    const deletedTodo = await Todo.findById(newTodo._id);
    expect(deletedTodo).toBeNull();
  });

  it('should return 404 when retrieving a non-existent todo', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(app).get(`/api/todos/${nonExistentId}`).expect(404);
  });

  it('should return 404 when updating a non-existent todo', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(app).put(`/api/todos/${nonExistentId}`).send({ title: 'Non-existent Todo' }).expect(404);
  });

  it('should return 404 when deleting a non-existent todo', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(app).delete(`/api/todos/${nonExistentId}`).expect(404);
  });

  it('should return 400 when creating a todo without a title', async () => {
    await request(app).post('/api/todos').send({}).expect(400);
  });

  it('should return 400 when updating a todo with an empty title', async () => {
    const newTodo = new Todo({ title: 'Test Todo' });
    await newTodo.save();

    await request(app).put(`/api/todos/${newTodo._id}`).send({ title: '' }).expect(400);
  });
});

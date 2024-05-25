const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("../models/tasks");
const taskRoutes = require("../routes/taskRoutes");

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

beforeAll(async () => {
  const url = process.env.MONGODB_URI;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    await collections[key].deleteMany();
  }
  await mongoose.connection.close();
});

describe("Task API", () => {
  it("should create a new task", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "Test Description",
      status: "to_do",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Task");
  });

  it("should fetch all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should update a task", async () => {
    const createResponse = await request(app).post("/api/tasks").send({
      title: "Task to Update",
      description: "Task Description",
      status: "to_do",
    });

    const taskId = createResponse.body._id;

    const updateResponse = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: "done" });

    console.log(`Update Response body: ${JSON.stringify(updateResponse.body)}`);

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.status).toBe("done");
  });

  it("should delete a task", async () => {
    const createResponse = await request(app).post("/api/tasks").send({
      title: "Task to Delete",
      description: "Task Description",
      status: "to_do",
    });

    const taskId = createResponse.body._id;

    const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe("Task deleted");
  });
});

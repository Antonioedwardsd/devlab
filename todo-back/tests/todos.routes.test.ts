import request from "supertest";
import app from "../src/app";
import Task from "../src/models/taskModel";

console.log("BASE_URL in taskRoutes.ts:", process.env.BASE_URL);

let taskId: string;

beforeAll(async () => {
	await Task.destroy({ where: {} });

	const task = await Task.create({
		title: "Test Task",
		description: "Test Description",
		completed: false,
		status: "pending",
	});
	taskId = task.id;
});

describe("Todos API", () => {
	it("should create a new task", async () => {
		const response = await request(app).post("/api/todos").send({
			title: "New Task",
			description: "New Description",
			completed: false,
			status: "pending",
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.title).toBe("New Task");
	});

	it("should return 400 for invalid task data", async () => {
		const response = await request(app).post("/api/todos").send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
	});

	it("should fetch all tasks", async () => {
		const response = await request(app).get("/api/todos");

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it("should fetch a task by ID", async () => {
		const response = await request(app).get(`/api/todos/${taskId}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", taskId);
	});

	it("should update a task", async () => {
		const response = await request(app)
			.put(`/api/todos/${taskId}`)
			.send({ title: "Updated Task", completed: true });

		expect(response.status).toBe(200);
		expect(response.body.title).toBe("Updated Task");
		expect(response.body.completed).toBe(true);
	});

	it("should delete a task", async () => {
		const response = await request(app).delete(`/api/todos/${taskId}`);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Task deleted successfully");
	});
});

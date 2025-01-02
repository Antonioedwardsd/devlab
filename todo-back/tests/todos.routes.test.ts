import request from "supertest";
import app from "../src/app";
import sequelize from "../src/utils/database";
import Task from "../src/models/taskModel";

beforeAll(async () => {
	await sequelize.sync({ force: true });
});

beforeEach(async () => {
	await Task.destroy({ where: {} });
});

afterAll(async () => {
	await sequelize.close();
});

describe("Todos API", () => {
	it("should create a new task", async () => {
		const response = await request(app).post("/api/todos").send({
			title: "New Task",
			description: "Task description",
		});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.completed).toBe(false);
		expect(response.body.status).toBe("pending");
	});

	it("should fetch all tasks", async () => {
		await Task.create({
			title: "Sample Task",
			description: "Task description",
			completed: false,
			status: "pending",
		});

		const response = await request(app).get("/api/todos");

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
		expect(response.body[0].title).toBe("Sample Task");
	});
});

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import apiService from "../services/apiService";

const Container = styled.div`
	background-color: #20232a;
	color: #ffffff;
	font-family: Arial, sans-serif;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 20px;
`;

const Title = styled.h1`
	font-size: 2rem;
	margin-bottom: 20px;
	color: #61dafb;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Input = styled.input`
	background-color: #282c34;
	color: #ffffff;
	border: 1px solid #61dafb;
	border-radius: 5px;
	padding: 10px;
	font-size: 1rem;
	width: 300px;
	margin-right: 10px;
`;

const AddButton = styled.button`
	background-color: #61dafb;
	color: #20232a;
	border: none;
	border-radius: 5px;
	padding: 10px 15px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #21a1f1;
	}
`;

const TaskContainer = styled.div`
	width: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Task = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #282c34;
	padding: 15px;
	border-radius: 5px;
	border: 1px solid #61dafb;
`;

const TaskText = styled.p`
	margin: 0;
	color: #ffffff;
	font-size: 1rem;
`;

const EditButton = styled.button`
	background-color: transparent;
	color: #61dafb;
	border: none;
	cursor: pointer;
	font-size: 1rem;
	margin-right: 10px;

	&:hover {
		text-decoration: underline;
	}
`;

const DeleteButton = styled(EditButton)`
	color: #e74c3c;

	&:hover {
		color: #c0392b;
	}
`;

const TaskList: React.FC = () => {
	const [tasks, setTasks] = useState<any[]>([]);
	const [newTask, setNewTask] = useState("");

	const { fetchTasks, createTask, deleteTask } = apiService();

	const loadTasks = async () => {
		try {
			const data = await fetchTasks();
			setTasks(data);
		} catch (error: any) {
			if (error.response?.status === 401) {
				console.error("Unauthorized: Please log in again.");
			} else {
				console.error("Error loading tasks:", error.message);
			}
		}
	};

	const handleAddTask = async () => {
		if (!newTask.trim()) return;

		try {
			const addedTask = await createTask(newTask);
			setTasks((prev) => [...prev, addedTask]);
			setNewTask("");
		} catch (error: any) {
			if (error.response?.status === 401) {
				console.error("Unauthorized: Cannot add task without logging in.");
			} else {
				console.error("Error adding task:", error.message);
			}
		}
	};

	const handleDeleteTask = async (id: string) => {
		try {
			await deleteTask(id);
			setTasks((prev) => prev.filter((task) => task.id !== id));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<Container>
			<Title>Task List</Title>
			<InputContainer>
				<Input
					placeholder="What do you have planned?"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<AddButton onClick={handleAddTask}>Add task</AddButton>
			</InputContainer>
			<TaskContainer>
				{tasks.map((task) => (
					<Task key={task.id}>
						<TaskText>{task.title}</TaskText>
						<div>
							<EditButton>Edit</EditButton>
							<DeleteButton onClick={() => handleDeleteTask(task.id)}>
								Delete
							</DeleteButton>
						</div>
					</Task>
				))}
			</TaskContainer>
		</Container>
	);
};

export default TaskList;

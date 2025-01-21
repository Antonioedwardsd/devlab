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
	width: 100%;
	max-width: 500px;
`;

const Input = styled.input`
	background-color: #282c34;
	color: #ffffff;
	border: 1px solid #61dafb;
	border-radius: 5px;
	padding: 10px;
	font-size: 1rem;
	flex: 1;
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
	flex-shrink: 0;

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

const TaskText = styled.p<{ completed: boolean }>`
	margin: 0;
	color: ${(props) => (props.completed ? "#61dafb" : "#ffffff")};
	text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
	font-size: 1rem;
`;

const Checkbox = styled.input`
	margin-right: 10px;
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
	const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	const { fetchTasks, createTask, deleteTask, updateTask } = apiService();

	const loadTasks = async () => {
		try {
			const data = await fetchTasks();
			setTasks(data);
		} catch (error: any) {
			console.error("Error loading tasks:", error.message);
		}
	};

	const handleAddTask = async () => {
		if (!newTask.trim()) return;

		try {
			const addedTask = await createTask(newTask);
			setTasks((prev) => [...prev, addedTask]);
			setNewTask("");
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	const handleDeleteTask = async (id: string) => {
		try {
			await deleteTask(id);
			setTasks((prev) => prev.filter((task) => task._id !== id));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const handleEditClick = (task: any) => {
		setEditingTaskId(task._id);
		setEditValue(task.title);
	};

	const handleSaveEdit = async (taskId: string) => {
		try {
			const response = await updateTask(taskId, { title: editValue });
			const updatedTask = response.task;

			setTasks((prev) =>
				prev.map((task) =>
					task._id === updatedTask._id ? { ...task, ...updatedTask } : task
				)
			);
			setEditingTaskId(null);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	const handleCancelEdit = () => {
		setEditingTaskId(null);
		setEditValue("");
	};

	const toggleCompleted = async (id: string, completed: boolean) => {
		try {
			await updateTask(id, { completed: !completed });
			setTasks((prev) =>
				prev.map((task) =>
					task._id === id ? { ...task, completed: !task.completed } : task
				)
			);
		} catch (error) {
			console.error("Error updating task completion:", error);
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
					<Task key={task._id}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Checkbox
								type="checkbox"
								checked={task.completed}
								onChange={() => toggleCompleted(task._id, task.completed)}
							/>
							<TaskText completed={task.completed}>{task.title}</TaskText>
						</div>
						<div>
							{editingTaskId === task._id ? (
								<>
									<Input
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
									/>
									<AddButton onClick={() => handleSaveEdit(task._id)}>
										Save
									</AddButton>
									<DeleteButton onClick={handleCancelEdit}>Cancel</DeleteButton>
								</>
							) : (
								<>
									<EditButton onClick={() => handleEditClick(task)}>
										Edit
									</EditButton>
									<DeleteButton onClick={() => handleDeleteTask(task._id)}>
										Delete
									</DeleteButton>
								</>
							)}
						</div>
					</Task>
				))}
			</TaskContainer>
		</Container>
	);
};

export default TaskList;

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

const TodoContainer = styled.div`
	width: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Todo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #282c34;
	padding: 15px;
	border-radius: 5px;
	border: 1px solid #61dafb;
`;

const TodoText = styled.p<{ $completed: boolean }>`
	margin: 0;
	color: ${(props) => (props.$completed ? "#61dafb" : "#ffffff")};
	text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
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

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<any[]>([]);
	const [newTodo, setNewTodo] = useState("");
	const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	const { fetchTodos, createTodo, deleteTodo, updateTodo } = apiService();

	const loadTodos = async () => {
		try {
			const data = await fetchTodos();
			setTodos(data);
		} catch (error: any) {
			console.error("Error loading todos:", error.message);
		}
	};

	const handleAddTodo = async () => {
		if (!newTodo.trim()) return;

		try {
			const addedTodo = await createTodo(newTodo);
			setTodos((prev) => [...prev, addedTodo]);
			setNewTodo("");
		} catch (error) {
			console.error("Error adding todo:", error);
		}
	};

	const handleDeleteTodo = async (id: string) => {
		try {
			await deleteTodo(id);
			setTodos((prev) => prev.filter((todo) => todo._id !== id));
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const handleEditClick = (todo: any) => {
		setEditingTodoId(todo._id);
		setEditValue(todo.title);
	};

	const handleSaveEdit = async (todoId: string) => {
		try {
			const response = await updateTodo(todoId, { title: editValue });
			const updatedTodo = response.todo;

			setTodos((prev) =>
				prev.map((todo) =>
					todo._id === updatedTodo._id ? { ...todo, ...updatedTodo } : todo
				)
			);
			setEditingTodoId(null);
		} catch (error) {
			console.error("Error updating todo:", error);
		}
	};

	const handleCancelEdit = () => {
		setEditingTodoId(null);
		setEditValue("");
	};

	const toggleCompleted = async (id: string, completed: boolean) => {
		try {
			await updateTodo(id, { completed: !completed });
			setTodos((prev) =>
				prev.map((todo) =>
					todo._id === id ? { ...todo, completed: !todo.completed } : todo
				)
			);
		} catch (error) {
			console.error("Error updating todo completion:", error);
		}
	};

	useEffect(() => {
		loadTodos();
	}, []);

	return (
		<Container>
			<Title>Todo List</Title>
			<InputContainer>
				<Input
					placeholder="What do you have planned?"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
				<AddButton onClick={handleAddTodo}>Add todo</AddButton>
			</InputContainer>
			<TodoContainer>
				{todos.map((todo) => (
					<Todo key={todo._id}>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Checkbox
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleCompleted(todo._id, todo.completed)}
							/>
							<TodoText $completed={todo.completed}>{todo.title}</TodoText>
						</div>
						<div>
							{editingTodoId === todo._id ? (
								<>
									<Input
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
									/>
									<AddButton onClick={() => handleSaveEdit(todo._id)}>
										Save
									</AddButton>
									<DeleteButton onClick={handleCancelEdit}>Cancel</DeleteButton>
								</>
							) : (
								<>
									<EditButton onClick={() => handleEditClick(todo)}>
										Edit
									</EditButton>
									<DeleteButton onClick={() => handleDeleteTodo(todo._id)}>
										Delete
									</DeleteButton>
								</>
							)}
						</div>
					</Todo>
				))}
			</TodoContainer>
		</Container>
	);
};

export default TodoList;

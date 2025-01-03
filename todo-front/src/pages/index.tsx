import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchTasks, createTask, deleteTask } from './api/todos';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

type TaskFormInputs = {
  title: string;
  description?: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0a0b1c;
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const TaskForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 300px;
    background-color: #1e1e2f;
    color: white;
    outline: none;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #ff007c;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #ff4da6;
    }
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e2f;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;

  span {
    font-size: 1rem;
  }

  div {
    display: flex;
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff007c;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #ff4da6;
    text-decoration: underline;
  }
`;

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [tasks, setTasks] = useState<any[]>([]);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<TaskFormInputs>();

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    try {
      console.log('Editing Task ID:', editTaskId);
      console.log('Submitted Data:', data);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todos/${editTaskId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const updatedTask = await response.json();
      console.log('Updated Task Response:', updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editTaskId ? updatedTask : task)),
      );

      setEditTaskId(null);
      reset();
      console.log('Updated Tasks State:', tasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = (task: any) => {
    setEditTaskId(task.id);
    setValue('title', task.title);
    setValue('description', task.description);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    if (isAuthenticated) {
      const loadTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      };
      loadTasks();
    }
  }, [isAuthenticated]);

  return (
    <Container>
      {!isAuthenticated ? (
        <div>
          <h1>Welcome to Task Manager</h1>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      ) : (
        <>
          <Title>Task List</Title>
          <TaskForm onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="Task Title"
            />
            <input
              {...register('description')}
              placeholder="Task Description (optional)"
            />
            <button type="submit">
              {editTaskId ? 'Update Task' : 'Add Task'}
            </button>
          </TaskForm>
          <TaskList>
            {tasks.map((task) => (
              <TaskItem key={task.id}>
                <span>{task.title}</span>
                <div>
                  <ActionButton onClick={() => handleEditTask(task)}>
                    EDIT
                  </ActionButton>
                  <ActionButton onClick={() => handleDeleteTask(task.id)}>
                    DELETE
                  </ActionButton>
                </div>
              </TaskItem>
            ))}
          </TaskList>
        </>
      )}
    </Container>
  );
};

export default Home;

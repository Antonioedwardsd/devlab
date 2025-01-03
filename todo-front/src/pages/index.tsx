import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from './api/todos';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e2f;
  color: white;
  height: 100vh;
  padding: 20px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b2b3c;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #ff007c;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ff4da6;
  }
`;

const TaskForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
    padding: 5px;
  }
`;

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [backendStatus, setBackendStatus] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/todos`);
        if (response.ok) {
          const data = await response.json();
          console.log('Backend connection successful:', data);
          setBackendStatus('Connected');
        } else {
          console.error('Backend connection failed:', response.statusText);
          setBackendStatus('Failed');
        }
      } catch (error) {
        console.error('Error connecting to backend:', error);
        setBackendStatus('Error');
      }
    };

    testBackendConnection();

    if (isAuthenticated) {
      const loadTasks = async () => {
        try {
          const fetchedTasks = await fetchTasks();
          setTasks(fetchedTasks);
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
        }
      };
      loadTasks();
    }
  }, [isAuthenticated, apiBaseUrl]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = await createTask(title, description);
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container>
      {!isAuthenticated ? (
        <div>
          <h1>Welcome to Task Manager</h1>
          <p>
            Backend Status:{' '}
            {backendStatus === null ? 'Checking...' : backendStatus}
          </p>
          <Button onClick={() => loginWithRedirect()}>Login</Button>
        </div>
      ) : (
        <>
          <h1>Task List</h1>
          <p>Welcome, {user?.name}!</p>
          <p>
            Backend Status:{' '}
            {backendStatus === null ? 'Checking...' : backendStatus}
          </p>
          <Button onClick={() => logout()}>Logout</Button>
          <TaskForm onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="What do you have planned?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit">Add Task</Button>
          </TaskForm>
          <TaskList>
            {tasks.map((task) => (
              <TaskItem key={task.id}>
                <span>{task.title}</span>
                <div>
                  <Button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </Button>
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

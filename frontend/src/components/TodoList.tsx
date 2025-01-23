import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../redux/todosSlice';

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

const Input = styled.input<{ $editing?: boolean }>`
  background-color: ${(props) => (props.$editing ? '#20232a' : '#282c34')};
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

const Todo = styled.div<{ $editing: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.$editing ? '#394867' : '#282c34')};
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #61dafb;
`;

const TodoText = styled.p<{ $completed: boolean }>`
  margin: 0;
  color: ${(props) => (props.$completed ? '#61dafb' : '#ffffff')};
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
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

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  const [newTodo, setNewTodo] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(createTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleEditTodo = (id: string) => {
    setEditingTodoId(id);
    const todo = todos.find((todo) => todo._id === id);
    if (todo) setEditValue(todo.title);
  };

  const handleSaveEdit = async () => {
    if (editingTodoId) {
      try {
        await dispatch(updateTodo({ id: editingTodoId, updateData: { title: editValue } })).unwrap();
      } catch (error) {
        console.error('Failed to save edit:', error);
      } finally {
        setEditingTodoId(null);
        setEditValue('');
      }
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const toggleCompleted = (id: string, completed: boolean) => {
    dispatch(updateTodo({ id, updateData: { completed: !completed } }));
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <Title>Todo List</Title>
      <InputContainer>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="What do you have planned?" />
        <AddButton onClick={handleAddTodo}>Add Todo</AddButton>
      </InputContainer>
      <TodoContainer>
        {todos?.length > 0 ? (
          todos.map((todo) => (
            <Todo key={todo._id} $editing={editingTodoId === todo._id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo._id, todo.completed)}
                />
                {editingTodoId === todo._id ? (
                  <Input $editing value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                ) : (
                  <TodoText $completed={todo.completed}>{todo.title}</TodoText>
                )}
              </div>
              <ButtonGroup>
                {editingTodoId === todo._id ? (
                  <>
                    <AddButton onClick={handleSaveEdit}>Save</AddButton>
                    <DeleteButton onClick={() => setEditingTodoId(null)}>Cancel</DeleteButton>
                  </>
                ) : (
                  <>
                    <EditButton onClick={() => handleEditTodo(todo._id)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDeleteTodo(todo._id)}>Delete</DeleteButton>
                  </>
                )}
              </ButtonGroup>
            </Todo>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </TodoContainer>
    </Container>
  );
};

export default TodoList;

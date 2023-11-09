import React from 'react';
import { List, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import  deletes  from '../deleteIcon.png';
import { removeTodo, toggleTodoCompletion } from '../features/todoSlice';

const Todo = ({ todo, filter }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleChange = () => {
    dispatch(toggleTodoCompletion(todo.id));
  };

  return (
    <>
    <List.Item actions={filter === 'Complete' ? [
        <img src={deletes} alt="Delete" onClick={handleDelete}/>
    ] : [
    ]}>
      <Checkbox checked={todo.completed}  className={todo.completed ? 'completed' : ''} onChange={handleChange}>{todo.text}</Checkbox>
    </List.Item>
    </>
  );
};

export default Todo;

import React, { useState } from 'react';
import { Input, List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeAllCompleted } from './features/todoSlice';
import { setFilter, selectFilter } from './features/filterSlice';
import Todo from './components/Todo';
import './App.css';

let counter = 0;

function App() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filter = useSelector(selectFilter);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
    console.log(newFilter)
  };

  const handleAddTodo = () => {
    if (input.length !== 0) {
      dispatch(addTodo({ text: input, id: ++counter }));
      setInput('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') {
      return true;
    } else if (filter == 'Active') {
      return !todo.completed;
    } else if (filter === 'Complete') {
      return todo.completed;
    }
    return true;
  });

  const handleDeleteAllCompleted = () => {
    dispatch(removeAllCompleted());
  };

  return (
    <div className="App">
      <h1 >TODO APP </h1>
      <div className="red">
        {todos.filter((todo) => !todo.completed).length} items yet to be processed
      </div>
      <div >
        <Input className="Input"
          placeholder="what to do?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleAddTodo}
        />
        <button className="btn" type="primary" onClick={handleAddTodo}>
          Add
        </button>
        <div className='filters'>
          <div className='filter-item' onClick={() => handleFilterChange('All')}>All</div>
          <div className='filter-item' onClick={() => handleFilterChange('Active')}>Active</div>
          <div className='filter-item' onClick={() => handleFilterChange('Complete')}>Complete</div>
        </div>
        <List
          dataSource={filteredTodos}
          renderItem={(todo) => <Todo todo={todo} filter={filter} />}
        />
        <div className="deleteButton">
          {filter === 'Complete' && (
            <div onClick={handleDeleteAllCompleted}>
              Delete All
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

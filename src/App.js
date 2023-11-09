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
      <h1 >TODO</h1>
      <div className="red">
        {todos.filter((todo) => !todo.completed).length} items Left
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
          <div onClick={() => handleFilterChange('All')}>All</div>
          <div onClick={() => handleFilterChange('Active')}>Active</div>
          <div onClick={() => handleFilterChange('Complete')}>Complete</div>
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

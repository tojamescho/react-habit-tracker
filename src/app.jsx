import { useState, useCallback } from 'react';
import './app.css';
import Habits from './components/habits';
import Navbar from './components/navbar';

const App = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Reading', count: 0 },
    { id: 2, name: 'Coding', count: 1 },
    { id: 3, name: 'Running', count: 2 },
  ]);

  const handleIncrement = useCallback((habit) => {
    setHabits((habits) =>
      habits.map((item) => {
        if (item.id === habit.id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      })
    );
  }, []);

  const handleDecrement = useCallback((habit) => {
    setHabits((habits) =>
      habits.map((item) => {
        if (item.id === habit.id) {
          const count = item.count - 1;
          return { ...item, count: count > 0 ? count : 0 };
        }
        return item;
      })
    );
  }, []);

  const handleDelete = useCallback((habit) => {
    setHabits((habits) => habits.filter((item) => item.id !== habit.id));
  }, []);

  const handleAdd = useCallback((name) => {
    setHabits((habits) => [
      ...habits,
      {
        id: Date.now(),
        name,
        count: 0,
      },
    ]);
  }, []);

  const handleReset = useCallback(() => {
    setHabits((habits) =>
      habits.map((item) => {
        if (item.count !== 0) {
          return { ...item, count: 0 };
        }
        return item;
      })
    );
  }, []);

  return (
    <div className='App'>
      <Navbar totalCount={habits.filter((item) => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;

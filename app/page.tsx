'use client';

import { useState, useEffect } from 'react';

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  lastCompleted: string | null;
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('habits');
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit,
        completed: false,
        streak: 0,
        lastCompleted: null,
      };
      setHabits([...habits, habit]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toDateString();
        const wasCompletedToday = habit.lastCompleted === today;

        if (!habit.completed && !wasCompletedToday) {
          return {
            ...habit,
            completed: true,
            streak: habit.streak + 1,
            lastCompleted: today,
          };
        } else if (habit.completed) {
          return {
            ...habit,
            completed: false,
          };
        }
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completionRate = habits.length > 0
    ? Math.round((habits.filter(h => h.completed).length / habits.length) * 100)
    : 0;

  return (
    <div className="container">
      <div className="hero">
        <h1>🎯 Discipline Mastery</h1>
        <p>Transform your life through consistent action</p>
      </div>

      <div className="strategies">
        <div className="card">
          <h2><span className="icon">🔥</span> Core Principles</h2>
          <h3>Foundation</h3>
          <ul>
            <li>Start with ONE habit at a time</li>
            <li>Make it ridiculously small (2 minutes)</li>
            <li>Never miss twice in a row</li>
            <li>Track your progress daily</li>
            <li>Focus on consistency over intensity</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">⚡</span> Quick Wins</h2>
          <h3>Immediate Actions</h3>
          <ul>
            <li>Wake up at the same time every day</li>
            <li>Make your bed immediately</li>
            <li>Plan tomorrow tonight</li>
            <li>Remove temptations from environment</li>
            <li>Use the 5-second rule to start</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">🧠</span> Mental Strategies</h2>
          <h3>Mindset Shifts</h3>
          <ul>
            <li>Discipline = Freedom (not restriction)</li>
            <li>Focus on identity, not outcomes</li>
            <li>Embrace discomfort as growth</li>
            <li>Visualize your future self</li>
            <li>Celebrate small wins immediately</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">🛠️</span> Practical Tools</h2>
          <h3>Systems That Work</h3>
          <ul>
            <li>Time blocking your calendar</li>
            <li>Implementation intentions (If-Then)</li>
            <li>Habit stacking on existing routines</li>
            <li>Accountability partner check-ins</li>
            <li>Environment design for success</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">💪</span> Advanced Tactics</h2>
          <h3>Level Up</h3>
          <ul>
            <li>Cold showers for mental toughness</li>
            <li>Intermittent fasting for willpower</li>
            <li>Regular exercise (non-negotiable)</li>
            <li>Digital minimalism and deep work</li>
            <li>Weekly reflection and adjustment</li>
          </ul>
        </div>

        <div className="card">
          <h2><span className="icon">🚫</span> Avoid These Traps</h2>
          <h3>Common Mistakes</h3>
          <ul>
            <li>Trying to change everything at once</li>
            <li>Relying on motivation instead of systems</li>
            <li>Breaking the chain and giving up</li>
            <li>Setting vague goals without measures</li>
            <li>Ignoring the power of rest and recovery</li>
          </ul>
        </div>
      </div>

      <div className="tracker">
        <h2>📊 Your Daily Habit Tracker</h2>

        <div className="habit-input">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            placeholder="Add a new habit (e.g., Read 10 pages)"
          />
          <button className="btn" onClick={addHabit}>
            Add Habit
          </button>
        </div>

        <div className="habits-list">
          {habits.map(habit => (
            <div key={habit.id} className={`habit-item ${habit.completed ? 'completed' : ''}`}>
              <div className="habit-info">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit.id)}
                />
                <span className={`habit-name ${habit.completed ? 'completed' : ''}`}>
                  {habit.name}
                </span>
              </div>
              <div className="streak">
                <span>🔥 {habit.streak} days</span>
              </div>
              <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {habits.length > 0 && (
        <div className="progress">
          <h2>Today's Progress</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionRate}%` }}>
              {completionRate}%
            </div>
          </div>
          <p>{habits.filter(h => h.completed).length} of {habits.length} habits completed</p>
        </div>
      )}
    </div>
  );
}

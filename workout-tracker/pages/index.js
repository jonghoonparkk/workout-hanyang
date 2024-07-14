import { useState } from 'react';
import { motion } from 'framer-motion';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({ name: '', sets: '', reps: '', weight: '' });

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleAddExercise = () => {
    setExercises([...exercises, exercise]);
    setExercise({ name: '', sets: '', reps: '', weight: '' });
  };

  const calculateVolume = () => {
    return exercises.reduce((total, ex) => {
      return total + ex.sets * ex.reps * ex.weight;
    }, 0);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">운동 기록 앱</h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <input
              type="text"
              name="name"
              placeholder="운동 이름"
              value={exercise.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="sets"
              placeholder="세트 수"
              value={exercise.sets}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="reps"
              placeholder="반복 수"
              value={exercise.reps}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="weight"
              placeholder="무게 (kg)"
              value={exercise.weight}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={handleAddExercise}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              운동 추가
            </button>
          </motion.div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">운동 기록</h2>
            {exercises.map((ex, index) => (
              <div key={index} className="border-b py-2">
                <p>{ex.name}</p>
                <p>{ex.sets}세트 x {ex.reps}반복 x {ex.weight}kg</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">총 운동량</h2>
            <p>{calculateVolume()} kg</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

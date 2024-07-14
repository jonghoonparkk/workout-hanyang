"use client";

import { useState } from 'react';
import WorkoutForm from '@/components/WorkoutForm'; // Update the import path
import { BODY_PARTS, type BodyPart, type WorkoutData } from '@/app/constants';
import { motion } from 'framer-motion';

export default function Page() {
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);

  const addWorkout = (workout: Omit<WorkoutData, 'id'>) => {
    setWorkouts([...workouts, { ...workout, id: Date.now() }]);
  };

  const calculateTotalVolume = (bodyPart: BodyPart) => {
    return workouts
      .filter(w => w.bodyPart === bodyPart)
      .reduce((total, w) => total + w.volume, 0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold mb-8">한양대 운동 기록</h1>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">새 운동 추가</h2>
          <WorkoutForm onAddWorkout={addWorkout} />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">운동 기록</h2>
          {workouts.map((workout) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 mb-4 rounded shadow"
            >
              <h3 className="text-xl font-semibold">{workout.exercise}</h3>
              <p>부위: {workout.bodyPart}</p>
              <p>세트: {workout.sets}, 반복: {workout.reps}, 중량: {workout.weight}kg</p>
              <p>총 볼륨: {workout.volume}kg</p>
              <p>장소: {workout.location}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold mb-4">부위별 총 볼륨</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.values(BODY_PARTS).map((part) => (
            <div key={part} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{part}</h3>
              <p>총 볼륨: {calculateTotalVolume(part)}kg</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

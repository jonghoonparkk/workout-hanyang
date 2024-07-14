import React, { useState } from 'react';
import { BODY_PARTS, EXERCISES, HANYANG_LOCATIONS, type BodyPart, type WorkoutData } from '@/app/constants';

interface WorkoutFormProps {
  onAddWorkout: (workout: Omit<WorkoutData, 'id'>) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState<Omit<WorkoutData, 'id'>>({
    bodyPart: null,
    exercise: '',
    sets: 0,
    reps: 0,
    weight: 0,
    location: '',
    volume: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const volume = workout.sets * workout.reps * workout.weight;
    onAddWorkout({ ...workout, volume });
    setWorkout({
      bodyPart: null,
      exercise: '',
      sets: 0,
      reps: 0,
      weight: 0,
      location: '',
      volume: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bodyPart" className="block mb-2">운동 부위</label>
        <select
          id="bodyPart"
          name="bodyPart"
          value={workout.bodyPart || ''}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">선택하세요</option>
          {Object.values(BODY_PARTS).map(part => (
            <option key={part} value={part}>{part}</option>
          ))}
        </select>
      </div>

      {workout.bodyPart && (
        <div>
          <label htmlFor="exercise" className="block mb-2">운동</label>
          <select
            id="exercise"
            name="exercise"
            value={workout.exercise}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">선택하세요</option>
            {EXERCISES[workout.bodyPart as keyof typeof EXERCISES].map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="sets" className="block mb-2">세트</label>
        <input
          type="number"
          id="sets"
          name="sets"
          value={workout.sets}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="1"
        />
      </div>

      <div>
        <label htmlFor="reps" className="block mb-2">반복 횟수</label>
        <input
          type="number"
          id="reps"
          name="reps"
          value={workout.reps}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="1"
        />
      </div>

      <div>
        <label htmlFor="weight" className="block mb-2">중량 (kg)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={workout.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="0"
          step="0.5"
        />
      </div>

      <div>
        <label htmlFor="location" className="block mb-2">운동 장소</label>
        <select
          id="location"
          name="location"
          value={workout.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">선택하세요</option>
          {HANYANG_LOCATIONS.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        운동 추가
      </button>
    </form>
  );
};

export default WorkoutForm;

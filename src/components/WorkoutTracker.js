import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs, addDoc, deleteDoc, serverTimestamp, doc } from 'firebase/firestore';

const categories = ['가슴', '등', '어깨', '하체'];

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const workoutsCollection = collection(firestore, 'workouts');
          
          // 최근 운동 기록 가져오기
          const recentWorkoutQuery = query(
            workoutsCollection,
            where('uid', '==', user.uid),
            orderBy('timestamp', 'desc'),
            limit(1)
          );
          const recentWorkoutSnapshot = await getDocs(recentWorkoutQuery);
          const recentWorkout = recentWorkoutSnapshot.docs[0]?.data();
          if (recentWorkout) {
            setExercise(recentWorkout.exercise || '');
            setWeight(recentWorkout.weight || '');
            setReps(recentWorkout.reps || '');
            setSets(recentWorkout.sets || '');
          }

          // 모든 운동 기록 가져오기
          const allWorkoutsQuery = query(workoutsCollection, where('uid', '==', user.uid));
          const allWorkoutsSnapshot = await getDocs(allWorkoutsQuery);
          setWorkouts(allWorkoutsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addWorkout = async () => {
    const user = auth.currentUser;
    if (user) {
      const volume = parseFloat(weight) * parseFloat(reps) * parseFloat(sets);
      await addDoc(collection(firestore, 'workouts'), {
        uid: user.uid,
        exercise,
        weight: parseFloat(weight),
        reps: parseInt(reps, 10),
        sets: parseInt(sets, 10),
        category: selectedCategory,
        volume,
        timestamp: serverTimestamp(),
      });
      setExercise('');
      setWeight('');
      setReps('');
      setSets('');
    }
  };

  const deleteWorkout = async (id) => {
    await deleteDoc(doc(firestore, 'workouts', id));
  };

  return (
    <div>
      <h2>Workout Tracker</h2>
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
      />
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <button onClick={addWorkout}>Add Workout</button>
      <h3>{selectedCategory} 운동 기록</h3>
      <ul>
        {workouts
          .filter(workout => workout.category === selectedCategory)
          .map(workout => (
            <li key={workout.id}>
              {workout.exercise}: {workout.weight}kg x {workout.reps} reps x {workout.sets} sets (Volume: {workout.volume})
              <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WorkoutTracker;

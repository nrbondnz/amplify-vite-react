
import { IDataState } from "@shared/types/UserSess";



// Create a deep clone of state without mutating the original state
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-expect-error i will use this later
const cloneState = (state: IDataState): IDataState => ({
	...state,
	users: [...state.users],
	exercises: [...state.exercises],
	locations: [...state.locations],
	workouts: [...state.workouts],
	machines: [...state.machines],
	actionStates: [...state.actionStates],
	muscles: [...state.muscles],
	userExercises: [...state.userExercises],
	userWorkoutExercises: [...state.userWorkoutExercises],
	// Add more properties here if any
});

// Ensure state is not undefined
// @ts-expect-error i will use this later
const initialState: IDataState = {
	users: [],
	exercises: [],
	locations: [],
	workouts: [],
	machines: [],
	actionStates: [],
	muscles: [],
	userExercises: [],
	userWorkoutExercises: [],
	loading: false,
	// Add more properties here if any
};

// Updated delete and edit entity functions to handle specific entity payloads

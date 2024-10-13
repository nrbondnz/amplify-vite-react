import {
	IActionState,
	IExercise,
	IMachine,
	IUser,
	IUserWorkoutExercise,
	IWorkout,
	ILocation,
	IMuscle,
	IUserExercise
} from '@shared/types/types';

export interface IDataState {
	machines: IMachine[];
	exercises: IExercise[];
	users: IUser[];
	workouts: IWorkout[];
	userWorkoutExercises: IUserWorkoutExercise[];
	actionStates: IActionState[];
	userExercises: IUserExercise[];
	locations: ILocation[];
	muscles: IMuscle[];
	loading: boolean;
}

// Define initial states
export const initialDataInAppState: IDataState = {
	machines: [],
	exercises: [],
	users: [],
	userWorkoutExercises: [],
	userExercises: [],
	workouts: [],
	muscles: [],
	locations: [],
	actionStates: [],
	loading: false
};

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export interface IUserSess {
	id: string;
	name: string;
	roles: UserRole[];
}

export const defaultUserSess: IUserSess = {
	id: '-1',
	name: 'default',
	roles: [UserRole.USER]
};



//export type TrainingAppAction = ReturnType<typeof
// trainingAppSlice.actions[keyof typeof trainingAppSlice.actions]>;

// Initial state for the AppState
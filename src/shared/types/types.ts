




export const appstate_page = {
	ADMIN_OVERVIEW_PAGE: "ADMIN_OVERVIEW_PAGE",
	LOGIN_PAGE: "LOGIN_PAGE",
	LIST_USERS_PAGE: "LIST_USERS_PAGE",
	LIST_EXERCISES_PAGE: "LIST_EXERCISES_PAGE",
	LIST_MACHINES_PAGE: "LIST_MACHINES_PAGE",
	LIST_WORKOUTS_PAGE: "LIST_WORKOUTS_PAGE",
	LIST_US_WK_EXS_PAGE: "LIST_US_WK_EXS_PAGE",
	LIST_MUSCLES_PAGE: "LIST_MUSCLES_PAGE",
	EDIT_USER_PAGE: "EDIT_USER_PAGE",
	EDIT_EXERCISE_PAGE: "EDIT_EXERCISE_PAGE",
	EDIT_MACHINE_PAGE: "EDIT_MACHINE_PAGE",
	NEW_USER_PAGE: "NEW_USER_PAGE",
	NEW_MACHINE_PAGE: "NEW_MACHINE_PAGE",
	NEW_EXERCISE_PAGE: "NEW_EXERCISE_PAGE",
	EDIT_WORKOUT_PAGE: "EDIT_WORKOUT_PAGE",
	NEW_WORKOUT_PAGE: "NEW_WORKOUT_PAGE",
	NEW_MUSCLE_PAGE: "NEW_MUSCLE_PAGE",
	EDIT_MUSCLE_PAGE: "EDIT_MUSCLE_PAGE",
	DEBUG_DASHBOARD: "DEBUG_DASHBOARD",
	NO_PAGE: "NO_PAGE"
} as const;

export type AppstatePage = typeof appstate_page[keyof typeof appstate_page];

export const appstate_command = {
	DELETE_GENERIC_ENTITY: "DELETE_GENERIC_ENTITY",
	EDIT_GENERIC_ENTITY: "EDIT_GENERIC_ENTITY",
	SET_ACTION_STATES: "SET_ACTION_STATES",
	NEW_USER: "NEW_USER",
	NEW_MACHINE: "NEW_MACHINE",
	NEW_MUSCLE: "NEW_MUSCLE",
	NEW_EXERCISE: "NEW_EXERCISE",
	NEW_WORKOUT: "NEW_WORKOUT",
	ADD_EXERCISE_TO_WORKOUT: "ADD_EXERCISE_TO_WORKOUT",
	SET_DATA: "SET_DATA",
	SET_LOADING: "SET_LOADING",
	EDIT_ACTION_STATE: "EDIT_ACTION_STATE",
	EDIT_USER: "EDIT_USER",
	EDIT_EXERCISE: "EDIT_EXERCISE",
	EDIT_MACHINE: "EDIT_MACHINE",
	EDIT_MUSCLE: "EDIT_MUSCLE",
	EDIT_US_WK_EX: "EDIT_US_WK_EX",
	DELETE_MACHINE: "DELETE_MACHINE",
	DELETE_EXERCISE: "DELETE_EXERCISE",
	DELETE_WORKOUT: "DELETE_WORKOUT",
	DELETE_USER: "DELETE_USER",
	DELETE_US_WK_EX: "DELETE_US_WK_EX",
	DELETE_MUSCLE: "DELETE_MUSCLE",
	NO_COMMAND: "NO_COMMAND"
} as const;

export type AppstateCommand = typeof appstate_command[keyof typeof appstate_command];





export interface IUserWorkoutExercise {
	id: number;
	name: string;
	idUser: number;
	idWorkout: number;
	idMachine: number;
	idExercise: number;
	max: string;
	settings: Record<string, number>;
}

export const defaultUserWorkEx: IUserWorkoutExercise = {
	id: 0,
	name: '',
	idUser: 0,
	idWorkout: 0,
	idMachine: 0,
	idExercise: 0,
	max: 'Max not set',
	settings: {},
};

export interface IExercise {
	id: number;
	name: string;
	idMachine: number;
	description: string;
}

export const defaultExercise: IExercise = {
	id: 0,
	name: 'default exercise',
	idMachine: 0,
	description: 'default exercise description',
};

export interface IMachine {
	id: number;
	name: string;
	numOfMachine: number;
	idLocation: number;
	settings: Record<string, number>;
}

export const defaultMachine: IMachine = {
	id: 0,
	name: 'default Machine',
	numOfMachine: -1,
	idLocation: 0,
	settings: {
		seat: 1,
		hands: 2,
		other: 4
	},
};

export interface ILocation {
	id: number;
	name: string;
}

export interface IWorkout {
	id: number;
	idUser: number;
	name: string;
}


export interface IUser {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	idLocation: number;
	roles: string[];
}

export const defaultUser: IUser = {
	id: -1,
	name: 'default',
	email: 'default@example.com',
	phoneNumber: '0275560006',
	idLocation: 1,
	roles: ['user']
};

export interface IUserExercise {
	id: number;
	idUser: number;
	idExercise: number;
}

export interface IMuscle {
	id: number;
	name: string;
	numOfMuscle: number;
	description: string;
	parent?: number;
}

export interface IActionState {
	id: number;
	LOADED: string;
	appPage?: string;
	appCommand?: string;
	primId?: number;
	primObj?: object;
	primName?: string;
	secId?: number;
	secObj?: object;
	secName?: string;
}


export const defaultActionState: IActionState = {
	id: 1,
	LOADED: "LOADED",
	appPage: appstate_page.ADMIN_OVERVIEW_PAGE,
	appCommand: appstate_command.NO_COMMAND,
	primId: -1,
	primObj: undefined,
	primName: "",
	secId: -1,
	secObj: undefined,
	secName: ""
}


export const defaultMuscle: IMuscle = {
	id: 0,
	name: 'default Muscle',
	numOfMuscle: 0,
	description: 'default muscle description',
	parent: undefined,
};

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


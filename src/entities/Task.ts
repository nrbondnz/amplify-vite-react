// src/entities/task.ts
import { Entity, Fields } from 'remult';

@Entity('tasks')
export class Task {
	@Fields.autoIncrement()
	id!: number;

	@Fields.string()
	title!: string;

	@Fields.boolean()
	completed = false;
}
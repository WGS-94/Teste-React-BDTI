import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITasks } from '../interfaces/Task';

// Estado inicial como valor padrão para pegar as tarefas no localStorage (armazenamento local)
const initialState = {
	tasks: JSON.parse(localStorage.getItem('tasks')!) as ITasks || [] as ITasks,
};

export const taskReducer = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		// Here i write our task reducer
		// Adicionar tarefa
		addTask: (state, action: PayloadAction<string>) => {
            const task:ITask = {
                id: crypto.randomUUID(),
                description: action.payload,
                complete: false
            };
			state.tasks.push(task);
		},
		// Atualizar tarefa
		updateTask: (state, action: PayloadAction<ITask>) => {
				state.tasks = state.tasks.map((task) =>
				task.id === action.payload.id
						? { ...action.payload, complete: false }
						: task
				);
		},
		// Excluir tarefa
		deleteTask: (state, action: PayloadAction<ITask>) => {
			state.tasks = state.tasks.filter(
				(task) => task.id !== action.payload.id
			);
		},
		// Atualizar todas tarefa
		deleteAllTasks: (state) => {
				state.tasks = [];
		},
		// Finalizar tarefa
		toggleComplete: (state, action: PayloadAction<ITask>) => {
			state.tasks = state.tasks.map((task) =>
				task.id === action.payload.id
					? { ...task, complete: !task.complete }
					: task
			);
		},
	},
});

export const { 
	addTask, 
	updateTask, 
	deleteTask, 
	deleteAllTasks, 
	toggleComplete 
} = taskReducer.actions;

export default taskReducer.reducer;
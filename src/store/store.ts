import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../reducer/TabReducer";
import tasksReducer from "../reducer/TaskReducer";

// Criação do store para importar no reducer. 
// Aqui fica toda árvore de estado da minha aplicação, ou seja, minha coleção centrar de dados
export const store = configureStore({
	reducer: {
		// Reducer de tarefas e tabs (status)
		tasksWatch: tasksReducer,
		tabWatch: tabReducer
	},
});
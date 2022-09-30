import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Estado inicial para pegar o tab no localStorage (armazenamento local)
const initialState = {
	tab: localStorage.getItem('tab') as string || "todas",
};

export const tabReducer = createSlice({
	name: "tab",
	initialState,
	reducers: {
				// Here i write our reducer
				// Atualização do tab (status) para as tarefas (todas, em andamento e finalizada)
        updateTab: (state, action: PayloadAction<string>) => {
            state.tab = action.payload;
		}
	},
});

export const { 
	updateTab 
} = tabReducer.actions;

export default tabReducer.reducer;
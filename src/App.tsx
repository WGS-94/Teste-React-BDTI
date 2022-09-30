import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import TaskList from "./components/List";
import { store } from "./store/store";

import './styles/global.css';

function App() {
    // Ouve as mudanças do store e armazena localmenente (localStorage) as tarefas criadas
    store.subscribe(() => {
        localStorage.setItem('tasks', JSON.stringify(store.getState().tasksWatch.tasks));
        localStorage.setItem('tab', store.getState().tabWatch.tab);
    })

    return(
        <>
         <TaskList />
         <ToastContainer autoClose={3000} />
        </>
    );
}

export default App;
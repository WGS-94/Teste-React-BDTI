import { useState, FormEvent } from 'react';
import { PlusCircle } from 'phosphor-react';
import { toast } from 'react-toastify';
import { addTask } from '../../reducer/TaskReducer';
import { useDispatch } from 'react-redux';

import todoLogo from "../../assets/Logo.svg";

import styles from "./FormAdd.module.css";

function FormAdd() {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [statusInput, setStatusInput] = useState(true);

    // Função para adicionar tarefa
    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const taskText = content.trim();

        if (!taskText) {
            toast.error('Digite sua tarefa, campo vazio!');
            setStatusInput(false);
            
            return setContent('');
        }else{
            toast.success('Tarefa criada com sucesso!');
        }

        dispatch(addTask(taskText));
        setContent('');
    }

    if (content && !statusInput) {
        setStatusInput(true);
    }

    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="" />
            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input
                    placeholder='Adicione uma nova tarefa'
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type='submit'
                >
                    Adicionar
                    <PlusCircle size={20} />
                </button>
            </form>
        </header>
        
    );
}

export default FormAdd;
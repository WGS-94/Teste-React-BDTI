import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Trash } from 'phosphor-react';
import { IBtnDelete } from '../../interfaces/Task';
import { deleteTask, deleteAllTasks } from '../../reducer/TaskReducer';

import closeImg from '../../assets/close.svg';

import styles from './BtnDelete.module.css';


function BtnDeleteAll() {
    const [modalIsOpen, setIsOpen] = useState(false);
    
    const dispatch = useDispatch();

     // Funções para abrir e fechar o modal
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    // Função para excluir todas as tarefas
    function removeAllTasks() {
      try {
        dispatch(deleteAllTasks())
        toast.success('Tarefas excluidas com sucesso!');
      } catch (error) {
        toast.error('Erro ao remover todas tarefas!');
      }
    }

    return (
        <>
        <div className={styles.divbtn}>
          <button onClick={openModal}>
            Excluir todas Tarefas
          </button>
        </div>
          
          <Modal
            isOpen={modalIsOpen} 
            onRequestClose={closeModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
            ariaHideApp={false}
          >
            <div className={styles.modalcontent}>
              <button
                  type="button"
                  onClick={closeModal}
                >
                <img src={closeImg} alt="Fechar modal" />
              </button>
              <div>
                <h2>Confirma a exclusão de todas as tarefas?</h2>
                  <div className={styles.Btns}>
                    <button className={styles.noBtn} onClick={closeModal}>Não</button>
                    <button className={styles.yesBtn} onClick={removeAllTasks}>Sim</button>
                  </div>
              </div>
            </div>
          </Modal>
        </>
    )
}

function BtnDelete({task}:IBtnDelete) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Funções para abrir e fechar o modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Função para excluir uma tarefa
  function removeTask() {
    try {
      dispatch(deleteTask(task))
      toast.success('Tarefa excluida com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover esta tarefa!');
    }
  }

  return (
    <>
      <button onClick={openModal}>
        <Trash size={20} weight="bold" color="#e25858" />
      </button>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        ariaHideApp={false}
      >
        <div className={styles.modalcontent}>
          <button
              type="button"
              onClick={closeModal}
            >
            <img src={closeImg} alt="Fechar modal" />
          </button>
          <div>
              <h2>Você realmente deseja excluir a tarefa?</h2>
              <p>{task.description}</p>
              <div className={styles.Btns}>
                <button className={styles.noBtn} onClick={closeModal}>Não</button>
                <button className={styles.yesBtn} onClick={removeTask}>Sim</button>
              </div>
          </div>
        </div>

      </Modal>
    </>
  )
}

export { BtnDelete, BtnDeleteAll }
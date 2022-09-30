import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Pencil } from 'phosphor-react';
import { ITask, IBtnUpdate } from '../../interfaces/Task';
import { updateTask } from '../../reducer/TaskReducer';

import closeImg from '../../assets/close.svg';

import styles from './BtnUpdate.module.css';
import Modal from 'react-modal';

function BtnUpdate({ task }:IBtnUpdate) {

  const dispatch = useDispatch();

  const [newTask, setNew] = useState<ITask>(task);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // Função para abrir o modal
  function openModal() {
    setIsOpen(true);
  }

  // Função para fechar o modal
  function closeModal() {
    setIsOpen(false);
  }
    // Referencia para acompanhar quantas vezes o valor do input renderizado é atualizado.
    const initialRef = React.useRef() as React
    .MutableRefObject<HTMLInputElement>;

    // Função para salvar a nova tarefa atualizada
    function handleTask(e: React.ChangeEvent<HTMLInputElement>) {
      setNew({...newTask, description: e.target.value})
    }

    // Adiona tarefa
    function upTask(){

      const info = task.description.trim();

      if (!info) {
        toast.error('Erro ao remover todas tarefas!');
        return;
      }else {
        toast.success('Tarefa atualizada com sucesso!');
      }

      dispatch(updateTask(newTask));
      closeModal();
    }

  return (
    <>
      <button 
        onClick={openModal}
        className={task.complete === true ? styles.hidde : ''}
      >
        <Pencil size={20} weight="bold" color="#00875F" />
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
            <h2>Atualize sua tarefa</h2>
            <form>
              <input 
                placeholder='Digite sua tarefa' 
                ref={initialRef} 
                defaultValue={newTask.description} 
                onChange={handleTask} 
                onFocus={handleTask}
              />
            </form>
            <div className={styles.Btns}>
              <button className={styles.noBtn} onClick={closeModal}>Cancelar</button>
              <button className={styles.yesBtn} onClick={() => upTask()}>Atualizar</button>
            </div>
        </div>
      </div>

    </Modal>
    </>
  )
}

export default BtnUpdate;
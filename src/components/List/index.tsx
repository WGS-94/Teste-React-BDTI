import { useSelector, useDispatch } from "react-redux";
import { ClipboardText } from "phosphor-react";
import { ITab } from '../../interfaces/Tab';
import { IState } from '../../interfaces/Task';
import FormAdd from '../FormAdd';
import BtnUpdate from '../BtnUpdate';
import { BtnDelete, BtnDeleteAll } from '../BtnDelete';

import { updateTab } from '../../reducer/TabReducer';
import { toggleComplete } from '../../reducer/TaskReducer';

import styles from './List.module.css';

const TaskList = () => {

  // Ação de despacho para controle de como os dados devem ser alterados
  const dispatch = useDispatch();

  // Hook customizado. Sempre que o hook for chamado, os componentes são renderizados novamente 
  const tab = useSelector(
      (state : ITab) => state.tabWatch.tab
  );
  const tasks = useSelector(
      (state : IState) => state.tasksWatch.tasks
  );

  // Variáveis para pegar as quantidades de tarefas (criadas, em andamento e concluídas)
  const createdTask = tasks.length;
  const completedTask = tasks.filter((task) => task.complete).length;
  const inProgressTasks = tasks.filter((task) => !task.complete).length;

  return (
    <>
      {/* Componente Form para adicionar tarefa */}
      <FormAdd />
      <section className={styles.section}>
        <header className={styles.header}>
          <div>
            <button 
              onClick={() => dispatch(updateTab('todas'))}
              className={tab === 'todas' ? styles.active : ''}
            >
              Tarefas criadas
            </button>
            <span>{createdTask}</span>
          </div>
          <div>
            <button 
               onClick={() => dispatch(updateTab('andamento'))}
               className={tab === 'andamento' ? styles.active : ''}
            >
              Em andamento
            </button>
            {tasks.length > 0 ?
              <span>{inProgressTasks}</span>
            : (
              <span>0</span>
              )
            } 
          </div>
          <div>
            <button
              onClick={() => dispatch(updateTab('concluidas'))}
              className={tab === 'concluidas' ? styles.active : ''}
            >
              Concluídas
            </button>
            {tasks.length > 0 ?
              <span>{completedTask} de {createdTask}</span>
            : (
              <span>0</span>
              )
            } 
          </div>
        </header>

        <div className={styles.listTasks}>
        {/* Mostrar tarefas em andamento */}
        {tasks.length > 0 && tab === "andamento"
          ? tasks.map((task) => {
              return (
                task.complete === false && (
                  <div key={task.id} className={styles.taskContent}>
                    <label
                      className={task.complete ? "complete" : "" }
                    >
                      <input 
                        type="checkbox"
                        defaultChecked={task.complete} 
                        onChange={() => dispatch(toggleComplete(task))}
                      />
                      <span>{task.description}</span>
                    </label>
                    <div>
                      <BtnUpdate task={task} />
                      <BtnDelete task={task} />
                    </div>
                  </div>
                )
              );
            })
          : null}
          {/* Mostrar tarefas concluídas */}
          {tasks.length > 0 && tab === "concluidas"
            ? tasks.map((task) => {
                return (
                  task.complete === true && (
                    <div key={task.id} className={styles.taskContent}>
                      <label 
                        className={task.complete ? "complete" : "" }
                      >
                        <input 
                          type="checkbox"
                          defaultChecked={task.complete} 
                          onChange={() => dispatch(toggleComplete(task))}
                        />
                        <span>{task.description}</span>
                      </label>
                      <div>
                        <BtnUpdate task={task} />
                        <BtnDelete task={task} />
                      </div>
                    </div>
                  )
                );
              })
            : null}
            {/* Mostrar todas tarefas criadas */}
            {tasks.length > 0 && tab === "todas"
              ? tasks.map((task) => {
                  return (
                    <div key={task.id} className={styles.taskContent}>
                      <label
                        className={task.complete ? "complete" : "" }
                      >
                        <input 
                          type="checkbox"
                          defaultChecked={task.complete} 
                          onChange={() => dispatch(toggleComplete(task))}
                        />
                        <span>{task.description}</span>
                      </label>
                      <div>
                        <BtnUpdate task={task} />
                        <BtnDelete task={task} />
                      </div>
                    </div>
                  );
                })
              : null}
        </div>

        {tasks.length > 0 && 
          <div>
            <BtnDeleteAll />
          </div>
        }
              
        {tasks.length <= 0 && (
          <div className={styles.empty}>  
            <ClipboardText size={50} weight="bold" />
              <div>
                <p>Sua lista de tarefas está vazia</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
          </div>
        )}
      </section>
    </>
  )
}

export default TaskList;
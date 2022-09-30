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

  const dispatch = useDispatch();
    const tab = useSelector(
        (state : ITab) => state.tabWatch.tab
    );
    const tasks = useSelector(
        (state : IState) => state.tasksWatch.tasks
    );

  const createdTask = tasks.length;
  const completedTask = tasks.filter((task) => task.complete).length;
  const inProgressTasks = tasks.filter((task) => !task.complete).length;

  return (
    <>
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
          {/* for completed items */}
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
            {/* for all items */}
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
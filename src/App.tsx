import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
  addTodolistAC, addTodoListThunk,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodoListThunk,
  SetTodoListThunk,
  TodolistDomainType
} from './state/todolists-reducer'
import {
  changeTaskTitleAC,
  removeTaskAC,
  updateTaskStatusTC, updateTaskTitleTC
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api'


export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  useEffect(() => {
    dispatch(SetTodoListThunk())
  }, [dispatch])


  const removeTask = useCallback(function (id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatch(action);
  }, [dispatch]);

  // const addTask = useCallback(function (title: string, todolistId: string) {
  //   const action = addTaskAC(title, todolistId);
  //   dispatch(action);
  // }, [dispatch]);

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTaskStatusTC(id, todolistId, status))
    // const action = changeTaskStatusAC(id, status, todolistId);
    // dispatch(action);
  }, [dispatch]);

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    dispatch(updateTaskTitleTC(id, todolistId, newTitle))
    // const action = changeTaskTitleAC(id, newTitle, todolistId);
    // dispatch(action);
  }, [dispatch]);

  const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  }, [dispatch]);

  const removeTodolist = useCallback(function (id: string) {
    dispatch(removeTodoListThunk(id))
    // const action = removeTodolistAC(id);
    // dispatch(action);
  }, [dispatch]);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodoListThunk(title))
    // const action = addTodolistAC(title);
    // dispatch(action);
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];

              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={allTodolistTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}

                    // addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;

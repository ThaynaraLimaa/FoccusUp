import { createContext, ReactNode } from "react";
import { Task } from "../types/tasks";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocalStorageKeys } from "../constants/localStorageKeys";
import { v4 as uuid4 } from 'uuid'

type TaskContextType = {
    tasks: Task[],
    totalTasks: number,
    completedTasks: number, 
    addTask: (name: string, duration: string | undefined) => void
    toggleComplete: (id: string) => Task | undefined
    deleteTask: (id: string) => void
}

type TaskProviderProps = {
    children: ReactNode
}

export const TasksContext = createContext({} as TaskContextType); 

export function TasksProvider({children}: TaskProviderProps) {
    const [tasks, setTasks] = useLocalStorage(LocalStorageKeys.Tasks, [] as Task[]); 
    const totalTasks = tasks.length; 
    const completedTasks = tasks.filter(task => task.completed == true).length; 

    const addTask = (name: string, duration: string | undefined) => {
        setTasks(prev => [
            ...prev, 
            createNewTask(name, duration)
        ])
    }

    const toggleComplete = (id: string): Task | undefined => {
        const updatedTasks = tasks.map(task => {
            return task.id === id ? {...task, completed: !task.completed} : task
        }); 

        setTasks(updatedTasks); 
        return updatedTasks.find(task => task.id === id)
    }

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id)); 
    }

    return (
        <TasksContext.Provider value={{tasks, totalTasks, completedTasks, addTask, toggleComplete, deleteTask}}>
            {children}
        </TasksContext.Provider>
    )
}

function createNewTask(name: string, duration: string | undefined): Task {
    const formatedDuration = duration == undefined ? '--' : formartDuration(Number(duration))
    return {
        id: uuid4(),
        name: name,
        duration: formatedDuration,
        CDRValue: 1,
        completed: false
    }
}

function formartDuration(min: number) {
    if (min == 0) {
        return '--'
    }

    if (min < 60) {
        return `${min}m`
    }

    const hours = Math.floor(min / 60);
    const minutes = min % 60

    if (minutes !== 0) {
        return `${hours}h${minutes}m`

    } else {
        return `${hours}h`
    }
}
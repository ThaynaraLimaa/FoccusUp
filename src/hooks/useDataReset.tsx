import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import { DayInformationContext } from "../context/DayInformationContext";
import { RewardsContext } from "../context/RewardsContext";


const dayInformationKeys = ["totalMinutes", "totalCircles", "creditsEarned", "creditsSpent", "rewardsRedeemed"] as const;

// This hook resets saved data on local storage, it is used when a new day start
export function useDataReset() {
const { tasks, deleteTask } = useContext(TasksContext);
    const { changeInformationValue } = useContext(DayInformationContext);
    const { resetAllRewards} = useContext(RewardsContext)

    const deleteCompletedTasks = () => {
        tasks.forEach(task => {
            if (task.completed) {
                deleteTask(task.id)
            }
        })
    }

    const resetDayProgressStats = () => {
        dayInformationKeys.forEach(key => {
            changeInformationValue(key, 0)
        });
    }

    const resetData = () => {
        deleteCompletedTasks(); 
        resetAllRewards(); 
        resetDayProgressStats();
    }

    return resetData
}

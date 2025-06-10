import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import TaskListPanel from "./taskListPanel/TasksListPanel";
import RewardsPanel from "./rewardPanel/RewardsPanel";
import DayProgressPanel from "./dayProgressPanel/DayProgressPanel";

export default function ProductivityPanel() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e: SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex)
    }

    return (
        <>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Productivity Panel">
                <Tab label="Tasks" />
                <Tab label="Rewards" />
                <Tab label="Day Progress" />
            </Tabs>
            <TaskListPanel panelIndex={0} selectedIndex={tabIndex}/>
            <RewardsPanel panelIndex={1} selectedIndex={tabIndex}/>
            <DayProgressPanel panelIndex={2} selectedIndex={tabIndex}/>
        </>
    )
}
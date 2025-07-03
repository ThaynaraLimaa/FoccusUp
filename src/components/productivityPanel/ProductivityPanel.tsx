import { Tab, Tabs } from "@mui/material";
import { CSSProperties, SyntheticEvent, useEffect, useState } from "react";
import TaskListPanel from "./taskListPanel/TasksListPanel";
import RewardsPanel from "./rewardPanel/RewardsPanel";
import DayProgressPanel from "./dayProgressPanel/DayProgressPanel";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageKeys } from "../../constants/localStorageKeys";
import { FoccusUpInformations } from "../../types/foccusUpInformation";
import { useDataReset } from "../../hooks/useDataReset";

export default function ProductivityPanel() {
    const [tabIndex, setTabIndex] = useState(0);
    const [foccusUpInformation, setFoccusUpInformation] = useLocalStorage(LocalStorageKeys.FoccusUpInformations, {} as FoccusUpInformations); 
    const resetData = useDataReset(); 

    const handleTabChange = (e: SyntheticEvent, newIndex: number) => { setTabIndex(newIndex) };

    // Reset information when it's a new day 
    useEffect(() => {
        const now = new Date().toDateString();
        // If it's a new day, reset old info and update the currentDate 
        if (foccusUpInformation.currentDate !== now) {
            alert(`You’ve got a clean slate — time to build, focus, and move forward, ${foccusUpInformation.username}.`)
            resetData(); 
            setFoccusUpInformation(prev => {
                return {
                    ...prev,
                    currentDate: now
                }
            })
        } 
    }, [])


    return (
        <>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Productivity Panel"
                sx={{
                    ...tabsNavigation,
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    }
                }}>
                <Tab label="Tasks"
                    sx={{
                        ...tabsStyle, '&.Mui-selected': tabsSelectedStyle,
                    }}
                />

                <Tab label="Rewards"
                    sx={{
                        ...tabsStyle, '&.Mui-selected': tabsSelectedStyle,
                    }} />

                <Tab label="Day Progress"
                    sx={{
                        ...tabsStyle, '&.Mui-selected': tabsSelectedStyle,
                    }} />
            </Tabs>

            <TaskListPanel panelIndex={0} selectedIndex={tabIndex} />
            <RewardsPanel panelIndex={1} selectedIndex={tabIndex} />
            <DayProgressPanel panelIndex={2} selectedIndex={tabIndex} />
        </>
    )
}

const tabsNavigation: CSSProperties = {
    width: 'var(--components-size)',
    backgroundColor: 'var(--color-primary-7)',
    border: 'var(--componets-border)',
    borderRadius: '16px',
    padding: '0.5rem',
}

const tabsStyle: CSSProperties = {
    color: 'var(--color-primary-1)',
    textTransform: 'capitalize',
}

const tabsSelectedStyle: CSSProperties = {
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-primary-2)',
    fontWeight: 700,
    borderRadius: '16px'
}
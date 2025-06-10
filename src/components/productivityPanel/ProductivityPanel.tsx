import { Tab, Tabs } from "@mui/material";
import { CSSProperties, SyntheticEvent, useState } from "react";
import TaskListPanel from "./taskListPanel/TasksListPanel";
import RewardsPanel from "./rewardPanel/RewardsPanel";
import DayProgressPanel from "./dayProgressPanel/DayProgressPanel";

export default function ProductivityPanel() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (e: SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex)
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
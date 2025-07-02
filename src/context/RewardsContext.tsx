import { createContext, ReactNode } from "react";
import { Reward } from "../types/rewards";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocalStorageKeys } from "../constants/localStorageKeys";
import { v4 as uuid4 } from "uuid";

type RewardsContextType = {
    rewards: Reward[],
    addReward: (name: string) => void
    toogleCollectReward: (id: string) => Reward | undefined
    deleteReaward: (id: string) => void,
    resetAllRewards: () => void
}

export const RewardsContext = createContext({} as RewardsContextType);

export function RewardsProvider({ children }: { children: ReactNode }) {
    const [rewards, setRewards] = useLocalStorage(LocalStorageKeys.Reward, [] as Reward[]);

    const addReward = (name: string) => {
        setRewards(prev => [
            ...prev,
            createNewReward(name)
        ])
    }

    const toogleCollectReward = (id: string) => {
        const updatedRewards = rewards.map(reward => {
            return reward.id === id ? { ...reward, isCollected: !reward.isCollected } : reward
        })

        setRewards(updatedRewards)
        return updatedRewards.find(reward => reward.id === id); // it must return to check later if is it is "spending" or "returning" action
    }

    const deleteReaward = (id: string) => {
        setRewards(prev => {
            return prev.filter(reward => reward.id !== id)
        })
    }

    const resetAllRewards = () => {
        const updatedRewards = rewards.map(reward => {
            return {
                ...reward,
                isCollected: false
            }
        })
        setRewards(updatedRewards)
    }

    return (
        <RewardsContext.Provider value={{ rewards, addReward, toogleCollectReward, deleteReaward, resetAllRewards }}>
            {children}
        </RewardsContext.Provider>
    )
}

function createNewReward(name: string): Reward {
    return {
        id: uuid4(),
        name: name,
        cost: 6,
        isCollected: false
    }
}
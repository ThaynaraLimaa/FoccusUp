import { createContext, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocalStorageKeys } from "../constants/localStorageKeys";
import { DayInformation as DayInformationType } from "../types/dayInformation";

type DayInformationContextType = {
    creditsAvailable: number,
    gainCredits: (amount: number, action: 'gaining' | 'returning') => void,
    spendCredits: (amount: number, action: 'spending' | 'returning') => void,
    increaseTotalMinutes: (min: number) => void,
    increaseTotalCircles: () => void
    changeInformationValue: (key: keyof DayInformationType, newValue: number) => void
} & DayInformationType

type DayInformationProviderPros = {
    children: ReactNode
}

export const DayInformationContext = createContext<DayInformationContextType>({} as DayInformationContextType);

export function DayInformationProvider({ children }: DayInformationProviderPros) {
    const [dayInformation, setDayInformation] = useLocalStorage(LocalStorageKeys.DayInformation, {
        totalMinutes: 0,
        totalCircles: 0,
        creditsEarned: 0,
        creditsSpent: 0,
        rewardsRedeemed: 0
    } as DayInformationType);

    const totalMinutes = dayInformation.totalMinutes;
    const totalCircles = dayInformation.totalCircles;
    const creditsEarned = dayInformation.creditsEarned;
    const creditsSpent = dayInformation.creditsSpent;
    const rewardsRedeemed = dayInformation.rewardsRedeemed;
    const creditsAvailable = creditsEarned - creditsSpent;

    const changeInformationValue = (key: keyof DayInformationType, newValue: number) => {
        setDayInformation(prev => {
            return {
                ...prev,
                [key]: newValue
            }
        })
    }

    const gainCredits = (amount: number, action: 'gaining' | 'returning') => {
        // it's 'returning' if a checked task is being unchecked
        if (action === 'gaining') {
            setDayInformation(prev => {
                return {
                    ...prev,
                    creditsEarned: prev.creditsEarned + amount
                }
            })
        } else {
            setDayInformation(prev => {
                return {
                    ...prev,
                    creditsEarned: prev.creditsEarned - amount
                }
            })
        }

    }

    const spendCredits = (amount: number, action: 'spending' | 'returning') => {
        if (action === 'spending') {
            setDayInformation(prev => {
                return {
                    ...prev,
                    creditsSpent: prev.creditsSpent + amount,
                    rewardsRedeemed: prev.rewardsRedeemed + 1
                }
            })
        } else {
            setDayInformation(prev => {
                return {
                    ...prev,
                    creditsSpent: prev.creditsSpent - amount,
                    rewardsRedeemed: prev.rewardsRedeemed - 1

                }
            })
        }
    }

    const increaseTotalMinutes = (min: number) => {
        setDayInformation(prev => {
            return {
                ...prev,
                totalMinutes: prev.totalMinutes + min
            }
        })
    }

    const increaseTotalCircles = () => {
        setDayInformation(prev => {
            return {
                ...prev,
                totalCircles: prev.totalCircles + 1
            }
        })
    }

    return (
        <DayInformationContext.Provider value={{ totalMinutes, totalCircles, creditsEarned, creditsSpent, rewardsRedeemed, creditsAvailable, gainCredits, spendCredits, increaseTotalMinutes, increaseTotalCircles, changeInformationValue }}>
            {children}
        </DayInformationContext.Provider>
    )
}
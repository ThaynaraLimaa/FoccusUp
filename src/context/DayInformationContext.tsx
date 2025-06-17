import { createContext, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocalStorageKeys } from "../constants/localStorageKeys";
import { DayInformation as DayInformationType } from "../types/dayInformation";

type DayInformationContextType = {
    creditsAvailable: number,
    gainCredits: (amount: number, action: 'gaining' | 'returning') => void
    spendCredits: (amount: number, action: 'spending' | 'returning') => void
} & DayInformationType

type DayInformationProviderPros = {
    children: ReactNode
}

export const DayInformationContext = createContext<DayInformationContextType>({} as DayInformationContextType);

export function DayInformationProvider({ children }: DayInformationProviderPros) {
    const [dayInformation, setDayInformation] = useLocalStorage(LocalStorageKeys.DayInformation, {} as DayInformationType);
    const totalHours = dayInformation.totalHours;
    const totalCircles = dayInformation.totalCircles;
    const creditsEarned = dayInformation.creditsEarned;
    const creditsSpended = dayInformation.creditsSpended;
    const rewardsRedeemed = dayInformation.rewardsRedeemed;
    const creditsAvailable = creditsEarned - creditsSpended;

    const gainCredits = (amount: number, action: 'gaining' | 'returning') => {
        // is 'returning' if a checked task is being unchecked
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
                    creditsSpended: prev.creditsSpended + amount,
                    rewardsRedeemed: prev.rewardsRedeemed + 1
                }
            })
        } else {
            setDayInformation(prev => {
                return {
                    ...prev,
                    creditsSpended: prev.creditsSpended - amount,
                    rewardsRedeemed: prev.rewardsRedeemed - 1

                }
            })
        }
    }


    return (
        <DayInformationContext.Provider value={{ totalHours, totalCircles, creditsEarned, creditsSpended, rewardsRedeemed, creditsAvailable, gainCredits, spendCredits }}>
            {children}
        </DayInformationContext.Provider>
    )
}
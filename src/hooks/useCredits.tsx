import { LocalStorageKeys } from "../constants/localStorageKeys";
import { DayInformation as DayInformationData } from "../types/dayInformation";
import useLocalStorage from "./useLocalStorage";

export default function useCredits() {
    const [dayInformation, setDayInformation] = useLocalStorage(LocalStorageKeys.DayInformation, {} as DayInformationData);
    const creditsAvailable = dayInformation.creditsEarned - dayInformation.creditsSpended;

    const gainCredits = (amount: number) => {
        setDayInformation(prev => {
            return {
                ...prev,
                creditsEarned: prev.creditsEarned + amount
            }
        })
    }

    const spendCredits = (amount: number) => {
        setDayInformation(prev => {
            return {
                ...prev,
                creditsSpended: prev.creditsSpended + amount
            }
        })
    }

    return {
        creditEarned: dayInformation.creditsEarned,
        creditSpended: dayInformation.creditsSpended,
        creditsAvailable,
        gainCredits,
        spendCredits
    }
}

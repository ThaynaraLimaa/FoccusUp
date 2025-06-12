import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../constants/localStorageKeys";

function getSavedValue<T>(key: LocalStorageKeys, initialValue: T) {
    const savedValue = localStorage.getItem(key);
    if (!savedValue) return initialValue

    return JSON.parse(savedValue)
}

export default function useLocalStorage<T>(key: LocalStorageKeys, initialValue?: T) {
    const [storagedValue, setStorageValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storagedValue))
    }, [storagedValue])

    return [storagedValue, setStorageValue]
}
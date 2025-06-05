import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: T) {
    const savedValue = localStorage.getItem(key);
    if (!savedValue) return initialValue

    return JSON.parse(savedValue)
}

export default function useLocalStorage<T>(key: string, initialValue?: T) {
    const [storagedValue, setStorageValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storagedValue))
    }, [storagedValue])

    return [storagedValue, setStorageValue]
}
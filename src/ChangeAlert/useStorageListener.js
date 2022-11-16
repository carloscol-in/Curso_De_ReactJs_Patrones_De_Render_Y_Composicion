import React from 'react'

function useStorageListener(setSinchronizedItem) {
    const [storageChange, setStorageChange] = React.useState(false)

    const toggleStorageChange = () => {
        setSinchronizedItem(false)
        setStorageChange(false)
    }

    React.useEffect(() => {
        window.addEventListener('storage', (change) => {
            if (change.key === 'TODOS_V1') {
                setStorageChange(true)
            }
        })
    }, [])

    return {
        show: storageChange,
        toggleShow: toggleStorageChange,
    }
}

export { useStorageListener }
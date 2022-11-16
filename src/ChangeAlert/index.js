import React from 'react'
import { useStorageListener } from './useStorageListener'

function ChangeAlert({ sinchronize }) {
    const { show, toggleShow } = useStorageListener(sinchronize)

    if (show) {
        return (
            <div>
                <p>Hubo cambios</p>
                <button
                    onClick={toggleShow}
                >
                    Volver a cargar informacion
                </button>
            </div>
        )
    }

    return <p>No hubo cambios</p>
}

export { ChangeAlert }
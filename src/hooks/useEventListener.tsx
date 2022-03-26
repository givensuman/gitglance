import { useEffect, useRef } from 'react'

const useEventListener = (
    e: string,
    callback: (e?: WindowEventMap | HTMLElementEventMap | Event) => void,
    target?: HTMLElement
) => {

    const callbackRef = useRef(callback)

    useEffect(() => { callbackRef.current = callback }, [callback])

    useEffect(() => {
        if (target) {
            try {
                target.addEventListener(e, callback)
            } catch (err) {
                console.error(err)
            }
        } else {
            document.addEventListener(e, callback)
        }

        return () => {
            if (target) target.removeEventListener(e, callback)
            else document.removeEventListener(e, callback)
        }
    })
    
}

export default useEventListener
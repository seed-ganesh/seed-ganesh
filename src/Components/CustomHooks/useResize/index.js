import { useEffect, useState } from 'react'

const useResize = () => {
    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        if (window && window.innerWidth > 768) {
            setIsMobile(false)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = () => {
        if (window && window.innerWidth > 768) {
            setIsMobile(false)
        } else {
            setIsMobile(true)
        }
    }

    return isMobile
}

export default useResize
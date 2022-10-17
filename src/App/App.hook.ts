import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { setIsActive } from '../components/SideBar/sidebar.slice'
import { useEffect, useState } from 'react'


export const useApp = () => {
    const hideSideBar = !useSelector((state: RootState) => state.sidebar.isActive)
    const dispatch = useDispatch()

    const handleClick = () => dispatch(setIsActive())
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((progress) => progress += 15 )
          }, 160);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {

    }, [progress])

    return {
        handleClick,
        hideSideBar,
        progress,
    }
}
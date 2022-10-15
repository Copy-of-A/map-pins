import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { setIsActive } from '../components/SideBar/sidebar.slice'

export const useApp = () => {
    const hideSideBar = !useSelector((state: RootState) => state.sidebar.isActive)
    const dispatch = useDispatch()

    const handleClick = () => dispatch(setIsActive())

    return {
        handleClick,
        hideSideBar,
    }
}
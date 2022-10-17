import { ChangeEvent, FC } from "react";
import style from "./dropDown.module.scss"
import { v4 } from "uuid"

export interface DropDownOption {
    id: number,
    name: string
}

export interface DropDownProps {
    options: Array<DropDownOption>,
    selectId: string,
    handleChange: (e: ChangeEvent) => void,
}

export const DropDown: FC<DropDownProps> = ({ options, selectId, handleChange }) => {
    return (
        <select id={selectId} className={style.dropDown} onChange={handleChange}>
            <option value="" selected disabled hidden>--Please choose an option--</option>
            {options.map((_) => <option key={v4()} className={style.dropDown__option} value={_.id}>{_.name}</option>)}
        </select>
    )
}
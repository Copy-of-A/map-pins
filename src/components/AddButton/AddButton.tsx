import { FC } from "react";
import { cn } from "../../helper";
import styles from "./addButton.module.scss"

interface AddButtonProps {
    title: string,
    handleClick: () => void;
    disabled?: boolean;
    className?: string;
}

export const AddButton: FC<AddButtonProps> = ({ title, handleClick, disabled, className }) => (
    <button
        className={cn(styles.button, typeof className === "string" && className)}
        onClick={handleClick}
        disabled={disabled}
    >
        {title}
    </button>
)
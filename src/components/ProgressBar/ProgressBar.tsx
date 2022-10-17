import { FC } from "react";
import { Line } from 'rc-progress';
import styles from "./progressBar.module.scss"

interface ProgressBarProps {
    progressPercentage: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progressPercentage }) => {
    return (
        <div className={styles.container}>
            <p className={styles.container__percentage}>{progressPercentage}%</p>
            <Line className={styles.container__progressBar} percent={progressPercentage} strokeWidth={4} strokeColor="#D3D3D3" />
        </div>

    )
}
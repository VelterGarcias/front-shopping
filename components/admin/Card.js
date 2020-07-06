import styles from './Card.module.css'

export default function Card(props) {

    return (
        <div className={styles.card}>

            <div className={styles['card-content']}>

                {props.children}

            </div>

            {props.actions && <div className={styles.actions}>

                {props.actions}

            </div>}

        </div>
    )

}
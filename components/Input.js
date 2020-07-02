import styles from './Input.module.css'

export default function Input(props) {
    return (
        <div className={styles.field}>
            <input type={props.type} value={props.value}  required={props.required} name={props.name} onBlur={props.onBlur} onChange={props.onChange} onFocus={props.onFocus}  id={props.name} />
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}
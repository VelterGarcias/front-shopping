import styles from './Textarea.module.css'

export default function Textarea(props) {
    return (
        <div className={styles.field}>
            <textarea name={props.name} id={props.name} value={props.value} onBlur={props.onBlur} onChange={props.onChange} onFocus={props.onFocus}/>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}
import styles from './CardMessage.module.css'
import Button from './Button'
import Input from './Input'

export default function Header(props){

    
    
    return(

        <div id={props.id} className={styles.messageCard}>
            
                
                <label>Nome:</label>
                <h2>{props.name}</h2>
            
            <div className={styles.row}>
                <label>E-mail:</label>
                <a href={`mailto:${props.email}`} >{props.email}</a>
            </div>
            <div className={styles.row}>
                <label>Telefone:</label>
                <a href={`tel:${props.phone}`} >{props.phone}</a>
            </div>
            <hr/>
            
            <label>Mensagem:</label>
            <p className={styles.pMessage}>{props.message}</p>
                
            <hr/>
            <div className={styles.column}>
                <p>Recebida em: </p>
                <p>{props.received}</p>
            </div>
            <div className={styles.column}>
                {props.received == props.updated? null :<> 
                        <p>Respondida em: </p>
                        <p>{props.updated}</p>
                    </> }
            </div>
            <div className={styles.row}>
                <Input className={styles.checkBox} type="checkbox" name={`answered-${props.id}`} label="Marcar como Respondida " checked={props.checked} onChange={props.onChange}/>
            </div>
            <Button id={props.id} action="delete" model="contacts" text="Excluir" />
        </div>
        
       
    )
}
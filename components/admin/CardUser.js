import styles from './CardMessage.module.css'
import Button from './ButtonAdmin'
import Input from '../Input'
import Checkbox from './Checkbox'

export default function Header(props){

    
    
    return(

        <div id={props.values.id} className={styles.messageCard}>
            <div className={styles.field}>
                <label htmlFor={props.selectId}>Nível</label>
                <select name={props.selectId} defaultValue={props.values.level} onChange={props.onChangeSelect}>
                    <option value="0" >Novo</option>
                    <option value="1" >Lojista</option>
                    <option value="2" >Cinema</option>
                    <option value="3" >Administrador</option>
                </select>
            </div>


            
            <div className={styles.row}>
                <label>Nome:</label>
                <h2>{props.values.name}</h2>
            </div>
            
            <div className={styles.row}>
                <label>E-mail:</label>
                <a href={`mailto:${props.values.email}`} >{props.values.email}</a>
            </div>
            <div className={styles.row}>
                <label>Telefone:</label>
                <a href={`tel:${props.values.phone}`} >{props.values.phone}</a>
            </div>
            <hr/>
            
            <div className={styles.column}>
                <p>Registrado em: </p>
                <p>{props.values.created_at}</p>
            </div>
            <div className={styles.column}>
                {props.values.created_at == props.values.updated_at? null :<> 
                        <p>Última alteração em: </p>
                        <p>{props.values.updated_at}</p>
                    </> }
            </div>
            
            <Button id={props.values.id} action="delete" model="users" text="Excluir Usuário" />
        </div>
        
       
    )
}
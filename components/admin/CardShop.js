import styles from './CardMessage.module.css'
import Button from './ButtonAdmin'
import Input from '../Input'
import Checkbox from './Checkbox'

export default function Header(props){

    
    
    return(

        <div id={props.values.id} className={styles.messageCard}>        
             <div className={styles.row}>
                <Checkbox className={styles.checkBox} type="checkbox" name="isOnline" label="Online?" checked={props.values.isOnline} onChange={props.onChange}/>
            </div>

                <label>Nome:</label>
                <h2>{props.values.name}</h2>
            
            <div className={styles.row}>
                <Input type="email" name="admin_mail" label="Email do Admin" defaultValue={props.values.admin_mail} onChange={props.onInputChange} onFocus={props.onInputChange} />
                <Button id={props.values.id} action="save" model="shops" text="Salvar Novo Admin" values={props.valueInput} />
            </div>
            <div className={styles.row}>
                <label>Telefone Fixo:</label>
                <a href={`tel:${props.values.phone}`} >{props.values.phone}</a>
            </div>
            <div className={styles.row}>
                <label>Celular:</label>
                <a href={`tel:${props.values.smartphone}`} >{props.values.smartphone}</a>
            </div>
            <div className={styles.row}>
                <label>WhatsApp:</label>
                <a href={props.values.whatsapp} >{props.values.whatsapp}</a>
            </div>
            <div className={styles.row}>
                <label>Site:</label>
                <a href={props.values.website} >{props.values.website}</a>
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
            
            <Button id={props.values.id} action="delete" model="shops" text="Excluir Loja" />
        </div>
        
       
    )
}
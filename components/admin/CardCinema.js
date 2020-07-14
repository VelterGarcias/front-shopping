import styles from './CardMessage.module.css'
import Button from './ButtonAdmin'
import Input from '../Input'
import Textarea from '../Textarea'
import Checkbox from './Checkbox'

export default function Header(props){

    
    
    return(

        <div id={props.values.id} className={styles.messageCard}>

            <div className={styles.row}>
                <Checkbox className={styles.checkBox} type="checkbox" name="isOnline" label="Filme em Cartaz?" checked={props.values.isOnline} onChange={props.onChangeCheck}/>
            </div>

            {props.children}


            <Input type="text" name="name" label="Nome" defaultValue={props.values.name} onChange={props.onChange} />
            <Input type="text" name="category" label="Categoria" defaultValue={props.values.category} onChange={props.onChange} />
            <Input type="text" name="sub_category" label="Sub-categoria" defaultValue={props.values.sub_category} onChange={props.onChange} />

                <div className={styles.field}>
                    <label htmlFor={"lang-" + props.selectId}>Idioma(s)</label>
                    <select id={"lang-" + props.selectId} name="language" defaultValue={props.values.language} onChange={props.onChange} >
                        <option value="0" >Legendado</option>
                        <option value="1" >Dublado</option>
                        <option value="2" >Dublado/Legendado</option>
                        <option value="3" >Português</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor={"age-" + props.selectId}>Idade</label>
                    <select id={"age-" + props.selectId} name="age" defaultValue={props.values.age} onChange={props.onChange} >
                        <option value="0" >Livre</option>
                        <option value="1" >12</option>
                        <option value="2" >14</option>
                        <option value="3" >16</option>
                        <option value="4" >+18</option>
                    </select>
                </div>
                <Textarea name="description" label="Descrição" defaultValue={props.values.description} onChange={props.onChange} /> 
                
                <Button id={props.values.id} values={props.valuesForm} action="save" model="cinema" text="Salvar" />

            <Button id={props.values.id} action="delete" model="cinema" text="Excluir Filme" />
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
            
            
        </div>
        
       
    )
}
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

        <form id={"cinema-" + props.values.id} data-index={props.index} onSubmit={props.onSubmit} >

            <Input type="text" name="name" label="Nome" defaultValue={props.values.name} onChange={props.onChange} />
            <Input type="text" name="category" label="Categoria" defaultValue={props.values.category} onChange={props.onChange} />
            <Input type="text" name="sub_category" label="Sub-categoria" defaultValue={props.values.sub_category} onChange={props.onChange} />

                <div className={styles.field}>
                    <label htmlFor={"lang-" + props.values.id}>Idioma(s)</label>
                    <select id={"lang-" + props.values.id} name="language" defaultValue={props.values.language} onChange={props.onChange} >
                        <option value="0" >Legendado</option>
                        <option value="1" >Dublado</option>
                        <option value="2" >Dublado/Legendado</option>
                        <option value="3" >Português</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor={"age-" + props.values.id}>Idade</label>
                    <select id={"age-" + props.values.id} name="age" defaultValue={props.values.age} onChange={props.onChange} >
                        <option value="1" >Livre</option>
                        <option value="2" >12</option>
                        <option value="3" >14</option>
                        <option value="4" >16</option>
                        <option value="5" >+18</option>
                    </select>
                </div>
                <Textarea name="description" label="Descrição" defaultValue={props.values.description} onChange={props.onChange} /> 
                
                <Button  text="Salvar" />

            <Button id={props.values.id} action="delete" model="cinema" text="Excluir Filme" />

        </form>
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
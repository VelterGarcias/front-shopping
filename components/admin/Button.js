import styles from './Button.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import serverUrl from '../../utils/env'


export default function Button(props){
    const Router = useRouter()
    const handleClick = async e=>{
        switch(props.action) {
            case "Adicionar":
                Router.push(`/admin/${props.model}/add`)
                console.log(`tela add ${props.model}`)
                break
            case "save":
                await axios.put(`${serverUrl}/admin/users/${props.id}`, props.values).then((res)=>(
                    console.log("salvando Alteraçoes")
                ))
                
                break
            case "passwordChange":
                await axios.put(`${serverUrl}/admin/${props.model}/${props.id}`, props.values).then((res)=>(
                    console.log("salvando senha")
                ))
                
                break
            case `new${props.model}`:
                await axios.put(`${serverUrl}/admin/${props.model}`, props.values)
                console.log(`Cadastrando novos ${props.model}`)
                break
            case "editar":
                Router.push(`/admin/${props.model}/${props.id}`)
                break
            case "delete":
                if (confirm("Tem certeza que deseja excluir?")){
                    await axios.delete(`${serverUrl}/admin/${props.model}/${props.id}`).then(res=>{
                        alert(`Sucesso! ${props.model} com id: ${props.id} Deletado.`  )
                        Router.push(`/admin/${props.model}`)
                    }).catch(err=>{alert("Deu ruim")}) }
                break
            case "Teste":
                console.log(`Teste OK ${props.id}`)
                break
        
        }
    }
    return(
        <button className={styles.button} onClick={ props.click ? props.click :handleClick } >{props.text}</button>
    )
}
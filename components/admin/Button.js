import styles from './Button.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import serverUrl from '../../utils/env'


export default function Button(props){
    const Router = useRouter()
    const handleClick = async e=>{
        console.log(props.action)
        switch(props.action) {
            case "Adicionar":
                Router.push(`/admin/${props.model}/add`)
                console.log(`tela add ${props.model}`)
                break
            case "save":
                if (props.values) {
                    await axios.put(`${serverUrl}/admin/users/${props.id}`, props.values).then((res)=>(
                        alert("Alteraçoes salvas com sucesso!")
                    ))
                } else {
                    console.log("Não tem nada pra salvar", props.values)
                }
                
                break
            case "passwordChange":
                await axios.put(`${serverUrl}/admin/users/${props.id}`, props.values).then((res)=>{
                    alert("Nova senha salva com sucesso")
                    Router.reload()
                })
                
                break
            case `new${props.model}`:
                await axios.put(`${serverUrl}/admin/${props.model}`, props.values)
                console.log(`Cadastrando novos ${props.model}`)
                break
            case "editar":
                Router.push(`/admin/${props.model}/${props.id}`)
                break
            case "delete":
                console.log(props.page)
                console.log(props.model)
                if (confirm("Tem certeza que deseja excluir?")){
                    await axios.delete(`${serverUrl}/admin/${props.model}/${props.id}`).then(res=>{
                        alert(`Sucesso! ${props.model} com id: ${props.id} Deletado.`  )
                        Router.reload()
                    }).catch(err=>{alert("Deu ruim")}) }
                break
            case "Teste":
                if (props.values) {
                    console.log(`Teste OK ${props.id}`)
                    console.log("valores", props.values)
                } else {
                    console.log("Não tem nada pra salvar", props.values)
                }
                
                break
        
        }
    }
    return(
        <button className={styles.button} onClick={ props.click ? props.click :handleClick } >{props.text}</button>
    )
}
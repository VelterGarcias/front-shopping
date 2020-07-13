import styles from './ButtonAdmin.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import serverUrl from '../../utils/env'

    

export default function Button(props){

    const cookies = new Cookies()
    const token = cookies.get('token')
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const Router = useRouter()
    const handleClick = async e=>{
        //console.log(props.action)
        switch(props.action) {
            case "save":
                if (props.values) {
                    if (confirm("Tem certeza que deseja salvar essas alterações?")){
                    //console.log(props.values, "token", config )
                    await axios.put(`${serverUrl}/admin/${props.model}/${props.id}`, props.values, config)
                    .then((res)=>{
                        let message = props.model == "shops" ? "Alterações na sua loja salvas com sucesso!" : "Alterações em seu perfil salvas com sucesso!"
                        alert(message)
                        Router.reload()
                    }).catch(err=>{alert("Deu ruim")}) }
                } else {
                    console.log("Não tem nada pra salvar", props.values)
                }
                
                break
            case "passwordChange":
                await axios.put(`${serverUrl}/admin/users/${props.id}`, props.values, config).then((res)=>{
                    alert("Nova senha salva com sucesso")
                    Router.reload()
                })
                break
            case `newShop`:
                let admin = props.values
                let shop = {
                    "name":"Nome da sua Loja",
                    "category":"Lojas",
                    "adress":"Coloque aqui a localização da sua loja",
                    "admin_mail": admin,
                    "isOnline":false
                    }
                await axios.post(`${serverUrl}/admin/${props.model}`, shop, config)
                alert('Parabéns! Você já pode editar a sua nova loja')
                Router.reload()
                break
            case "editar":
                Router.push(`/admin/${props.model}/${props.id}`)
                break
            case "delete":
                console.log(props.model)
                if (confirm("Tem certeza que deseja excluir?")){
                    await axios.delete(`${serverUrl}/admin/${props.model}/${props.id}`, config).then(res=>{
                        alert(`Sucesso! ${props.model} com id: ${props.id} Deletado.`  )
                        Router.reload()
                    }).catch(err=>{alert("Deu ruim")}) }
                break
            case "deletePhoto":
                console.log(props.values)
                if (confirm("Tem certeza que deseja excluir essa foto?")){
                    await axios.delete(`${serverUrl}/admin/shops/${props.id}/photo/${props.values}`, config).then(res=>{
                        alert(`Sucesso! ${props.model} com id: ${props.id} Deletado.`  )
                        Router.reload()
                    }).catch(err=>{alert("Deu ruim")}) 
                }
                break
        
        }
    }
    return(
        <button className={styles.buttonAdmin} onClick={ props.click ? props.click :handleClick } >{props.text}</button>
    )
}
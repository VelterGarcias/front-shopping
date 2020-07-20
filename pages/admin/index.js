
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import CardMessage from '../../components/admin/CardMessage'
import CardUser from '../../components/admin/CardUser'
import CardShop from '../../components/admin/CardShop'
import CardCinema from '../../components/admin/CardCinema'
import Card from '../../components/admin/Card'
import Checkbox from '../../components/admin/Checkbox'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/admin/ButtonAdmin'
import styles from '../../components/admin/Admin.module.css'
import serverUrl from '../../utils/env'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import {handleAuthSSR} from '../../utils/auth'

const cookies = new Cookies()
const token = cookies.get('token')
const config = {
    headers: {Authorization: `Bearer ${token}`}
}
const contactShopping = {phone: '(54) 98403-8507', email: 'weads.velter@gmail.com'}

export default function Index(props) {
    
    // const configUpload = {
    //     headers: "Content-Type: multipart/form-data"
    // }

    let passValid = false

    //console.log(props)    
    const Router = useRouter()

    const [values, setValues] = useState()
    //console.log("Values", values)
    const date_at = props.data.birth_at ? new Date(props.data.birth_at).toISOString().split('T')[0] : null
    const [userPerfil, setUserPerfil] = useState({ id: props.data.id, name: props.data.name, email: props.data.email, password: props.data.password, birth_at: date_at, level: props.data.level, photo: props.data.photo })
    //console.log("perfil", userPerfil)

    let [nameInput, setNameInput] = useState('')
    let [newPassInput, setNewPassInput] = useState('')
    let [newPassword, setNewPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')

    const [inputLogo, setInputLogo] = useState('')
    const [inputAvatar, setInputAvatar] = useState(`${serverUrl}/admin/users/${props.data.id}/photo`)
    const [enableAvatar, setEnableAvatar] = useState(false)
    //console.log("enable", enableAvatar)
    
    const [menu, setMenu] = useState([])
    const [shop, setShop] = useState()
    //console.log("shop",shop)
    //console.log(menu)

    const [shops, setShops] = useState()
    const [lastVisibleShops, setLastVisibleShops] = useState()
    const [visibleShops, setVisibleShops] = useState()
    const [shopPhotos, setShopPhotos] = useState()

    const [cinema, setCinema] = useState()
    //console.log("cinema",cinema)
    
    const [users, setUsers] = useState()
    //console.log("users", users)
    const [lastVisibleUser, setLastVisibleUser] = useState()
    const [visibleUser, setVisibleUser] = useState()

    const [contacts, setContacts] = useState()
    const [lastVisible, setLastVisible] = useState()
    const [visible, setVisible] = useState()
    const [answered, setAnswered] = useState()

    //função dos cliques no menu lateral
    async function handleClick(action) {
        //console.log(action)
        switch(action) {
            
            case "contacts":
                if(!contacts) {
                    //console.log("contatos...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/contacts`, config)
                        //console.log("RES", res.data)s
                        setContacts(res.data)
                        setVisible(res.data.map((contact, i) => false))
                        setAnswered(res.data.map((contact, i) => contact.answered))
                    }catch(err){ res = [] 
                        //console.log("Deu ruim")
                        setContacts("")
                    }
                } else {
                    //console.log("não fez nada")
                }
                setMenu({...menu,[0]:false, [1]:true, [2]:false, [3]:false})

                
                //setVisible({...visible, "contacts": props.contacts})
                break

            case "users":
                if(!users) {
                    //console.log("users...")
                    let res
                    //console.log(config)
                    try{ res = await axios.get(`${serverUrl}/admin/users`, config)
                        //console.log("RES USERS", res.data)
                        setUsers(res.data)
                        
                        setVisibleUser(res.data.map((contact, i) => false))
                    }catch(err){ res = [] 
                        //console.log("Deu ruim USERS")
                        setUsers("")
                    }
                } else {
                    //console.log("não fez nada")
                }
                setMenu({...menu,[0]:false, [1]:false, [2]:true, [3]:false})

                break

            case "cinema":
                if(!cinema) {
                    let res
                    //console.log(config)
                    try{ res = await axios.get(`${serverUrl}/admin/cinema`, config)
                        //console.log("RES CINEMAS", res.data)
                        setCinema(res.data)
                        
                        setVisibleUser(res.data.map((contact, i) => false))
                    }catch(err){ res = [] 
                        //console.log("Deu ruim USERS")
                        setCinema("")
                    }
                } else {
                    //console.log("não fez nada")
                }
                setMenu({...menu,[0]:false, [1]:true })

                break
                
            case "shops":
                //console.log("Shopssssss...")
                if(!shops) {
                    //console.log("users...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/shops`)
                        //console.log("RES shops", res.data)
                        setShops(res.data)
                        setVisibleShops(res.data.map((contact, i) => false))
                    }catch(err){ res = [] 
                       // console.log("Deu ruim shops")
                        setShops("")
                    }
                } else {
                    console.log("não fez nada")
                }
                setMenu({...menu,[0]:false, [1]:false, [2]:false, [3]:true})
                break

            case "profile":
                //console.log("Perfil...")
                setEnableAvatar(false)
                setMenu({...menu,[0]:true, [1]:false})
                break

            case "profileAdmin":
                    //console.log("Perfil...")
                    setEnableAvatar(false)
                    setMenu({...menu,[0]:true, [1]:false, [2]:false, [3]:false})
                    break

            case "shop":
                if(!shop) {
                    //console.log("users...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/shop/${props.data.email}`, config)
                        //console.log("RES USERS", res.data)
                        setShop(res.data)
                        //console.log("id", res.data.id)
                        setInputLogo(`${serverUrl}/admin/shops/${res.data.id}/photo/`)
                        setShopPhotos([`${serverUrl}/admin/shops/${res.data.id}/photo/1`, `${serverUrl}/admin/shops/${res.data.id}/photo/2`, `${serverUrl}/admin/shops/${res.data.id}/photo/3`, `${serverUrl}/admin/shops/${res.data.id}/photo/4`, `${serverUrl}/admin/shops/${res.data.id}/photo/5`, `${serverUrl}/admin/shops/${res.data.id}/photo/6`])
                        setEnableAvatar(false)
                        //setVisibleUser(res.data.map((contact, i) => false))
                    }catch(err){ res = [] 
                        //console.log("Deu ruim SHOP")
                        setShop("")
                    }
                } else {
                    //console.log("não fez nada")
                }

                setMenu({...menu,[0]:false, [1]:true})
                break

            case "logout":
                //console.log("SAINDO...")
                //setVisible({...visible, [index]:!visible[index]})
                // const cookies = new Cookies()
                //e.preventDefault()
                cookies.remove('token', { path: '/' })
                // cookies.remove('user')
                // cookies.remove('typet')
                // Router.push('/')
                Router.push('/')
                break    
            case "logo":
                setMenu([])
                break     
        }
        
    }
    //função que pega os valores alterados nos inputs
    const handleInputChange = e =>{
        const {name, value} = e.target

        setValues({...values, [name]:value})
        //console.log(name, value)
    }

    const handleAvatar = e => {
        //console.log(URL.createObjectURL(event.target.files[0]))
        setInputAvatar(URL.createObjectURL(event.target.files[0]))
        setEnableAvatar(true)
    }

    const handleLogo = e => {
        //console.log("ta aquiiii")
        //console.log(URL.createObjectURL(event.target.files[0]))
        setInputLogo(URL.createObjectURL(event.target.files[0]))
        setEnableAvatar(true)
    }

    const handleShopPhoto = e => {
        //console.log("ta aqui", e.target.id.split('-')[1])
        let i = e.target.id.split('-')[1]
        setEnableAvatar({[i] : true})
        let newPhoto = [...shopPhotos]   
        newPhoto[i] = URL.createObjectURL(event.target.files[0])
        setShopPhotos(newPhoto)
    }
    //função que mostra/esconde as mensagens 
    function handleClickMessage(index) {
        
        setVisible({...visible, [lastVisible]:false, [index]:!visible[index]})
        setLastVisible(index)    
        //console.log(visible)
    }
    //função que mostra/esconde os usuários 
    function handleClickUser(index) {
        setVisibleUser({...visibleUser, [lastVisibleUser]:false, [index]:!visibleUser[index]})
        setLastVisibleUser(index)    
        //console.log(visible)
    }
    //função que mostra/esconde os filmes 
    function handleClickMovie(index) {
        setInputLogo(`${serverUrl}/admin/cinema/${cinema[index].id}/photo/`)
        setVisibleUser({...visibleUser, [lastVisibleUser]:false, [index]:!visibleUser[index]})
        setLastVisibleUser(index)    
        //console.log(visible)
    }
    //função que mostra/esconde as lojas 
    function handleClickShops(index) {
        
        setVisibleShops({...visibleShops, [lastVisibleShops]:false, [index]:!visibleShops[index]})
        setLastVisibleShops(index)    
        //console.log(visible)
    }
    //função para marcar a mensagem como "lida/respondida" tanto na tela como no DB
    async function handleClickAnswered(index, id) {

        const checkboxValue = {answered: !answered[index]}
        setAnswered({...answered, [index]:!answered[index]})
        await axios.put(`${serverUrl}/admin/contacts/${id}`, checkboxValue, config)        
    }
    //função para alterar o level do usuário tanto na tela como no DB
    async function handleLevelChange(e) {
        const userIndex = e.target.name // para poder saber os outros dados
        const userId = users[userIndex].id // para a rota
        const newLevel = e.target.value //Novo valor
        const oldLevel = users[userIndex].level // para evitar salvar o que já existe
        
        if (newLevel != oldLevel) { 
            const levelChange = {
                "level": newLevel
            }
            await axios.put(`${serverUrl}/admin/users/${userId}`, levelChange, config)
            .then(res=>{
                alert(`Sucesso! Agora o usuário com id: ${userId} tem o level: ${newLevel}.`)
                let newUsers = [...users]   
                newUsers[userIndex] = {...newUsers[userIndex], level : newLevel }
                setUsers(newUsers)
                //Router.push(`/admin/${props.model}`)
            }).catch(err=>{alert("Deu ruim")}) 
        }
    }
    //função para marcar a loja (na aba administrador) como "online/offline" tanto na tela como no DB
     async function handleIsOnline(i, id) {
        const newIsOnline = {
                "isOnline": !shops[i].isOnline
            }
        
        await axios.put(`${serverUrl}/admin/shops/${id}`, newIsOnline, config)
        .then(res=>{
            alert(`Sucesso! Agora a loja ${shops[i].name} está: ${!shops[i].isOnline ? "Online": "Offline" }.`)
            let newShops = [...shops]   
            newShops[i] = {...newShops[i], isOnline : !newShops[i].isOnline }
            setShops(newShops)
        }).catch(err=>{alert("Deu ruim")}) 
    }
    //função para marcar a loja (na aba usuário) como "online/offline" tanto na tela como no DB
    async function handleIsOnlineShop(id) {
        const newIsOnline = {
                "isOnline": !shop.isOnline
            }
        
        await axios.put(`${serverUrl}/admin/shops/${id}`, newIsOnline, config)
        .then(res=>{
            alert(`Sucesso! Agora a loja ${shop.name} está: ${!shop.isOnline ? "Online": "Offline" }.`)
            // let newShops = []   
            // newShops[i] = {...newShops[i], isOnline : !newShops[i].isOnline }
            setShop({...shop, isOnline : !shop.isOnline })
        }).catch(err=>{alert("Deu ruim")}) 
    }
    //função para marcar o Filme como "online/offline" tanto na tela como no DB
    async function handleIsOnlineMovie(i, id) {
        const newIsOnline = {
                "isOnline": !cinema[i].isOnline
            }
        await axios.put(`${serverUrl}/admin/cinema/${id}`, newIsOnline, config)
        .then(res=>{
            alert(`Sucesso! Agora o filme ${cinema[i].name} está: ${!cinema[i].isOnline ? "Online": "Offline" }.`)
            let newMovie = [...cinema]   
            newMovie[i] = {...newMovie[i], isOnline : !newMovie[i].isOnline }
            setCinema(newMovie)
        }).catch(err=>{alert("Deu ruim")}) 
    }
    //função para trocar a foto do usuário, Logotipo e fotos das lojas
    const handleFormData = async e => {
        e.preventDefault()
        const model = e.target.id
        const photo = e.target.name ? e.target.name : null
        const moveId = e.target.getAttribute('data-idcinema')
        // console.log("Movie", cinema[moveId].id)
        // console.log("model", model)
        // console.log("name", e.target.name)
        
        let id = null
        if (model == 'shops') {
            id = shop.id
        } else if (model == 'cinema') {
            id = cinema[moveId].id
        } else {
            id = userPerfil.id
        }
        let  formulario = new FormData(e.target)

            await axios.put(`${serverUrl}/admin/${model}/${id}/uploads${ photo ? `/${photo}` : "" }`, formulario, config)
            .then((res)=>{
                alert("Nova foto salva com sucesso!")

                if (model == 'shops') {
                    //console.log("shops")
                    setShop(res.data)
                    //console.log("Res Shop", res.data)

                } else if (model == 'cinema') {
                    let newMovie = [...cinema]   
                    newMovie[moveId] = res.data
                    setCinema(newMovie)
                    
                    // console.log("Res Foto", res.data)
                    // console.log("Old CINEMA", cinema)
                    // console.log("NEW CINEMA", newMovie)
                } else {
                    //console.log("perfil ou sem model")
                    setUserPerfil(res.data)
                }
                setEnableAvatar(false)

                
            }).catch((err)=>{
                alert("Deu ruim")
            })
    }
    //função para salvar os dados de todos os forms e salvar no state tbm 
    const handleForm = async e => {
        e.preventDefault()
        const model = e.target.id.split('-')[0]
        const id = e.target.id.split('-')[1]
        const theIndex = e.target.getAttribute('data-index')
        const singleShop = e.target.getAttribute('data-shop')
        //console.log("model",model, "id", id, "index", theIndex)  

        let  dataForm = new FormData(e.target)
        //console.log("form", ...dataForm)
        //console.log(dataForm.get('email') == userPerfil.email)

            if (confirm("Tem certeza que deseja salvar essas alterações?")){
            //console.log(props.values, "token", config )
            await axios.put(`${serverUrl}/admin/${model}/${id}`, dataForm, config)
            .then((res)=>{
                let message = props.model == "shops" ? "Alterações na sua loja salvas com sucesso!" : "Alterações em seu perfil salvas com sucesso!"
                alert(message)
                //console.log("res.data", res.data)
                
                switch (model) {
                    case "shops":
                        if(singleShop) {
                            let newShop = [...shops]
                            newShop[theIndex] = res.data
                            setShops(newShop)
                        } else {
                            setShop(res.data)
                        }
                        break;
                    case "cinema":
                        let newMovie = [...cinema]   
                        newMovie[theIndex] = res.data
                        setCinema(newMovie)
                        break;
                    default:
                        if(dataForm.get('email') != userPerfil.email) {
                            const newEmailAdmin = {
                                'admin_mail': dataForm.get('email')
                            }
                            axios.get(`${serverUrl}/admin/shop/${userPerfil.email ? userPerfil.email : props.data.email}`, config)
                            .then((res)=>{
                                
                                axios.put(`${serverUrl}/admin/shops/${res.data.id}`, newEmailAdmin, config)
                                .then((res)=>{
                                    //console.log("RES newEmailAdmin", res.data)
                                    alert("A sua loja já está com o Email de Admin sincronizado!")

                                    //console.log("RES USERS", res.data)
                                    setShop(res.data)
                                    // //console.log("id", res.data.id)
                                    setInputLogo(`${serverUrl}/admin/shops/${res.data.id}/photo/`)
                                    setShopPhotos([`${serverUrl}/admin/shops/${res.data.id}/photo/1`, `${serverUrl}/admin/shops/${res.data.id}/photo/2`, `${serverUrl}/admin/shops/${res.data.id}/photo/3`, `${serverUrl}/admin/shops/${res.data.id}/photo/4`, `${serverUrl}/admin/shops/${res.data.id}/photo/5`, `${serverUrl}/admin/shops/${res.data.id}/photo/6`])
                                    setEnableAvatar(false)
                                }).catch(err=>{
                                    alert("Deu ruim, não conseguimos encontrar a sua loja.")
                                }) 
                                //console.log("loja com email", res.data)
                                
                            }).catch(err=>{
                                alert("Deu ruim")
                                //console.log("Deu ruim SHOP")
                                setShop("")
                            }) 
                        }
                        //console.log("chegou aqui")
                        setUserPerfil(res.data)
                        break;
                }
            }).catch(err=>{alert("Deu ruim ao salvar os dados do formulário")}) }
            
    }
    //funções para permitir que o User desista de trocar a senha
    function isFocus() {
        passValid = true
    }
    function isValid() {
        if(!passValid) {
            nameInput.focus()
        }
    }
    //função que verifica se a senha atual está certa
    const currentPass = async e => {
        e.preventDefault()
        let pass = e.target.value
        const valuesPass = {email: userPerfil.email, password: pass}
        let error = ''
        //console.log(valuesPass.password)
        await axios.post(`${serverUrl}/auths`, valuesPass)
        .then(
            res => passValid = true
        )
        .catch(
            err => {
                passValid = false
                error = err.message
            }
        )
        if(!passValid && valuesPass.password) {
            // console.log('Senha atual incorreta')
            nameInput.focus()
            return
        }
    }
    //função que armazena a nova senha nos estados
    const newPass = e=> {
        setNewPassword(e.target.value)
        //console.log(newPassword)
    }
    //função que verifica se as novas senhas são iguais
    const confirmPass = e=> {
        //setConfirmPassword(e.target.value)
        if(e.target.value != newPassword){
            alert('Senhas não conferem')
            newPassInput.focus()
        } else if (newPassword == '') {
            alert('A nova senha não é válida')
            newPassInput.focus()
        }
        //console.log(newPassword, confirmPassword)
    }

    function updateStates(action, data, model, id, index) {
        // console.log("res", action)
        // console.log("update",data)
        // console.log("action",action)
        // console.log("model",model)
        // console.log("id",id)
        // console.log("index",index)
        switch (action) {
            case 'newMovie':
                let newMovie = [...cinema]
                newMovie[cinema.length] = data
                setCinema(newMovie)
                break;
            case 'delete':
                if (model == "cinema") {
                    let newMovie = [...cinema]
                    newMovie.splice(index, 1)
                    setCinema(newMovie)
                }
                break;
            case 'deletePhoto':
                setShop(data)
                break;
            case 'newShop':
                setShop(data)
                break;
            default:
                break;
        }
        
        
        //setCinema({...cinema, [cinema.length] : data})
    }



    return (

        <>
            { props.page.admin &&

                <LayoutAdmin pageTitle="Valentin Shopping Center" textHeader={menu} userName={props.data.name} clickLogo={() => handleClick("logo")} logout={() => handleClick("logout")} menu1={() => handleClick("profileAdmin")} menu1Label="Perfil" menu2={() => handleClick("contacts")} menu2Label="Contatos" menu3={() => handleClick("users")} menu3Label="Usuários" menu4={() => handleClick("shops")} menu4Label="Lojas" >
                    
                    <>
                        { menu[0] && //Perfil
                            <main className={styles.main} >
                            <Card >

                                <div className={styles.header}>

                                    <h2>Foto do Perfil</h2>
                                    <p>Clique na sua foto para alterá-la</p>

                                </div>
                                <form className={styles.formPost} id="users" onSubmit={handleFormData}>
                                    
                                    <label className={styles.user} htmlFor="logoUser" >
                                        {userPerfil.photo ? 
                                            <img alt="Clique para alterar sua Foto de Perfil" title="Clique para alterar sua Foto de Perfil" src={inputAvatar} className={styles.avatar} />
                                            : enableAvatar ?
                                            <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={inputAvatar} className={styles.avatar} />
                                            :
                                            <img alt="Clique para adicionar sua Foto de Perfil" title="Clique adicionar sua Foto de Perfil " src="/images/photos/default-user.svg" className={styles.avatar} />
                                        }
                                        </label>
                                    <input type="file" id="logoUser" name="file" required onChange={handleAvatar} hidden/>                 
                                    
                                        {enableAvatar && <Button text="Salvar" /> }
                                             
                                </form>

                            </Card>
                            
                            <Card >
                            
                                <div className={styles.header}>

                                    <h2>Dados Pessoais</h2>

                                </div>

                                <form className={styles.form} id={"users-" + userPerfil.id} onSubmit={handleForm} >
                                    <div className={styles.fields}>
                                        {console.log('formAdmin', userPerfil)}
                                        <Input type="text" name="name" defaultValue={userPerfil.name} label="Nome Completo" onChange={handleInputChange} onFocus={handleInputChange}/>
                                        <Input type="email" name="email" label="Email" defaultValue={userPerfil.email} onChange={handleInputChange} onFocus={handleInputChange} />
                                        {/* <Input type="tel" name="phone" label="Telefone" defaultValue={userPerfil.phone} onChange={handleInputChange} onFocus={handleInputChange} /> */}
                                        <Input type="date" name="birth_at" label="Data de Nascimento" defaultValue={userPerfil.birth_at} onChange={handleInputChange} onFocus={handleInputChange} />
                                    </div>
                                    <Button text="Salvar" />
                                </form>
                                
                            </Card>

                            <Card actions={<Button action="passwordChange" id={userPerfil.id} values={values} text="Alterar" />}>

                            <div className={styles.header}>

                                <h2>Senha</h2>

                            </div>

                            <form className={styles.form}>
                                <div className={styles.field}>
                                    <input id="currentPass" type="password"  onBlur={currentPass} onChange={isFocus} ref={inputPass => setNameInput(inputPass)} />
                                    <label htmlFor="currentPass" >Senha Atual</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" onFocus={isValid} onBlur={newPass} ref={newPassInput => setNewPassInput(newPassInput)} />
                                    <label htmlFor="currentPass" >Nova Senha</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" onBlur={confirmPass} name="password" onChange={handleInputChange} />
                                    <label htmlFor="currentPass" >Confirme a Nova Senha</label>
                                </div>
                            </form>

                            </Card>
                            
                            </main>
                        }

                        { menu[1] &&  //Mensagens
                            <main className={styles.main} >
                            {/* função ternária para evitar erro de rodar um .map() em um array vazio e mostrar
                            uma mensagem de erro mais amigável */}
                            {contacts != "" ?
                            <>
                            
                                <section className={styles.messageList}>
                                    <ul className={styles.ulList}>
                                        {contacts.map((contact, i) => (
                                               
                                                <li key={`li${i}`} className={visible[i] ? styles.selected : null}>
                                                    <button  key={`Button${i}`} id={contact.id} onClick={ () => handleClickMessage(i) } > <span className={styles.nameList}>{contact.name}</span> <span className={styles.dateList}>{new Date(contact.created_at).toISOString().split('T')[0]}</span></button>
                                                </li>
                                        ))}
                                    </ul>
                
                                </section>
                                
                                <section className={styles.messages}>
                                
                                    {contacts.map((contact, i) => 
                                    <div key={`Card${i}`} className={styles.mainCard} >
                                        
                                        { visible[i] && <CardMessage id={contact.id} name={contact.name} email={contact.email} phone={contact.phone} message={contact.message} checked={answered[i] ? "checked": ""} onChange={() => handleClickAnswered(i,contact.id)} received={contact.created_at} updated={contact.updated_at}/>}
                                    </div>
                                    ) }
                
                                </section> 
                            </> : <h1>Você não tem mensagens no momento 😥</h1> }
                            </main>
                        }

                        { menu[2] && //Users
                            <main className={styles.main} >
                            {/* função ternária para evitar erro de rodar um .map() em um array vazio e mostrar
                            uma mensagem de erro mais amigável */}
                            {users != "" ?
                            <>
                            
                                <section className={styles.messageList}>
                                    <ul className={styles.ulList}>
                                        {users.map((user, i) => (
                                               
                                                <li key={`liUser${i}`} className={visibleUser[i] ? styles.selected : null}>
                                                    <button  key={`ButtonUser${i}`} id={user.id} onClick={ () => handleClickUser(i) } > <span className={styles.nameList}>{user.name}</span> <span className={styles.dateList}>{user.level == 0 ? "" : user.level }</span></button>
                                                    
                                                </li>
                                        ))}
                                    </ul>
                
                                </section>

                                <section className={styles.messages}>
                                
                                {users.map((user, i) => 
                                <div key={`CardUser${i}`} className={styles.mainCard} >
                                    
                                    { visibleUser[i] && <CardUser  values={user} selectId={i} onChangeSelect={handleLevelChange} />} 
                                    
                                </div>
                                ) }
            
                            </section> 
                                
                                
                            </> : <h1>Ocorreu um erro na conexão com o Servidor 😥</h1> }
                            </main>

                        }

                        { menu[3] && //Lojas
                            <>
                                <main className={styles.main} >
                                {/* função ternária para evitar erro de rodar um .map() em um array vazio e mostrar
                                uma mensagem de erro mais amigável */}
                                {shops != "" ?
                                <>
                                
                                    <section className={styles.messageList}>
                                        <ul className={styles.ulList}>
                                            {shops.map((shop, i) => (
                                                
                                                
                                                    <li key={`liShop${i}`} className={visibleShops[i] ? styles.selected : null}>
                                                        
                                                        <button  key={`ButtonShop${i}`} id={shop.id} onClick={ () => handleClickShops(i) } > <span className={styles.nameList}>{shop.name}</span></button>
                                                        <input type="checkbox" checked={shop.isOnline} disabled/>
                                                    </li>
                                            ))}
                                        </ul>
                    
                                    </section>

                                    <section className={styles.messages}>
                                    
                                    {shops.map((shop, i) => 
                                    <div key={`CardShop${i}`} className={styles.mainCard} >
                                        
                                        { visibleShops[i] && <CardShop id={shop.id}  values={shop} index={i} onSubmit={handleForm} onChange={() =>handleIsOnline(i, shop.id)} onInputChange={handleInputChange}/>} 
                                        
                                    </div>
                                    ) }
                
                                </section> 
                                    
                                    
                                </> : <h1>Ocorreu um erro na conexão com o Servidor 😥</h1> }
                                </main>
                            </>
                        }
                    </>

                </LayoutAdmin> 
            }


            { props.page.users && 
                    
                <LayoutAdmin pageTitle="Valentin Shopping Center" textHeader={menu} clickLogo={() => handleClick("logo")} userName={props.data.name} logout={() => handleClick("logout")} menu1={() => handleClick("profile")} menu1Label="Perfil" menu2={() => handleClick("shop")} menu2Label="Loja" >
                    <>
                        { menu[0] && //Perfil
                            <main className={styles.main} >
                            <Card >

                                <div className={styles.header}>

                                    <h2>Foto do Perfil</h2>
                                    <p>Clique na sua foto para alterá-la</p>

                                </div>
                                <form className={styles.formPost} id="users" onSubmit={handleFormData}>
                                    
                                    <label className={styles.user} htmlFor="logoUser" >
                                        {userPerfil.photo ? 
                                            <img alt="Clique para alterar sua Foto de Perfil" title="Clique para alterar sua Foto de Perfil" src={inputAvatar} className={styles.avatar} />
                                            : enableAvatar ?
                                            <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={inputAvatar} className={styles.avatar} />
                                            :
                                            <img alt="Clique para adicionar sua Foto de Perfil" title="Clique adicionar sua Foto de Perfil " src="/images/photos/default-user.svg" className={styles.avatar} />
                                        }
                                        </label>
                                    <input type="file" id="logoUser" name="file" required onChange={handleAvatar} hidden/>                 
                                    
                                        {enableAvatar && <Button text="Salvar" /> }
                                             
                                </form>

                            </Card>
                            
                            <Card >
                            
                                <div className={styles.header}>

                                    <h2>Dados Pessoais</h2>

                                </div>

                                <form className={styles.form} id={"users-" + userPerfil.id} onSubmit={handleForm} >
                                    <div className={styles.fields}>
                                        <Input type="text" name="name" defaultValue={userPerfil.name} label="Nome Completo" onChange={handleInputChange} onFocus={handleInputChange}/>
                                        <Input type="email" name="email" label="Email" defaultValue={userPerfil.email} onChange={handleInputChange} onFocus={handleInputChange} />
                                        {/* <Input type="tel" name="phone" label="Telefone" defaultValue={userPerfil.phone} onChange={handleInputChange} onFocus={handleInputChange} /> */}
                                        <Input type="date" name="birth_at" label="Data de Nascimento" defaultValue={userPerfil.birth_at} onChange={handleInputChange} onFocus={handleInputChange} />
                                    </div>
                                    <Button text="Salvar" />
                                </form>
                                
                            </Card>

                            <Card actions={<Button action="passwordChange" id={userPerfil.id} values={values} text="Alterar" />}>

                            <div className={styles.header}>

                                <h2>Senha</h2>

                            </div>

                            <form className={styles.form}>
                                <div className={styles.field}>
                                    <input id="currentPass" type="password"  onBlur={currentPass} onChange={isFocus} ref={inputPass => setNameInput(inputPass)} />
                                    <label htmlFor="currentPass" >Senha Atual</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" onFocus={isValid} onBlur={newPass} ref={newPassInput => setNewPassInput(newPassInput)} />
                                    <label htmlFor="currentPass" >Nova Senha</label>
                                </div>
                                <div className={styles.field}>
                                    <input type="password" onBlur={confirmPass} name="password" onChange={handleInputChange} />
                                    <label htmlFor="currentPass" >Confirme a Nova Senha</label>
                                </div>
                            </form>

                            </Card>
                            </main>
                        }

                        { menu[1] && //Loja
                            <main className={styles.main} >
                            {props.data.level == 1 ? shop != "" ?
                                <> {/* Já criou/tem uma loja */}

                                    <Card >

                                        <div className={styles.header}>

                                            <h2>Logotipo da Loja</h2>

                                        </div>
                                        
                                        
                                        <form className={styles.formPost} id="shops" onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="logoUser" >
                                                {shop.logo ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={inputLogo} className={styles.avatar} />
                                                    : enableAvatar ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={inputLogo} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/photos/default-logo.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="logoUser" name="file" required onChange={handleLogo} hidden/>                                     
                                                    
                                            {enableAvatar && <Button text="Salvar" />}
                                        </form>

                                    </Card>

                                    <Card >

                                        <div className={styles.header}>

                                            <h2>Dados da Loja</h2>

                                        </div>

                                        <form className={styles.form} id={"shops-" + shop.id} onSubmit={handleForm}>
                                            <div className={styles.fields}>
                                                <Checkbox className={styles.checkBox} type="checkbox" name="isOnline" label="Online?" checked={shop.isOnline} onChange={() =>handleIsOnlineShop(shop.id)}/>
                                                <Input type="text" name="name" defaultValue={shop.name} label="Nome da Loja" onChange={handleInputChange} onFocus={handleInputChange}/>
                                                {/* Category deveria ser um select */}
                                                <Input type="text" name="category" label="Categoria" defaultValue={shop.category} onChange={handleInputChange}  />
                                                <Textarea name="description" label="Descrição" defaultValue={shop.description} onChange={handleInputChange}  /> 
                                                <Input type="tel" name="phone" label="Telefone Fixo" defaultValue={shop.phone} onChange={handleInputChange}  />
                                                <Input type="tel" name="smartphone" label="Celular" defaultValue={shop.smartphone} onChange={handleInputChange}  />
                                                <Input type="text" name="whatsapp" label="WhatsApp" defaultValue={shop.whatsapp} onChange={handleInputChange}  />
                                                <Input type="text" name="adress" label="Localização" defaultValue={shop.adress} onChange={handleInputChange}  />
                                                <Input type="text" name="website" label="Website" defaultValue={shop.website} onChange={handleInputChange}  />
                                                <Input type="text" name="facebook" label="Facebook" defaultValue={shop.facebook} onChange={handleInputChange}  />
                                                <Input type="text" name="instagram" label="Instagram" defaultValue={shop.instagram} onChange={handleInputChange}  />
                                            </div>
                                            <Button text="Salvar" />
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={1} model="shops" updateStateParent={updateStates} />} >

                                        <div className={styles.header}>

                                            <h2>Foto 1</h2>

                                        </div>

                                        <form className={styles.formPost} id="shops" name="1"  onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="photo-0" >
                                                {shop.photo1 ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[0]} className={styles.avatar} />
                                                    : enableAvatar[0] ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[0]} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/default_image.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="photo-0" name="file" required onChange={handleShopPhoto} hidden/>                                     
                                                    
                                            {enableAvatar[0] && <Button text="Salvar" />}
                                        </form>

                                    </Card>
                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={2} model="shops"  updateStateParent={updateStates} />} >

                                        <div className={styles.header}>

                                            <h2>Foto 2</h2>

                                        </div>
                                        <form className={styles.formPost} id="shops" name="2"  onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="photo-1" >
                                                {shop.photo2 ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[1]} className={styles.avatar} />
                                                    : enableAvatar[1] ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[1]} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/default_image.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="photo-1" name="file" required onChange={handleShopPhoto} hidden/>                                     
                                                    
                                            {enableAvatar[1] && <Button text="Salvar" />}
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={3} model="shops"  updateStateParent={updateStates} />} >

                                        <div className={styles.header}>

                                            <h2>Foto 3</h2>

                                        </div>
                                        <form className={styles.formPost} id="shops" name="3"  onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="photo-2" >
                                                {shop.photo3 ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[2]} className={styles.avatar} />
                                                    : enableAvatar[2] ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[2]} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/default_image.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="photo-2" name="file" required onChange={handleShopPhoto} hidden/>                                     
                                                    
                                            {enableAvatar[2] && <Button text="Salvar" />}
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={4} model="shops"  updateStateParent={updateStates} />} >

                                        <div className={styles.header}>

                                            <h2>Foto 4</h2>

                                        </div>
                                        <form className={styles.formPost} id="shops" name="4"  onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="photo-3" >
                                                {shop.photo4 ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[3]} className={styles.avatar} />
                                                    : enableAvatar[3] ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[3]} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/default_image.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="photo-3" name="file" required onChange={handleShopPhoto} hidden/>                                     
                                                    
                                            {enableAvatar[3] && <Button text="Salvar" />}
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={5} model="shops"  updateStateParent={updateStates} />} >

                                        <div className={styles.header}>

                                            <h2>Foto 5</h2>

                                        </div>
                                        <form className={styles.formPost} id="shops" name="5"  onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="photo-4" >
                                                {shop.photo5 ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[4]} className={styles.avatar} />
                                                    : enableAvatar[4] ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[4]} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/default_image.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="photo-4" name="file" required onChange={handleShopPhoto} hidden/>                                     
                                                    
                                            {enableAvatar[4] && <Button text="Salvar" />}
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={6} model="shops"  updateStateParent={updateStates} />} >

                                        <div className={styles.header}>

                                            <h2>Foto 6</h2>

                                        </div>
                                        <form className={styles.formPost} id="shops" name="6"  onSubmit={handleFormData}>

                                            <label className={styles.user} htmlFor="photo-5" >
                                                {shop.photo6 ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[5]} className={styles.avatar} />
                                                    : enableAvatar[5] ?
                                                    <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={shopPhotos[5]} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar a Logo da sua Loja" title="Clique adicionar a Logo da sua Loja" src="/images/default_image.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="photo-5" name="file" required onChange={handleShopPhoto} hidden/>                                     
                                                    
                                            {enableAvatar[5] && <Button text="Salvar" />}
                                        </form>

                                    </Card>

                                </>
                                : 
                                
                                <div className={styles.alert} >  {/* Já tem permissão mas ainda não criou a loja */}
                                    <img alt="Parabéns! Você está quase lá" src="/images/photos/progress.svg"/>
                                    <h2>Parabéns! Você já pode cadastrar a sua loja!</h2>
                                    <Button id={shop.id} text="Começar agora mesmo" action="newShop" values={props.data.email} model="shops"  updateStateParent={updateStates} />
                                </div> :
                                
                                <div className={styles.alert} > {/* Ainda não tem permissão pra criar a loja */}
                                    <img alt="Você ainda não tem permissões suficientes." src="/images/photos/denied.svg"/>
                                    <h2> Você ainda não tem permissão para cadastrar uma loja 😥</h2>
                                    <p>Entre em contato com a administração para receber essa permissão.</p>
                                    <p><span>Email: </span><a href={`mailto:${contactShopping.email}`}>{contactShopping.email}</a></p>
                                    <p><span>Telefone: </span><a href={`tel:${contactShopping.phone}`}>{contactShopping.phone}</a></p>
                                </div>
                                }
                            </main>
                        }
                
                    </>
                </LayoutAdmin>
                    
            }

            { props.page.cinema && 
                    
                <LayoutAdmin pageTitle="Valentin Shopping Center" textHeader={menu} clickLogo={() => handleClick("logo")} userName={props.data.name} logout={() => handleClick("logout")} menu1={() => handleClick("profile")} menu1Label="Perfil" menu2={() => handleClick("cinema")} menu2Label="Cinema" >
                    <>
                        { menu[0] && //Perfil
                            <main className={styles.main} >
                            <Card >

                                <div className={styles.header}>

                                    <h2>Foto do Perfil</h2>
                                    <p>Clique na sua foto para alterá-la</p>

                                </div>
                                <form className={styles.formPost} id="users" onSubmit={handleFormData}>
                                    
                                    <label className={styles.user} htmlFor="logoUser" >
                                        {userPerfil.photo ? 
                                            <img alt="Clique para alterar sua Foto de Perfil" title="Clique para alterar sua Foto de Perfil" src={inputAvatar} className={styles.avatar} />
                                            : enableAvatar ?
                                            <img alt="Clique para alterar a Logo da sua Loja" title="Clique para alterar a Logo da sua Loja" src={inputAvatar} className={styles.avatar} />
                                            :
                                            <img alt="Clique para adicionar sua Foto de Perfil" title="Clique adicionar sua Foto de Perfil " src="/images/photos/default-user.svg" className={styles.avatar} />
                                        }
                                        </label>
                                    <input type="file" id="logoUser" name="file" required onChange={handleAvatar} hidden/>                 
                                    
                                        {enableAvatar && <Button text="Salvar" /> }
                                            
                                </form>

                            </Card>

                            
                            <Card >
                            
                                <div className={styles.header}>

                                    <h2>Dados Pessoais</h2>

                                </div>

                                <form className={styles.form} id={"users-" + userPerfil.id} onSubmit={handleForm} >
                                    <div className={styles.fields}>
                                        <Input type="text" name="name" defaultValue={userPerfil.name} label="Nome Completo" onChange={handleInputChange} />
                                        <Input type="email" name="email" label="Email" defaultValue={userPerfil.email} onChange={handleInputChange}  />
                                        {/* <Input type="tel" name="phone" label="Telefone" defaultValue={userPerfil.phone} onChange={handleInputChange}  /> */}
                                        <Input type="date" name="birth_at" label="Data de Nascimento" defaultValue={userPerfil.birth_at} onChange={handleInputChange}  />
                                    </div>
                                    <Button text="Salvar" />
                                </form>
                                
                            </Card>

                            <Card actions={<Button action="passwordChange" id={userPerfil.id} values={values} text="Alterar" />}>

                                <div className={styles.header}>

                                    <h2>Senha</h2>

                                </div>

                                <form className={styles.form}>
                                    <div className={styles.field}>
                                        <input id="currentPass" type="password"  onBlur={currentPass} onChange={isFocus} ref={inputPass => setNameInput(inputPass)} />
                                        <label htmlFor="currentPass" >Senha Atual</label>
                                    </div>
                                    <div className={styles.field}>
                                        <input type="password" onFocus={isValid} onBlur={newPass} ref={newPassInput => setNewPassInput(newPassInput)} />
                                        <label htmlFor="currentPass" >Nova Senha</label>
                                    </div>
                                    <div className={styles.field}>
                                        <input type="password" onBlur={confirmPass} name="password" onChange={handleInputChange} />
                                        <label htmlFor="currentPass" >Confirme a Nova Senha</label>
                                    </div>
                                </form>

                            </Card>
                            
                            </main>
                        }

                        { menu[1] && //Filmes
                            <main className={styles.main} >
                            {/* função ternária para evitar erro de rodar um .map() em um array vazio e mostrar
                            uma mensagem de erro mais amigável */}
                            {cinema != "" ?
                            <>
                            
                                <section className={styles.messageList}>
                                    <ul className={styles.ulList}>
                                        {cinema.map((movie, i) => (
                                               
                                                <li key={`liMovie${i}`} className={visibleUser[i] ? styles.selected : null}>
                                                    <button  key={`ButtonUser${i}`} id={movie.id} onClick={ () => handleClickMovie(i) } > <span className={styles.nameList}>{movie.name}</span> </button>
                                                    <input type="checkbox" checked={movie.isOnline} disabled/>
                                                </li>
                                        ))}
                                    </ul>
                
                                </section>

                                <section className={styles.messages}>
                                
                                {cinema.map((movie, i) => 
                                <div key={`CardMovie${i}`} className={styles.mainCard} >

                                    { visibleUser[i] && <CardCinema  values={movie} index={i} onChange={handleInputChange} onChangeCheck={() =>handleIsOnlineMovie(i, movie.id)} onSubmit={handleForm} updateState={updateStates} >
                                        <form className={styles.formPost} id="cinema" data-idcinema={i} onSubmit={handleFormData} >

                                            <label className={styles.user} htmlFor="poster" >
                                                {movie.photo ?
                                                    <img alt="Clique para alterar o poster do filme" title="Clique para alterar o poster do filme" src={inputLogo} className={styles.avatar} />
                                                    : enableAvatar ?
                                                    <img alt="Clique para alterar o poster do filme" title="Clique para alterar o poster do filme" src={inputLogo} className={styles.avatar} />
                                                    :
                                                    <img alt="Clique para adicionar o poster do filme" title="Clique adicionar o poster do filme" src="/images/photos/default-logo.svg" className={styles.avatar} />
                                                }
                                            </label>
                                            <input type="file" id="poster" name="file" required onChange={handleLogo} hidden/>                                     
                                                    
                                            {enableAvatar && <Button text="Salvar" />}
                                        </form>
                                        
                                        </CardCinema>} 
                                    
                                </div>
                                ) }

                                { !visibleUser[lastVisibleUser] && 
                                    <div className={styles.mainCard} >
                                        <div className={styles.newMovie} >
                                            <h2>Para adicionar um novo filme, clique no botão abaixo</h2>
                                            <Button text="Adicionar" action="newMovie"  updateStateParent={updateStates} model="cinema" />
                                            {/* <hr/>
                                            <Button text="Teste" action="teste" updateStateParent={updateStates} model="cinema" /> */}
                                            <img alt="Adicione um novo filme clicando no botão" src="/images/photos/new-cinema.svg"/>
                                        
                                        </div>
                                    </div>
                                }
            
                            </section> 
                                
                                
                            </> : <h1>Ocorreu um erro na conexão com o Servidor 😥</h1> }
                            </main>

                        }
                
                    </>
                </LayoutAdmin>
                        
            }

            { props.err &&
                <div className="error" >
                    <img alt="Não encontramos a página procurada" src="/images/photos/404.svg"/>
                    <h1>Está página não existe!</h1>
                </div>
            }



        </>
    )
}

Index.getInitialProps = async (ctx) =>{

    //console.log(ctx)
    //const { IndexAdmin } = ctx.query
    let data = await handleAuthSSR(ctx)
    let err = false
    let admin = false
    let users = false
    let cinema = false



    switch(data.level) {
        case null: //sem autorização nenhuma (inicial)
        case 0: //perdeu autorização
        case 1: //lojista
            users = true
            break
        case 2: //cinema
            cinema = true
            break
        case 3: //administrador geral
            admin = true
            break
        default:
            err = true
            break
    }
    

        return {
            "data": data,
            //"IndexAdmin": IndexAdmin,
            "err" : err,
            "page" : {
                "admin" : admin,
                "users" : users,
                "cinema" : cinema
            }
        }
}


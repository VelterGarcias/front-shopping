import Layout from '../../components/Layout'
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import CardMessage from '../../components/admin/CardMessage'
import CardUser from '../../components/admin/CardUser'
import CardShop from '../../components/admin/CardShop'
import Card from '../../components/admin/Card'
import Checkbox from '../../components/admin/Checkbox'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/admin/Button'
import styles from '../../components/admin/Admin.module.css'
import serverUrl from '../../utils/env'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import {handleAuthSSR} from '../../utils/auth'

const contactShopping = {phone: '(54) 98403-8507', email: 'weads.velter@gmail.com'}
const config = {
    header: "Content-Type: multipart/form-data"
}

export default function Index(props) {
    
    //console.log(props)
    const cookies = new Cookies();
    const Router = useRouter()

    // if (props.page.users) {
    //     let date_at = new Date(props.data.birth_at).toISOString().split('T')[0]

    //     var [userPerfil, setUserPerfil] = useState({ name: props.data.name, email: props.data.email, password: props.data.password, birth_at: date_at, level: props.data.level, photo: props.data.photo })
    // }
    const [values, setValues] = useState()
    //console.log("Values", values)
    const [userPerfil, setUserPerfil] = useState()
    //console.log("perfil", userPerfil)

    let [nameInput, setNameInput] = useState('')
    let [newPassInput, setNewPassInput] = useState('')
    let [newPassword, setNewPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')

    const [menu, setMenu] = useState([])
    const [shop, setShop] = useState()
    //console.log(shop)

    const [shops, setShops] = useState()
    const [lastVisibleShops, setLastVisibleShops] = useState()
    const [visibleShops, setVisibleShops] = useState()
    

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
        // console.log(action)
        switch(action) {
            
            case "contacts":
                if(!contacts) {
                    //console.log("contatos...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/contacts`)
                        //console.log("RES", res.data)
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
                setMenu({...menu,[0]:true, [1]:false, [2]:false})

                
                //setVisible({...visible, "contacts": props.contacts})
                break

            case "users":
                if(!users) {
                    //console.log("users...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/users`)
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
                setMenu({...menu,[0]:false, [1]:true, [2]:false})


                break
                
            case "shops":
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
                    //console.log("não fez nada")
                }
                setMenu({...menu,[0]:false, [1]:false, [2]:true})
                break

            case "profile":
                //console.log("Perfil...")
                let date_at = new Date(props.data.birth_at).toISOString().split('T')[0]
                setUserPerfil({ id: props.data.id, name: props.data.name, email: props.data.email, password: props.data.password, birth_at: date_at, level: props.data.level, photo: props.data.photo })

                setMenu({...menu,[0]:true, [1]:false})
                break

            case "shop":
                if(!shop) {
                    //console.log("users...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/shop/${props.data.email}`)
                        //console.log("RES USERS", res.data)
                        setShop(res.data)
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
        }
        
    }
    //função que pega os valores alterados nos inputs
    const handleInputChange = e =>{
        const {name, value} = e.target

        setValues({...values, [name]:value})
        //console.log(name, value)
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
        await axios.put(`${serverUrl}/admin/contacts/${id}`, checkboxValue)        
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
            await axios.put(`${serverUrl}/admin/users/${userId}`, levelChange)
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
        
        await axios.put(`${serverUrl}/admin/shops/${id}`, newIsOnline)
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
        
        await axios.put(`${serverUrl}/admin/shops/${id}`, newIsOnline)
        .then(res=>{
            alert(`Sucesso! Agora a loja ${shop.name} está: ${!shop.isOnline ? "Online": "Offline" }.`)
            // let newShops = []   
            // newShops[i] = {...newShops[i], isOnline : !newShops[i].isOnline }
            setShop({...shop, isOnline : !shop.isOnline })
        }).catch(err=>{alert("Deu ruim")}) 
    }
    //função para trocar a foto do usuário ou Logotipo
    const handleFormData = async e => {
        e.preventDefault()
        const model = e.target.id
        const photo = e.target.name ? e.target.name : null
        console.log("model", model)
        console.log("name", e.target.name)
        
        let id = null
        if (model == 'shops') {
            id = shop.id
        } else {
            id = userPerfil.id
        }
        let  formulario = new FormData(e.target)

            await axios.put(`${serverUrl}/admin/${model}/${id}/uploads${ photo ? `/${photo}` : "" }`, formulario, config)
            .then((res)=>{
                alert("Nova foto salva com sucesso!")
                Router.reload()
            }).catch((err)=>{
                alert("Deu ruim")
            })
    }
    
    const currentPass = async e => {
        e.preventDefault()
        let pass = e.target.value
        const valuesPass = {email: userPerfil.email, password: pass}
        let passValid = false;
        let error = ''
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
        if(!passValid) {
            console.log('Senha atual incorreta')
            console.log(error)
            nameInput.focus()
            return
        }
    }

    const newPass = e=> {
        newPassword = e.target.value
        console.log(newPassword)
    }

    const confirmPass = e=> {
        setConfirmPassword(e.target.value)
        if(confirmPassword != newPassword){
            alert('Senhas não conferem')
            newPassInput.focus()
        }
        console.log(newPassword, confirmPassword)
    }

   




    return (

        <>
            { props.page.admin &&

                <LayoutAdmin pageTitle="Shopping" textHeader="Bem Vindo ao Painel" userName={props.data.name} logout={() => handleClick("logout")} menu1={() => handleClick("contacts")} menu1Label="Contatos" menu2={() => handleClick("users")} menu2Label="Usuários" menu3={() => handleClick("shops")} menu3Label="Lojas" >
                    
                    <>
                        <p>Administrador</p>
                        <hr/>

                        { menu[0] &&  //Mensagens
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
                                    <div key={`Card${i}`} >
                                        
                                        { visible[i] && <CardMessage id={contact.id} name={contact.name} email={contact.email} phone={contact.phone} message={contact.message} checked={answered[i] ? "checked": ""} onChange={() => handleClickAnswered(i,contact.id)} received={contact.created_at} updated={contact.updated_at}/>}
                                    </div>
                                    ) }
                
                                </section> 
                            </> : <h1>Você não tem mensagens no momento 😥</h1> }
                            </main>
                        }

                        { menu[1] && //Users
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
                                <div key={`CardUser${i}`} >
                                    {/* Falta colocar o onChange que tive que tirar e deixar o checked dinâmico */}
                                    { visibleUser[i] && <CardUser  values={user} selectId={i} onChangeSelect={handleLevelChange} />} 
                                    
                                </div>
                                ) }
            
                            </section> 
                                
                                
                            </> : <h1>Ocorreu um erro na conexão com o Servidor 😥</h1> }
                            </main>

                        }

                        { menu[2] && //Lojas
                            <>
                                <h1>Lojas</h1>
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
                                    <div key={`CardShop${i}`} >
                                        {/* Falta colocar o onChange que tive que tirar e deixar o checked dinâmico */}
                                        { visibleShops[i] && <CardShop id={shop.id} valueInput={values} values={shop} onChange={() =>handleIsOnline(i, shop.id)} onInputChange={handleInputChange}/>} 
                                        
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
                    
                <LayoutAdmin pageTitle="Shopping" textHeader="Bem Vindo ao Painel" userName={props.data.name} logout={() => handleClick("logout")} menu1={() => handleClick("profile")} menu1Label="Perfil" menu2={() => handleClick("shop")} menu2Label="Loja" >
                    <>
                        <p>Lojista</p>
                        <hr />

                        { menu[0] && //Perfil
                            <>
                            <Card >

                                <div className={styles.header}>

                                    <h2>Foto do Perfil</h2>

                                </div>
                                <img src={`${serverUrl}/admin/users/${userPerfil.id}/photo`} className={styles.avatar} />
                                <form className={styles.formPost} id="users" onSubmit={handleFormData}>
                                    
                                    <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                              
                                    <Button text="Trocar Foto" />
                                </form>

                            </Card>
                            <Card actions={<Button id={userPerfil.id} text="Salvar" action="save" values={values} model="users" />}>
                            
                                <div className={styles.header}>

                                    <h2>Dados Pessoais</h2>

                                </div>

                                <form className={styles.form} >
                                    <div className={styles.fields}>
                                        <Input type="text" name="name" defaultValue={userPerfil.name} label="Nome Completo" onChange={handleInputChange} onFocus={handleInputChange}/>
                                        <Input type="email" name="email" label="Email" defaultValue={userPerfil.email} onChange={handleInputChange} onFocus={handleInputChange} />
                                        {/* <Input type="tel" name="phone" label="Telefone" defaultValue={userPerfil.phone} onChange={handleInputChange} onFocus={handleInputChange} /> */}
                                        <Input type="date" name="birth_at" label="Data de Nascimento" defaultValue={userPerfil.birth_at} onChange={handleInputChange} onFocus={handleInputChange} />
                                    </div>
                                </form>
                                
                            </Card>

                            <Card actions={<Button action="passwordChange" id={userPerfil.id} values={values} text="Alterar" />}>

                            <div className={styles.header}>

                                <h2>Senha</h2>

                            </div>

                            <form className={styles.form}>

                                <input type="password" placeholder="Senha Atual" onBlur={currentPass} ref={inputPass => setNameInput(inputPass)} />

                                <input type="password" placeholder="Nova Senha" onBlur={newPass} ref={newPassInput => setNewPassInput(newPassInput)} />

                                <input type="password" placeholder="Confirme a Nova Senha" onBlur={confirmPass} name="password" onChange={handleInputChange} />

                            </form>

                            </Card>
                            </>
                        }

                        { menu[1] && //Loja
                            <>
                            {props.data.level == 1 ? shop != "" ?
                                <> {/* Já criou/tem uma loja */}

                                    <Card >

                                        <div className={styles.header}>

                                            <h2>Logotipo da Loja</h2>

                                        </div>
                                        <img src={`${serverUrl}/admin/shops/${shop.id}/photo/`} className={styles.avatar} />
                                        <form className={styles.formPost} id="shops" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>
                                    <Card actions={<Button id={shop.id} text="Salvar" action="save" values={values} model="shops" />}>

                                        <div className={styles.header}>

                                            <h2>Dados da Loja</h2>

                                        </div>

                                        <form className={styles.form} >
                                            <div className={styles.fields}>
                                                <Checkbox className={styles.checkBox} type="checkbox" name="isOnline" label="Online?" checked={shop.isOnline} onChange={() =>handleIsOnlineShop(shop.id)}/>
                                                <Input type="text" name="name" defaultValue={shop.name} label="Nome da Loja" onChange={handleInputChange} onFocus={handleInputChange}/>
                                                {/* Category deveria ser um select */}
                                                <Input type="text" name="category" label="Categoria" defaultValue={shop.category} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Textarea name="description" label="Descrição" defaultValue={shop.description} onChange={handleInputChange} onFocus={handleInputChange} /> 
                                                <Input type="tel" name="phone" label="Telefone Fixo" defaultValue={shop.phone} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Input type="tel" name="smartphone" label="Celular" defaultValue={shop.smartphone} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Input type="text" name="whatsapp" label="WhatsApp" defaultValue={shop.whatsapp} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Input type="text" name="adress" label="Localização" defaultValue={shop.adress} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Input type="text" name="website" label="Website" defaultValue={shop.website} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Input type="text" name="facebook" label="Facebook" defaultValue={shop.facebook} onChange={handleInputChange} onFocus={handleInputChange} />
                                                <Input type="text" name="instagram" label="Instagram" defaultValue={shop.instagram} onChange={handleInputChange} onFocus={handleInputChange} />
                                    
                                                
                                            </div>
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={1} model="shops" />} >

                                        <div className={styles.header}>

                                            <h2>Foto 1</h2>

                                        </div>
                                        <img src={shop.photo1 ? `${serverUrl}/admin/shops/${shop.id}/photo/1` : "/images/default_image.svg"} className={styles.photos} />
                                        <form className={styles.formPost} id="shops" name="1" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>
                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={2} model="shops" />} >

                                        <div className={styles.header}>

                                            <h2>Foto 2</h2>

                                        </div>
                                        <img src={shop.photo2 ? `${serverUrl}/admin/shops/${shop.id}/photo/2` : "/images/default_image.svg"} className={styles.photos} />
                                        <form className={styles.formPost} id="shops" name="2" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={3} model="shops" />} >

                                        <div className={styles.header}>

                                            <h2>Foto 3</h2>

                                        </div>
                                        <img src={shop.photo3 ? `${serverUrl}/admin/shops/${shop.id}/photo/3` : "/images/default_image.svg"} className={styles.photos} />
                                        <form className={styles.formPost} id="shops" name="3" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={4} model="shops" />} >

                                        <div className={styles.header}>

                                            <h2>Foto 4</h2>

                                        </div>
                                        <img src={shop.photo4 ? `${serverUrl}/admin/shops/${shop.id}/photo/4` : "/images/default_image.svg"} className={styles.photos} />
                                        <form className={styles.formPost} id="shops" name="4" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={5} model="shops" />} >

                                        <div className={styles.header}>

                                            <h2>Foto 5</h2>

                                        </div>
                                        <img src={shop.photo5 ? `${serverUrl}/admin/shops/${shop.id}/photo/5` : "/images/default_image.svg"} className={styles.photos} />
                                        <form className={styles.formPost} id="shops" name="5" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>

                                    <Card actions={<Button id={shop.id} text="Excluir" action="deletePhoto" values={6} model="shops" />} >

                                        <div className={styles.header}>

                                            <h2>Foto 6</h2>

                                        </div>
                                        <img src={shop.photo6 ? `${serverUrl}/admin/shops/${shop.id}/photo/6` : "/images/default_image.svg"} className={styles.photos} />
                                        <form className={styles.formPost} id="shops" name="6" onSubmit={handleFormData}>
                                            
                                            <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                                    
                                            <Button text="Trocar Foto" />
                                        </form>

                                    </Card>

                                </>
                                : 
                                
                                <>  {/* Já tem permissão mas ainda não criou a loja */}
                                
                                    <h1>Você ainda não cadastrou a sua loja 😥</h1>
                                    <Button id={shop.id} text="Começar agora mesmo" action="newShop" values={props.data.email} model="shops" />
                                </> :
                                
                                <> {/* Ainda não tem permissão pra criar a loja */}
                                    <h1> Você ainda não tem permissão para cadastrar uma loja 😥</h1>
                                    <p>Entre em contato com a administração para receber essa permissão.</p>
                                    <p>Email: <a href={`mailto:${contactShopping.email}`}>{contactShopping.email}</a></p>
                                    <p>Telefone:<a href={`tel:${contactShopping.phone}`}>{contactShopping.phone}</a></p>
                                </>
                                }
                            </>
                        }
                
                    </>
                </LayoutAdmin>
                    
            }

            { props.err &&
                <h1>Admin - Está página não existe!</h1>
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



    switch(data.level) {
        case null: //sem autorização nenhuma (inicial)
        case 0: //perdeu autorização
        case 1: //lojista
            users = true
            break
        case 2: //cinema
            //user = true
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
                "users" : users
            }
        }
}


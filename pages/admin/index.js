import Layout from '../../components/Layout'
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import CardMessage from '../../components/admin/CardMessage'
import CardUser from '../../components/admin/CardUser'
import Card from '../../components/admin/Card'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/admin/Button'
import styles from '../../components/admin/Contacts.module.css'
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

    const [shops, setShops] = useState()
    const [lastVisibleShops, setLastVisibleShops] = useState()
    const [visibleShops, setVisibleShops] = useState()
    

    const [users, setUsers] = useState()
    const [lastVisibleUser, setLastVisibleUser] = useState()
    const [visibleUser, setVisibleUser] = useState()

    const [contacts, setContacts] = useState()
    const [lastVisible, setLastVisible] = useState()
    const [visible, setVisible] = useState()
    const [answered, setAnswered] = useState()

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

    const handleInputChange = e =>{
        const {name, value} = e.target

        setValues({...values, [name]:value})
        console.log(name, value)
    }

    function handleClickMessage(index) {
        
        setVisible({...visible, [lastVisible]:false, [index]:!visible[index]})
        setLastVisible(index)    
        //console.log(visible)
    }

    function handleClickUser(index) {
        setVisibleUser({...visibleUser, [lastVisibleUser]:false, [index]:!visibleUser[index]})
        setLastVisibleUser(index)    
        //console.log(visible)
    }

    function handleClickShops(index) {
        
        setVisibleShops({...visibleShops, [lastVisibleShops]:false, [index]:!visibleShops[index]})
        setLastVisibleShops(index)    
        //console.log(visible)
    }

    //função para marcar a mensagem como "lida/respondida" tanto na tela como no DB
    async function handleClickAnswered(index, id) {

        const userPerfil = {answered: !answered[index]}
        setAnswered({...answered, [index]:!answered[index]})
        await axios.put(`${serverUrl}/admin/contacts/${id}`, values)        
    }

    const handleFormData = async e => {
        e.preventDefault()
        let  formulario = new FormData(e.target)

            await axios.post(`${serverUrl}/admin/users/${userPerfil.id}/uploads`, formulario, config)
            .then((res)=>{
                alert("Nova foto salva com sucesso!")
                Router.reload()
            }).catch((err)=>{
                alert("Deu ruim")
                // Router.push("/admin/posts")
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

                        { menu[0] && 
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
                                    <>
                                        
                                        { visible[i] && <CardMessage key={`Card${i}`} id={contact.id} name={contact.name} email={contact.email} phone={contact.phone} message={contact.message} checked={answered[i] ? "checked": ""} onChange={() => handleClickAnswered(i,contact.id)} received={contact.created_at} updated={contact.updated_at}/>}
                                    </>
                                    ) }
                
                                </section> 
                            </> : <h1>Você não tem mensagens no momento 😥</h1> }
                            </main>
                        }

                        { menu[1] &&

                            

                            <main className={styles.main} >
                            {/* função ternária para evitar erro de rodar um .map() em um array vazio e mostrar
                            uma mensagem de erro mais amigável */}
                            {users != "" ?
                            <>
                            
                                <section className={styles.messageList}>
                                    <ul className={styles.ulList}>
                                        {users.map((user, i) => (
                                               
                                                <li key={`liUser${i}`} className={visibleUser[i] ? styles.selected : null}>
                                                    <button  key={`ButtonUser${i}`} id={user.id} onClick={ () => handleClickUser(i) } > <span className={styles.nameList}>{user.name}</span> <span className={styles.dateList}>{new Date(user.created_at).toISOString().split('T')[0]}</span></button>
                                                </li>
                                        ))}
                                    </ul>
                
                                </section>

                                <section className={styles.messages}>
                                
                                {users.map((user, i) => 
                                <>
                                    {/* Falta colocar o onChange que tive que tirar e deixar o checked dinâmico */}
                                    { visibleUser[i] && <CardUser key={`CardUser${i}`} id={user.id} name={user.name} email={user.email} phone={user.photo} message={user.id} checked="checked" received={user.created_at} updated={user.updated_at} page="admin" />} 
                                    
                                </>
                                ) }
            
                            </section> 
                                
                                
                            </> : <h1>Ocorreu um erro na conexão com o Servidor 😥</h1> }
                            </main>

                        }

                        { menu[2] &&
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
                                                        <button  key={`ButtonShop${i}`} id={shop.id} onClick={ () => handleClickShops(i) } > <span className={styles.nameList}>{shop.name}</span> <span className={styles.dateList}>{new Date(shop.created_at).toISOString().split('T')[0]}</span></button>
                                                    </li>
                                            ))}
                                        </ul>
                    
                                    </section>

                                    <section className={styles.messages}>
                                    
                                    {shops.map((shop, i) => 
                                    <>
                                        {/* Falta colocar o onChange que tive que tirar e deixar o checked dinâmico */}
                                        { visibleShops[i] && <CardUser key={`CardShop${i}`} id={shop.id} name={shop.name} email={shop.email} phone={shop.photo} message={shop.id} checked="checked" received={shop.created_at} updated={shop.updated_at} page="admin" />} 
                                        
                                    </>
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

                        { menu[0] &&
                            <>
                            <Card >

                                <div className={styles.header}>

                                    <h2>Foto do Perfil</h2>

                                </div>
                                <img src={`${serverUrl}/admin/users/${userPerfil.id}/photo`} className={styles.avatar} />
                                <form className={styles.formPost} onSubmit={handleFormData}>
                                    
                                    <Input type="file"  name="file" required={true}  label="Foto de perfil"/>                                       
                                              
                                    <Button text="Trocar Foto" />
                                </form>

                            </Card>
                            <Card actions={<Button id={userPerfil.id} text="Salvar" action="save" values={values} />}>
                            
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

                        { menu[1] &&
                            <>
                            {props.data.level == 1 ? shop != "" ?
                                <>
                                    <h1>Loja</h1>
                                    <p>id: {shop.id}</p>
                                    <p>name: {shop.name}</p>
                                    <p>email: {shop.admin_mail}</p>
                                    <p>phone: {shop.phone}</p>
                                    <p>whatsapp: <a href={shop.whatsapp} >{shop.whatsapp}</a></p>
                                    <p>isOnline: {shop.isOnline}</p>
                                </>
                                : 
                                <>
                                    <h1>Você ainda não cadastrou a sua loja 😥</h1>
                                    <p>Começe agora mesmo...</p>
                                    <label>Nome:</label>
                                    <input></input>
                                </> :
                                <>
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


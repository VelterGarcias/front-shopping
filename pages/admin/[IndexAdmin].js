import Layout from '../../components/Layout'
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import CardMessage from '../../components/admin/CardMessage'
import styles from '../../components/admin/Contacts.module.css'
import serverUrl from '../../utils/env'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'




export default function IndexAdmin(props) {
    
    console.log(props)


    const Router = useRouter()

    const [visibles, setVisibles] = useState()

    const [menu, setMenu] = useState([])

    const [users, setUsers] = useState()


    const [contacts, setContacts] = useState()
    const [lastVisible, setLastVisible] = useState()
    const [visible, setVisible] = useState()
    const [answered, setAnswered] = useState()
    //const [answered, setAnswered] = useState(contacts != "" ? contacts.map((contact, i) => contact.answered) : null)

    console.log("Contatos", contacts)
    console.log("Visible", visible)
    console.log("Menu", menu)

    async function handleClick(action) {
        console.log(action)

        switch(action) {
            
            case "contacts":
                if(!contacts) {
                    console.log("contatos...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/contacts`)
                        console.log("RES", res.data)
                        setContacts(res.data)
                        setVisible(res.data.map((contact, i) => false))
                        setAnswered(res.data.map((contact, i) => contact.answered))
                    }catch(err){ res = [] 
                        console.log("Deu ruim")
                        setContacts("")
                    }
                } else {
                    console.log("não fez nada")
                }
                setMenu({...menu,[0]:true, [1]:false, [2]:false})

                
                //setVisible({...visible, "contacts": props.contacts})
                break

            case "users":
                if(!users) {
                    console.log("users...")
                    let res
                    try{ res = await axios.get(`${serverUrl}/admin/users`)
                        console.log("RES USERS", res.data)
                        setUsers(res.data)
                        //setVisible(res.data.map((contact, i) => false))
                    }catch(err){ res = [] 
                        console.log("Deu ruim USERS")
                        setUsers("")
                    }
                } else {
                    console.log("não fez nada")
                }
                setMenu({...menu,[0]:false, [1]:true, [2]:false})


                break
                
            case "shops":
                console.log("Lojas...")
                setMenu({...menu,[0]:false, [1]:false, [2]:true})
                break

            case "profile":
                console.log("Perfil...")
                setMenu({...menu,[0]:true, [1]:false})
                break

            case "shop":
                console.log("Dados da Loja...")
                setMenu({...menu,[0]:false, [1]:true})
                break

            case "logout":
                console.log("SAINDO...")
                //setVisible({...visible, [index]:!visible[index]})
                Router.push('/')
                break

            case "delete":
                
                break

            case "Teste":
               
                break
        
        }
        // const cookies = new Cookies()
         //e.preventDefault()
        // cookies.remove('token')
        // cookies.remove('user')
        // cookies.remove('typet')
        // Router.push('/')
    }

    function handleClickMessage(index) {
        
        setVisible({...visible, [lastVisible]:false, [index]:!visible[index]})
        setLastVisible(index)    
        //console.log(visible)
    }

    //função para marcar a mensagem como "lida/respondida" tanto na tela como no DB
    async function handleClickAnswered(index, id) {

        const values = {answered: !answered[index]}
        setAnswered({...answered, [index]:!answered[index]})
        await axios.put(`${serverUrl}/admin/contacts/${id}`, values)        
    }



    return (

        <>
            { props.page.admin &&

                <LayoutAdmin pageTitle="Shopping" textHeader="Bem Vindo ao Painel" userName="Velter (estático)" logout={() => handleClick("logout")} menu1={() => handleClick("contacts")} menu1Label="Contatos" menu2={() => handleClick("users")} menu2Label="Usuários" menu3={() => handleClick("shops")} menu3Label="Lojas" >
                    
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
                                                    <button  key={`Button${i}`} id={contact.id} onClick={ () => handleClickMessage(i) } value="teste"> <span className={styles.nameList}>{contact.name}</span> <span className={styles.dateList}>{new Date(contact.created_at).toISOString().split('T')[0]}</span></button>
                                                </li>
                                        ))}
                                    </ul>
                
                                </section>
                                
                                <section className={styles.messages}>
                                
                                    {contacts.map((contact, i) => 
                                    <>
                                        {console.log("Card:", i, visible[i] )}
                                        
                                        { visible[i] && <CardMessage key={`Card${i}`} id={contact.id} name={contact.name} email={contact.email} phone={contact.phone} message={contact.message} checked={answered[i] ? "checked": ""} onChange={() => handleClickAnswered(i,contact.id)} received={contact.created_at} updated={contact.updated_at}/>}
                                    </>
                                    ) }
                
                                </section> 
                            </> : <h1>Você não tem mensagens no momento 😥</h1> }
                            </main>
                        }

                        { menu[1] &&

                            <h1>Usuários</h1>

                        }

                        { menu[2] &&

                            <h1>Lojas</h1>

                        }
                    </>

                </LayoutAdmin> 
            }


            { props.page.users && 
                    
                <LayoutAdmin pageTitle="Shopping" textHeader="Bem Vindo ao Painel" userName="Velter (estático)" logout={() => handleClick("logout")} menu1={() => handleClick("profile")} menu1Label="Perfil" menu2={() => handleClick("shop")} menu2Label="Loja" >
                    <>
                        <p>Lojista</p>
                        <hr />

                        { menu[0] &&

                            <h1>Perfil</h1>

                        }

                        { menu[1] &&

                            <h1>Loja</h1>

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

IndexAdmin.getInitialProps = async ({query}) =>{

        

    const { IndexAdmin } = query
    let data = []
    let err = false
    let admin = false
    let users = false

    

    switch(IndexAdmin) {
        case "admin":
            data = "Administrador-ok"
            admin = true
            break
        case "lojista":
            data = "Lojista-ok"
            users = true
            break
        case "login":
            data = "login-ok"
            break
        default:
            err = true
            break
    }
    

        return {
            "data": data,
            "IndexAdmin": IndexAdmin,
            "err" : err,
            "page" : {
                "admin" : admin,
                "users" : users
            }
        }
}


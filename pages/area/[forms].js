import Layout from '../../components/Layout'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'
import styles from '../../components/Contact.module.css'
import serverUrl from '../../utils/env'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Cookies } from 'react-cookie'
import Link from 'next/link';


const initialState = {name: '', phone: '', email: '', message: ''}

export default function Forms(props) {
    

    const router = useRouter()
    const cookies = new Cookies();
    
    if (props.contato) {
        var [values, setValues] = useState(initialState)
    } else {
        var [values, setValues] = useState({ email: '', password: '' })
    }

    const handleInputChange = e => {    
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        //console.log(values)
    }

    const handleLogin = async e => {
        e.preventDefault()
        await axios.post(`${serverUrl}/auths`, values)
        .then(
            (res) => {
                cookies.remove('token', { path: '/' })
                // cookies.remove('user')
                // cookies.remove('typet')
                // cookies.remove('name_training')
                // cookies.remove('description')
                const { token } = res.data.token
                const user = res.data.user
                //console.log("RESPOSTA LOGIN:", res.data )
                const { level } = res.data.user
                cookies.set('token', token, { path: '/' } )
                router.push('/admin')


            }
        ).catch(err => alert("Usuário não encontrado, tente novamente e se o problema persistir contate um administrador ", err))
    }

    const handleRegister = e => {
        e.preventDefault()
        
        axios.post(`${serverUrl}/admin/users`, values)
        .then( res => {
        alert(`Olá ${res.data.user.name} seus dados foram cadastrados ID: ${res.data.user.id}`)

            // cookies.remove('token')
            cookies.remove('token')
            const { token } = res.data.token
            //console.log(token)
            //console.log(res.data.id)
            // const { token } = res.data.token
            //const user = res.data.user.id

            // const typet = res.data.user["type_training"]
            // const isAdmin = res.data.user.isAdmin
            cookies.set('token', token)
            //cookies.set('user', user)
            //console.log("userId-gravado", cookies.get('user'))


            router.push('/admin')
        }).catch( err => {alert("Deu ruim no registro", err.message)})
    }

    const handleFormSubmit =  e =>{
        e.preventDefault()
        axios.post(`${serverUrl}/admin/contacts`, values)
        .then(res=> {
                  // console.log('Usuário autenticado!')
                alert('Sua mensagem foi enviada com Sucesso!')
               setValues(initialState)
               
            }
        ).catch(err => alert('Deu ruim', err.message))
    }

    return (
        
        <Layout pageTitle="Valentin Shopping Center" >

            { props.login && 
                <>
                    <header className={`${styles.pageHeader} ${styles.cinema}`}>
                        <div className={styles.title} >
                            <h1>Login</h1>
                        </div>
                    </header>
                    <img className={styles.storieLeft} alt="Lojista fazendo login na área administrativa" src="/images/photos/login.svg"/>
                    <form className={styles.form} onSubmit={handleLogin}>
                        <div className={styles.fields}>
                            <Input type="email" name="email" required={true} onChange={handleInputChange} onFocus={handleInputChange} label="Seu E-mail" />
                            <Input type="password" name="password" required={true} label="Senha" onChange={handleInputChange} onFocus={handleInputChange} />
                        </div>
                        <div>
                        <p>Ainda não tem cadastro? 
                            <Link href="/area/[forms]" as="/area/cadastro">
                                <a > Registre-se </a>
                            </Link>
                            </p>
                        </div>
                        <Button text="Entrar" />
                    </form>
                    <img className={styles.storie} alt="Mulher feliz por ser uma nova lojista no Shopping" src="/images/photos/login2.svg"/>
                </>
            }

            { props.cadastro && 
                <>
                    <header className={`${styles.pageHeader} ${styles.cinema}`}>
                        <div className={styles.title} >
                            <h1>Cadastro</h1>
                        </div>
                    </header>
                    <img className={styles.storieLeft} alt="Lojista atendendo um clinte" src="/images/photos/cadastro.svg"/>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <div className={styles.fields}>

                            <Input type="text" name="name" onChange={handleInputChange} required={true} onFocus={handleInputChange} label="Nome Completo"/>
                            <Input type="email" name="email" label="Email" required={true} onChange={handleInputChange}onFocus={handleInputChange} />
                            <Input type="password" name="password" label="Senha" required={true} onChange={handleInputChange} onFocus={handleInputChange}/>
                        </div>    
                        <div>
                        <p>Já tem cadastro? 
                            <Link href="/area/[forms]" as="/area/login" >
                                <a > clique aqui </a> 
                            </Link>
                            para fazer login</p>
                        </div>        
                        <Button text="Cadastrar-se"/>
                    </form>
                    <img className={styles.storie} alt="Mulher feliz por ser uma nova lojista no Shopping" src="/images/photos/cadastro2.svg"/>
                </>
            }

            { props.contato && 
                <>
                <header className={`${styles.pageHeader} ${styles.cinema}`}>
                    <div className={styles.title} >
                        <h1>Contato</h1>
                    </div>
                </header>
                <img className={styles.storieLeft} alt="Atendente conversando com um cliente no telefone" src="/images/photos/contato.svg"/>
                
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <div className={styles.fields}>
                            <Input type="text" name="name" value={values.name} label="Nome Completo" onChange={handleInputChange} onFocus={handleInputChange}/>
                            <Input type="email" name="email" label="Email" value={values.email} onChange={handleInputChange} onFocus={handleInputChange} />
                            <Input type="tel" name="phone" label="Celular" value={values.phone} onChange={handleInputChange} onFocus={handleInputChange} />
                        </div>
                        <Textarea name="message" label="Mensagem" value={values.message} onChange={handleInputChange} onFocus={handleInputChange} /> 
                        <Button text="Enviar"/>
                    </form>
                    <img className={styles.storie} alt="Homem feliz escorado em um @ depois de um email enviado" src="/images/photos/contato2.svg"/>
                    
                </>
            }
            

        </Layout>
    )
}

export async function getStaticPaths() {
    return {
      // Only `/posts/1` and `/posts/2` are generated at build time
      paths: [
        { params: { forms: 'login'}},
        { params: { forms: 'cadastro'}},
        { params: { forms: 'contato'}}
        ],
      // Enable statically generating additional pages
      // For example: `/posts/3`
      fallback: false,
    }
  }


export async function getStaticProps({params}) {
    //console.log(params)
    const { forms } = params
    let data = []
    let err = false
    let login = false
    let cadastro = false
    let contato = false
    

    switch(forms) {
        case "login":
            data = "lojas-ok"
            login = true
            break
        case "cadastro":
            data = "alimentacao-ok"
            cadastro = true
            break
        case "contato":
            data = "Contato-ok"
            contato = true
            break
        default:
            err = true
            break
    }

    return {
        props : {
            "data": data,
            "forms": forms,
            "err" : err,
            "login" : login,
            "cadastro" : cadastro,
            "contato" : contato
        }
    }
  }

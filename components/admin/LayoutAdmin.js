import Head from 'next/head'
import styles from './LayoutAdmin.module.css'
import Link from 'next/link'
import axios from 'axios'
import serverUrl from '../../utils/env'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'


export default function LayoutAdmin(props){
    const Router = useRouter()

    
    
    return(
        
        <section  className={styles.containerAdmin}>
            <Head>
                <title>{props.pageTitle ? props.pageTitle : ""}</title>
                <meta name="author" content="Velter Garcias" />
                <meta name="description" content="Conheça nosso escritório de advocacia. A Advogarcias luta por seus direitos. Profissionais especializados para cuidar da sua causa." />
                <meta name="keywords" content="advogado, escritório de advocacia, advogarcias" />
                <meta name="robots" content="index,follow" />
                <meta property="og:title" content="Advogarcias - Escritório de Advocacia" />
                <meta property="og:description" content="Conheça nosso escritório de advocacia. A Advogarcias luta por seus direitos. Profissionais especializados para cuidar da sua causa." />
                <meta property="og:image" content="https://advogarcias.web.app/images/photos/Advogarcias.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="748" />
                <meta property="og:image:height" content="625" />
                <meta property="og:type" content="website" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#2b2626" />
                <meta name="theme-color" content="#2b2626" />
                <meta name="msapplication-navbutton-color" content="#2b2626"></meta>
                <link rel="shortcut icon" href="/images/logo/Advogarcias.svg" />
            </Head>
            <header className={styles.mainHeader}>
                <div className={styles.logoAdmin}>
                    <Link href="/admin">
                        <a>
                            <img srcSet="/Logo/Fitness.svg"/>
                        </a>
                    </Link>
                </div>
                
                <nav className={styles.navMenu}>
                    
                    <p>Gerenciar</p>
                    
                    <a onClick={props.menu1} title={props.menu1Label} >{props.menu1Label}</a>
                
                    <a onClick={props.menu2} title={props.menu2Label} >{props.menu2Label}</a>

                    {props.menu3 && 
                    <a onClick={props.menu3} title={props.menu3Label} >{props.menu3Label}</a> }
               
                </nav>
                <nav className={styles.navMobile}>                    
                    <p><img srcSet="/Icon/icon-maneger.svg" /></p>
                    
                    <a onClick={props.menu1} title={props.menu1Label} ><img srcSet="/Icon/icon-contacts.svg"/></a>
                    
                    <a onClick={props.menu2} title={props.menu2Label} ><img srcSet="/Icon/icon-users.svg"/></a>

                    {props.menu3 && 
                    <a onClick={props.menu3} title={props.menu3Label} ><img srcSet="/Icon/icon-posts.svg"/></a>}
                    
                </nav>
                <a onClick={props.logout} title="Sair" className={styles.logOut}><img srcSet="/Icon/icon-logout.svg"/></a>
                 
            </header>
            <div className={styles.mainAdmin}>
                    <p>Ola, {props.userName ? props.userName: "Indefinido"}!</p>
                    <h1>{props.textHeader}</h1>
                    <hr/>
                    
                    {props.children}

            </div>
               
    </section>
    )
}
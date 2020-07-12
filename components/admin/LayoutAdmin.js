import Head from 'next/head'
import styles from './LayoutAdmin.module.css'
import Link from 'next/link'
import axios from 'axios'
import serverUrl from '../../utils/env'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'


export default function LayoutAdmin(props){
    const Router = useRouter()
    
    let menu = props.textHeader[0] ? props.menu1Label : props.textHeader[1] ? props.menu2Label : props.textHeader[2] ? props.menu3Label : "Bem Vindo"

    
    
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
                <meta property="og:image" content="https://advogarcias.web.app/assets/images/photos/Advogarcias.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="748" />
                <meta property="og:image:height" content="625" />
                <meta property="og:type" content="website" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#A100F5" />
                <meta name="theme-color" content="#A100F5" />
                <meta name="msapplication-navbutton-color" content="#A100F5" />
                <link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-icon-57x57.png"/>
                <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-icon-60x60.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-icon-72x72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-icon-76x76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-icon-114x114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-icon-120x120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-icon-144x144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-icon-152x152.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-icon-180x180.png"/>
                <link rel="icon" type="image/png" sizes="192x192"  href="/images/favicon/android-icon-192x192.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96x96.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="/images/favicon/manifest.json"/>
                <meta name="msapplication-TileColor" content="#A100F5"/>
                <meta name="msapplication-TileImage" content="/images/favicon/ms-icon-144x144.png"/>
            </Head>
            <header className={styles.mainHeader}>
                <div className={styles.logoAdmin}>
                    
                    <img srcSet="/images/favicon.svg" onClick={props.clickLogo}/>
                        
                </div>
                
                <nav className={styles.navMenu}>
                    
                    <p>Gerenciar</p>
                    
                    <a onClick={props.menu1} title={props.menu1Label} >{props.menu1Label}</a>
                
                    <a onClick={props.menu2} title={props.menu2Label} >{props.menu2Label}</a>

                    {props.menu3 && 
                    <a onClick={props.menu3} title={props.menu3Label} >{props.menu3Label}</a> }
               
                </nav>
                <nav className={styles.navMobile}>                    
                    
                    <a onClick={props.menu1} title={props.menu1Label} ><img srcSet="/Icon/icon-contacts.svg"/></a>
                    
                    <a onClick={props.menu2} title={props.menu2Label} ><img srcSet="/Icon/icon-users.svg"/></a>

                    {props.menu3 && 
                    <a onClick={props.menu3} title={props.menu3Label} ><img srcSet="/Icon/icon-posts.svg"/></a>}
                    
                </nav>
                <a onClick={props.logout} title="Sair" className={styles.logOut}><img srcSet="/Icon/icon-logout.svg"/></a>
                 
            </header>
            <div className={styles.mainAdmin}>
                    { menu == 'Bem Vindo' &&
                        <div className={styles.welcome}>
                            <p>Olá, <span>{props.userName ? props.userName: "Indefinido"}</span>!</p>
                        </div>
                    }
                    
                    <header className={styles.pageHeader}>
                        <div className={styles.title} >
                            <h1>{menu}</h1>
                        </div>
                    </header>

                    { menu == 'Bem Vindo' &&
                        <div className={styles.welcomeMain}>
                            <img alt="Seja Bem Vindo a área Administrativa" src="/images/photos/welcome.svg"/>
                            <h2>Seja Bem Vindo a área Administrativa</h2>
                        </div>
                    }
                                        
                    {props.children}

            </div>
               
    </section>
    )
}
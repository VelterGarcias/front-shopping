import Head from 'next/head' //modulo imbutido toda vez que tiver "next/""
import styles from './Layout.module.css'
import Header from "./Header"
import Footer from "./Footer"

export default function Layout(props) {

    return (
        <>
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
                <meta name="apple-mobile-web-app-status-bar-style" content="#2b2626" />
                <meta name="theme-color" content="#2b2626" />
                <meta name="msapplication-navbutton-color" content="#2b2626"></meta>
                <link rel="shortcut icon" href="/images/logo/Advogarcias.svg" />
            </Head>

            <div className={styles.content} >

                <Header />

                <main className={styles.main}>

                    {props.children}

                </main>

                <Footer />

            </div>
        </>
    )

}
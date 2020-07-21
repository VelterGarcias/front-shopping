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
                <meta name="description" content="Conheça o melhor shopping da cidade. O Valentin Shopping Center é o melhor lugar para passar com a sua família, se divertir e fazer compras." />
                <meta name="keywords" content="shopping, lojas, cinema, praça de alimentação" />
                <meta name="robots" content="index,follow" />
                <meta property="og:title" content="Valentin - Shopping Center" />
                <meta property="og:description" content="Conheça o melhor shopping da cidade. O Valentin Shopping Center é o melhor lugar para passar com a sua família, se divertir e fazer compras." />
                <meta property="og:image" content="https://front-shopping.vercel.app/images/logo.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1500" />
                <meta property="og:image:height" content="1500" />
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
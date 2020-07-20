import Layout from '../components/Layout'
import styles from '../components/Home.module.css'
import Link from 'next/link'



export default function Index() {

    return (
        
        <Layout pageTitle="Valentin Shopping Center" >

            <section className={styles.section}>
                <h2>Estamos de portas abertas esperando por você</h2>
                <img className={styles.storie} alt="Casal olhando uma vitrine" src="/images/photos/sobre.svg"/>
            </section>

            <section className={styles.section}>
                <h2>Conheça nossas lojas</h2>
                <p>O Royal Plaza Shopping dispõe de mais de 100 lojas dos mais diversos segmentos. Acesse o nosso guia e conheça!</p>
                <img className={styles.storie} alt="Casal olhando uma vitrine" src="/images/photos/sobre.svg"/>
            </section>
            <section className={styles.section}>
                <h2>A praça de Alimentação</h2>
                <p>A praça de alimentação reúne os mais variados cardápios para suas refeições, tudo em um ambiente moderno e descontraído.</p>
                <img className={styles.storie} alt="Casal olhando uma vitrine" src="/images/photos/sobre.svg"/>
            </section>
            <section className={styles.section}>
                <h2>Serviços para você</h2>
                
                <img className={styles.storie} alt="Casal olhando uma vitrine" src="/images/photos/sobre.svg"/>
            </section>
            <section className={styles.section}>
                <h2>Cinema</h2>
                <p>A praça de alimentação reúne os mais variados cardápios para suas refeições, tudo em um ambiente moderno e descontraído.</p>
                <img className={styles.storie} alt="Casal olhando uma vitrine" src="/images/photos/sobre.svg"/>
            </section>
            <Link href="/[slug]" as="/post">
                <a><h3>Erro</h3></a>
            </Link>
            

        </Layout>
    )
}


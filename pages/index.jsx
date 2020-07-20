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

            <section className={`${styles.section} ${styles.shop}`}>
                <h2>Conheça nossas lojas</h2>
                <img className={styles.storie} alt="Mulher olhando a vitrine de uma loja" src="/images/photos/shop-home.svg"/>
                <p>O Royal Plaza Shopping dispõe de mais de 100 lojas dos mais diversos segmentos. Acesse o nosso guia e conheça!</p>
                <Link href="/[slug]" as="/lojas">
                <a className={styles.btn} ><p>Ver as lojas</p></a>
                </Link>
            </section>
            <section className={`${styles.section} ${styles.food}`}>
                <h2>A praça de Alimentação</h2>
                <p>A praça de alimentação reúne os mais variados cardápios para suas refeições, tudo em um ambiente moderno e descontraído.</p>
                <Link href="/[slug]" as="/alimentacao">
                <a className={styles.btn} ><p>Saiba mais</p></a>
                </Link>
            </section>
            <section className={styles.section}>
                <h2>Serviços para você</h2>
                <ul>
                    <li className={styles.highlights}>
                        <h3>WIRELESS</h3>
                        <p>Disponibilizamos gratuitamente uma rede de internet wireless, rápida e ampla, localizada na praça de alimentação, no 3º andar. O acesso é bem simples, por meio do dispositivo utilizado, o cliente precisa identificar a rede “Valentin”, selecioná-la e fazer o acesso, não há necessidade de senha para o uso da rede.</p>
                    </li>
                    <li className={styles.highlights}>
                        <h3>CADEIRA DE RODAS E PNE</h3>
                        <p>Para melhor atender nossos clientes portadores de necessidades especiais, contamos com cadeiras de rodas para empréstimo. Elas estão disponíveis no Hall de Entrada, para o empréstimo é necessário dirigir-se ao porteiro e deixar um documento de identificação.</p>
                    </li>
                    <li className={styles.highlights}>
                        <h3>BANCO 24 HORAS</h3>
                        <p>O Valentin Shopping Center dispõe de caixa eletrônico 24 horas, localizado no 3°andar, comodidade e segurança para realização de serviços bancários.</p>
                    </li>
                    <li className={styles.highlights}>
                        <h3>BANHEIRO FAMÍLIA COM FRALDÁRIO</h3>
                        <p>Para facilitar o acompanhamento ao banheiro dos filhos pelos pais, sem constrangimento, oferecemos o Banheiro família com fraldário. Localizado no 2° andar, é um espaço planejado, juntamente com o banheiro família. </p>
                    </li>
                    <li className={styles.highlights}>
                        <h3>ESTACIONAMENTO</h3>
                        <li>Até 30 minutos - R$ 5,00</li>
                        <li>De 30 min até 01 hora - R$ 11,002ª,3ª e 4ª hora - Sem valores adicionais (R$11,00)</li>
                        <li>Após a 4ª hora - Adicional de R$ 2,00 a cada 30 minutos.</li>
                        <li>Taxa de Pernoite: R$ 15,00</li>
                    </li>
                </ul>
                
            </section>
            <section className={`${styles.section} ${styles.cine}`}>
                <h2>Cinema</h2>
                <p>A praça de alimentação reúne os mais variados cardápios para suas refeições, tudo em um ambiente moderno e descontraído.</p>
                <Link href="/[slug]" as="/cinema">
                <a className={styles.btn} ><p>Filmes em cartaz</p></a>
                </Link>
            </section>
            

        </Layout>
    )
}


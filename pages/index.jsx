import Layout from '../components/Layout'
import styles from '../components/Home.module.css'
import Link from 'next/link'



export default function Index() {

    return (
        
        <Layout pageTitle="Valentin Shopping Center" >

            <section className={`${styles.section} ${styles.banner}`}>
                <h2>Seja bem-vindo!</h2>
                
                <video autoPlay loop muted className={styles.videoBg} >
                    <source src="/video/home@2x.webm" type="video/webm" />
                    <source src="/video/home@2x.mp4" type="video/mp4" />
                </video>
            </section>

            <section className={`${styles.section} ${styles.shop}`}>
                <h2>Conheça nossas lojas</h2>
                <img className={styles.storie} alt="Mulher olhando a vitrine de uma loja" src="/images/photos/shop-home.svg"/>
                <p>O Valentin Shopping Center dispõe de mais de 100 lojas dos mais diversos segmentos. Acesse o nosso guia e conheça!</p>
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
                        <img alt="Wifi livre" src="/images/photos/wifi.svg"/>
                        {/* <h3>WIRELESS</h3> */}
                        <p>Disponibilizamos gratuitamente uma rede de internet wireless, rápida e ampla, localizada na praça de alimentação. O acesso é bem simples, o cliente precisa identificar a rede “Valentin”, selecioná-la e fazer o acesso, não há necessidade de senha para o uso da rede.</p>
                    </li>
                    <li className={styles.highlights}>
                        <img alt="Cadeira de rodas e PNE" src="/images/photos/cadeirante.svg"/>

                        {/* <h3>CADEIRA DE RODAS E PNE</h3> */}
                        <p>Para melhor atender nossos clientes portadores de necessidades especiais, contamos com cadeiras de rodas para empréstimo. Elas estão disponíveis no Hall de Entrada, para o empréstimo é necessário dirigir-se ao porteiro e deixar um documento de identificação.</p>
                    </li>
                    
                    <li className={styles.highlights}>
                        <img alt="Estacionamento" src="/images/photos/parking.svg"/>

                        {/* <h3>ESTACIONAMENTO</h3> */}
                        <div className={styles.parking}>
                            <p>• Até 30 minutos - R$ 5,00</p>
                            <p>• De 30 min até 01 hora - R$ 11,00</p>
                            <p>• 2ª,3ª e 4ª hora - Sem valores adicionais (R$11,00)</p>
                            <p>• Após a 4ª hora - Adicional de R$ 2,00 a cada 30 minutos.</p>
                            <p>• Taxa de Pernoite: R$ 15,00</p>
                        </div>
                        
                    </li>
                    <li className={styles.highlights}> 
                        <img alt="Banheiro Família com fraldário" src="/images/photos/bebe-bathroom.svg"/>

                        {/* <h3>BANHEIRO FAMÍLIA COM FRALDÁRIO</h3> */}
                        <p>Para facilitar o acompanhamento ao banheiro dos filhos pelos pais, sem constrangimento, oferecemos o Banheiro família com fraldário. Localizado no 2° andar, é um espaço planejado, juntamente com o banheiro família. </p>
                    </li>
                    <li className={styles.highlights}>
                        <img  className={styles.bank} alt="Logo do Banco 24 horas" src="/images/photos/banco.png"/>
                        {/* <h3>BANCO 24 HORAS</h3> */}
                        <p>O Valentin Shopping Center dispõe de caixa eletrônico 24 horas, localizado no 3°andar, comodidade e segurança para realização de serviços bancários.</p>
                    </li>
                </ul>
                
            </section>
            <section className={`${styles.section} ${styles.cine}`}>
                <h2>Cinema</h2>
                <img alt="Logo do Cinemark" src="/images/photos/cinemark.svg"/>
                <p>Viva a melhor experiência em assistir um filme. Cinemark é a maior rede de cinemas multiplex do Brasil. Confira aqui a programação de cinema.</p>
                <Link href="/[slug]" as="/cinema">
                <a className={styles.btn} ><p>Filmes em cartaz</p></a>
                </Link>
            </section>
            

        </Layout>
    )
}


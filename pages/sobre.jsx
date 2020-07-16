import Layout from '../components/Layout'
import styles from '../components/About.module.css'
//import Link from 'next/link';



export default function About() {

    return (
        
        <Layout pageTitle="Valentin Shopping Center" >
            <header className={`${styles.pageHeader} ${styles.shops}`}>
                <div className={styles.title} >
                    <h1>o Shopping</h1>
                </div>
            </header>
            <section className={styles.about}>
                <h2>Estamos de portas abertas esperando por você</h2>
                <img className={styles.storie} alt="Casal olhando uma vitrine" src="/images/photos/sobre.svg"/>
                <p>Sua localização estratégica, próximo ao centro da cidade, permite fácil acesso da população, já que possui estacionamento próprio e é bem servido pelo transporte público. Com amplas e modernas instalações, o <strong>Valentin Shopping Center</strong> oferece ótimas oportunidades de compras, lazer e entretenimento. Sua infraestrutura completa, disposta em três pavimentos, oferece grande variedade de lojas e marcas, além do cinema 3D, praça de alimentação com internet wireless, playground e serviços.</p>

                <p>Venha fazer parte desta realidade na região central do Rio Grande do Sul. O Royal Plaza Shopping está de coração e portas abertas esperando por você.</p>

                <h2>Nossa Estrutura</h2>
                <img className={styles.photo} alt="Foto da parte interna do Shopping" src="/images/photos/estrutura.png"/>
                <ul>
                    <li>40.808m² (área construída) distribuídos em 3 pavimentos.</li>
                    <li>3 elevadores sociais de acesso aos 3 andares de lojas e também aos 4 andares de estacionamento, 2 elevadores de serviço e 4 escadas rolantes bem localizadas que interligam os andares de loja, mais 2 elevadores panorâmicos.</li>
                    <li>Estacionamento amplo e de fácil acesso, totalmente coberto e com capacidade para mais de 600 vagas rotativas.</li>
                </ul>
                

                
                <div className={styles.row}>
                    <div className={styles.highlights}>
                        <h3>Área Bruta Locável</h3>
                        <p>13.012m²</p>
                    </div>
                    <div className={styles.highlights}>
                        <h3>Área construída</h3>
                        <p>40.808m²</p>
                    </div>
                    <div className={styles.highlights}>
                        <h3>Estacionamento</h3>
                        <p>600 vagas</p>
                    </div>
                    <div className={styles.highlights}>
                        <h3>Número de lojas</h3>
                        <p>115 lojas</p>
                    </div>
                </div>
                <ul>
                <li>Qualificados e eficientes sistemas de segurança e limpeza, que garantem a tranquilidade e bem-estar de todos nas dependências do Shopping.</li>
                    <li>O mais moderno sistema de iluminação e climatização, garantindo um baixo custo de condomínio, através de sistemas automatizados.</li>
                    <li>Localizado em um bairro nobre e em constante expansão, de fácil acesso e à 250m do centro jurídico regional.</li>
                </ul>
            
            </section>
            

        </Layout>
    )
}
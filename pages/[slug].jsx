import Layout from '../components/Layout'
import styles from '../components/Slug.module.css'
import serverUrl from '../utils/env'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'




export default function Slug(props) {
    //console.log("Props", props)
    const shops = props.data
    //console.log("shops", shops)
    const [lastVisibleShops, setLastVisibleShops] = useState(props.data.map((shop, i) => false))
    const [visibleShops, setVisibleShops] = useState()


    return (
        
        <Layout pageTitle="Valentin Shopping Center" >
            
            
            
            
            { props.alimentacao && 
                <>
                    <header className={`${styles.pageHeader} ${styles.food}`}>
                        <div className={styles.title} >
                            <h1>Alimentação</h1>
                        </div>
                    </header>
                    <section className={styles.shopList}>
                        <h2>O melhor da gastronomia está no Valentin Shopping Center</h2>
                        <img className={styles.storieLeft} alt="Homem em uma mesa tomando vinho e comendo" src="/images/photos/food.svg"/>
                        <ul className={styles.ulList}>
                            {shops.map((shop, i) => (
                                <li key={`liShop${i}`} >
                                    <Link href='/shop/[shopId]/[shop]' as={`/shop/${shop.id}/${shop.name.replace(' ', '-').toLowerCase()}`}  >
                                        <a className={`${styles.shop} shopBg`} title={shop.name} >
                                            <span className={styles.shopName} >{shop.name}</span>
                                            <style jsx>{`
                                                    .shopBg {
                                                        background-image: url(${`   ${serverUrl}/admin/shops/${shop.id}/photo`}); 
                                                    }
                                            `}</style>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <img className={styles.storie} alt="Casal feliz jantando na praça de alimentação" src="/images/photos/food2.svg"/>
                    </section>
                </>
                
            }

            { props.lojas && 
                <>
                    <header className={`${styles.pageHeader} ${styles.shops}`}>
                        <div className={styles.title} >
                            <h1>Lojas</h1>
                        </div>
                    </header>
                    <section className={styles.shopList}>
                        <h2>Para todos os estilos e todas as idades!</h2>
                        <img className={styles.storieLeft} alt="Mulher olhando as vitrines do Shopping" src="/images/photos/lojas2.svg"/>
                        <ul className={styles.ulList}>
                            {shops.map((shop, i) => (
                                
                                <li key={`liShop${i}`} >
                                    <Link href='/shop/[shopId]/[shop]' as={`/shop/${shop.id}/${shop.name.replace(' ', '-').toLowerCase()}`}  >
                                        <a className={`${styles.shop} shopBg`} title={shop.name} >
                                            <span className={styles.shopName} >{shop.name}</span>
                                            <style jsx>{`
                                                    .shopBg {
                                                        background-image: url(${`   ${serverUrl}/admin/shops/${shop.id}/photo`}); 
                                                    }
                                            `}</style>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <img className={styles.storie} alt="Mulher feliz por estar fazendo compras" src="/images/photos/lojas.svg"/>
                    </section>
                </>
                
            }

            { props.cinema && 
                <>
                <header className={`${styles.pageHeader} ${styles.cinema}`}>
                    <div className={styles.title} >
                        <h1>Cinema</h1>
                    </div>
                </header>
                
                <section className={styles.shopList}>
                        <img className={styles.storieLeft} alt="Jovens felizes assistindo um filme e comendo pipoca" src="/images/photos/cinema.svg"/>
                        <ul className={`${styles.ulList} ${styles.ulCinema}`}>
                            {shops.map((shop, i) => (
                                
                                <li key={`liShop${i}`} >
                                    
                                    <div className={`${styles.posterContent}`} title={shop.name} >
                                            <div className={styles.details} >
                                                <div className={styles.detailsMain}>
                                                    { shop.category && <div className={styles.detailsCategory}>
                                                        <p className={styles.movieCategory}>{shop.category}</p>
                                                        {shop.sub_category && 
                                                            <p className={styles.movieSubCategory}>{shop.sub_category}
                                                        </p> }
                                                    </div> }
                                                    
                                                    {shop.description && <>
                                                        <p className={styles.movieLabel} >Sinopse:</p>
                                                        <p className={styles.sinopse}>{shop.description}</p> 
                                                    </>}
                                                </div>

                                                { shop.age && <p className={`${styles.age} cor${shop.age}`} >
                                                { shop.age == 1 ? 'L' :
                                                    shop.age == 2 ? '12' :
                                                    shop.age == 3 ? '14' :
                                                        shop.age == 4 ? '16' :
                                                        shop.age == 5 ? '+18' : "erro"}
                                                    <style jsx>{`
                                                        .cor1 {
                                                            background-color: #00BB22; 
                                                        }
                                                        .cor2 {
                                                            background-color: #EDCB0C;                                                            
                                                        }
                                                        .cor3 {
                                                            background-color: #F6962D;                                                            
                                                        }
                                                        .cor4 {
                                                            background-color: #DD021C;                                                            
                                                        }
                                                        .cor5 {
                                                            background-color: #000000;                                                            
                                                        }
                                                    `}</style>
                                                </p> }
                                                
                                                { shop.language != null && 
                                                <div className={styles.language}>
                                                    <p>
                                                        {shop.language == 0 ? "Legendado" : 
                                                        shop.language == 1 ? "Dublado" :
                                                        shop.language == 2 ? "Dublado/Legendado" :
                                                        shop.language == 3 ? "Português" : null}
                                                    </p> 
                                                </div> }
                                            </div>
                                            <img className={styles.poster} src={`${serverUrl}/admin/cinema/${shop.id}/photo`} />
                                            <span className={`${styles.shopName} ${styles.cinemaName}`} >{shop.name}</span>
                                            
                                    </div>
                                   
                                </li>
                            ))}
                        </ul>
                        <img className={styles.storie} alt="Casal assistindo juntos a um filme no cinema" src="/images/photos/cinema2.svg"/>
                    </section>
                </>
                
            }

            { props.err &&
                <div className="error" >
                    <img alt="Não encontramos a página procurada" src="/images/photos/404.svg"/>
                    <h1>Está página não existe!</h1>
                </div>
            }

            
            
            
    
        </Layout>
    )
}

Slug.getInitialProps = async ({query}) =>{

        

    const { slug } = query
    let res
    let data = []
    let err = false
    let lojas = false
    let alimentacao = false
    let cinema = false
    

    switch(slug) {
        case "lojas":
            
            try{ res = await axios.get(`${serverUrl}/admin/shops/where/lojas`)
                //console.log("RES shops", res.data)
                data = res.data
            }catch(err){ res = [] 
                console.log("Deu ruim shops")
                
            }
            
            lojas = true
            break
        case "alimentacao":
            
            try{ res = await axios.get(`${serverUrl}/admin/shops/where/${slug}`)
                //console.log("RES shops", res.data)
                data = res.data
            }catch(err){ res = [] 
                console.log("Deu ruim shops")
                
            }
            alimentacao = true
            break
        case "cinema":
            
            try{ res = await axios.get(`${serverUrl}/admin/cinema/where/all`)
                //console.log("RES shops", res.data)
                data = res.data
            }catch(err){ res = [] 
                console.log("Deu ruim shops")
                
            }
            cinema = true
            break
        default:
            err = true
            break
    }
    

        return {
            "data": data,
            "slug": slug,
            "err" : err,
            "lojas" : lojas,
            "alimentacao" : alimentacao,
            "cinema" : cinema
        }
}


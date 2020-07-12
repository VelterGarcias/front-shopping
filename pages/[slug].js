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
                        <img className={styles.storie} alt="Casal assistindo juntos a um filme no cinema" src="/images/photos/cinema2.svg"/>
                    </section>
                </>
                
            }

            { props.err &&
                <h1>Está página não existe!</h1>
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
            
            try{ res = await axios.get(`${serverUrl}/admin/shops/where/all`)
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


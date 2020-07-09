import Layout from '../components/Layout'
import styles from '../components/Slug.module.css'
import serverUrl from '../utils/env'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'




export default function Slug(props) {
    console.log("Props", props)
    const shops = props.data
    console.log("shops", shops)
    const [lastVisibleShops, setLastVisibleShops] = useState(props.data.map((shop, i) => false))
    const [visibleShops, setVisibleShops] = useState()


    return (
        
        <Layout pageTitle="Shopping" >
            
            
            
            
            { props.alimentacao && 
                <>
                <p>Alimentos</p>
                <section className={styles.messageList}>
                        <ul className={styles.ulList}>
                            {shops.map((shop, i) => (
                                
                                    <li className="shop" key={`liShop${i}`} >
                                        
                                        <h1>{shop.name}</h1>
                                        {/* <p>email: {shop.admin_mail}</p>
                                        <p>phone: {shop.phone}</p>
                                        <p>whatsapp: <a href={shop.whatsapp} >{shop.whatsapp}</a></p>
                                        <p>isOnline: {shop.isOnline}</p> */}
                                        {/* <img  src={`${serverUrl}/admin/shops/${shop.id}/photo/1`} srcSet="/images/default_image.svg" /> */}
                                        
                                        <style jsx>{`
                                            .shop {
                                                background-image: url(${`   ${serverUrl}/admin/shops/${shop.id}/photo`});
                                                background-size: contain;
                                                background-repeat: no-repeat; 
                                                background-position: center; 
                                            }
                                        `}</style>
                                    </li>
                            ))}
                        </ul>

                    </section>
                </>
                
            }

            { props.lojas && 
                <>
                    <p>Lojas</p>
                    <section className={styles.messageList}>
                        <ul className={styles.ulList}>
                            {shops.map((shop, i) => (
                                
                                    <li className="shop" key={`liShop${i}`} >
                                        <h1>{shop.name}</h1>
                                        {/* <p>email: {shop.admin_mail}</p>
                                        <p>phone: {shop.phone}</p>
                                        <p>whatsapp: <a href={shop.whatsapp} >{shop.whatsapp}</a></p>
                                        <p>isOnline: {shop.isOnline}</p> */}
                                        <style jsx>{`
                                            .shop {
                                                background-image: url(${serverUrl}/admin/shops/${shop.id}/photo);
                                                background-size: contain;
                                                background-repeat: no-repeat; 
                                                background-position: center;  
                                            }
                                        `}</style>
                                    </li>
                            ))}
                        </ul>

                    </section>
                </>
                
            }

            { props.cinema && 
                <>
                <p>Cinema</p>
                <section className={styles.messageList}>
                        <ul className={styles.ulList}>
                            {shops.map((shop, i) => (
                                
                                    <li key={`liShop${i}`} >
                                        <h1>{shop.name}</h1>
                                        {/* <p>email: {shop.admin_mail}</p>
                                        <p>phone: {shop.phone}</p>
                                        <p>whatsapp: <a href={shop.whatsapp} >{shop.whatsapp}</a></p>
                                        <p>isOnline: {shop.isOnline}</p> */}
                                    </li>
                            ))}
                        </ul>

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
            
            try{ res = await axios.get(`${serverUrl}/admin/shops/where/loja`)
                console.log("RES shops", res.data)
                data = res.data
            }catch(err){ res = [] 
                console.log("Deu ruim shops")
                
            }
            
            lojas = true
            break
        case "alimentacao":
            
            try{ res = await axios.get(`${serverUrl}/admin/shops/where/${slug}`)
                console.log("RES shops", res.data)
                data = res.data
            }catch(err){ res = [] 
                console.log("Deu ruim shops")
                
            }
            alimentacao = true
            break
        case "cinema":
            
            try{ res = await axios.get(`${serverUrl}/admin/shops`)
                console.log("RES shops", res.data)
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


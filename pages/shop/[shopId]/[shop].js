import Layout from '../../../components/Layout'
import styles from '../../../components/Shop.module.css'
import serverUrl from '../../../utils/env'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'

//import Link from 'next/link';



export default function Shop(props) {
    //console.log("Props", props)
    const shop  = props.data
    let socialBanner = false
    if (shop.whatsapp || shop.facebook || shop.instagram) {
        socialBanner = true
    }
    console.log("shop", shop)
    return (
        
        <Layout pageTitle="Valentin Shopping Center" >
            <header className={`${styles.pageHeader} ${styles.food}`}>
                    <div className={styles.title} >
                        <h1>{shop.category}</h1>
                    </div>
            </header>
            <section className={styles.main} >
                <div className={styles.logo}>
                    <div className={`${styles.shop} shopBg`} title={shop.name} >
                    <style jsx>{`
                                    .shopBg {
                                        background-image: url(${`${serverUrl}/admin/shops/${shop.id}/photo`}); 
                                    }
                    `}</style>
                    </div>
                </div>
                <ul className={styles.content}>
                    <li>
                        <h2 className={styles.shopName} >{shop.name}</h2>
                    </li>
                    { shop.description && <li>
                        <p className={styles.description}>{shop.description}</p> 
                    </li>}
                    { shop.adress && <li>
                        <img src="/images/social/maps.svg"/>
                        <p>{shop.adress}</p> 
                    </li> }
                    { shop.phone && <li>
                        <a title="Telefone Fixo" href={`tel:${shop.phone}`} target="_blank">
                            <img src="/images/social/phone.svg"/>
                            <p>{shop.phone}</p>
                        </a>
                    </li> }
                    { shop.smartphone && <li>
                        <a title="Celular" href={`tel:${shop.smartphone}`} target="_blank">
                            <img src="/images/social/smartphone.svg"/>
                            <p>{shop.smartphone}</p>
                        </a>
                    </li> }
                    { shop.website && <li>
                        <a title="Site" href={shop.website} target="_blank">
                            <img src="/images/social/website.svg"/>
                            <p>{shop.website.split('//')[1]}</p>
                        </a>
                    </li> }
                    { socialBanner && 
                    <li className={styles.liSocial}>
                        <img alt="Veja nossas redes sociais!" src="/images/photos/shop.svg"/>
                        <div className={styles.social}>
                            { shop.whatsapp && 
                                <a title="WhatsApp" href={shop.whatsapp} target="_blank"><img src="/images/social/whatsapp.svg"/></a>
                            }
                            { shop.facebook &&
                                <a title="Facebook" href={shop.facebook} target="_blank"><img src="/images/social/facebook.svg"/></a>
                            }
                            { shop.instagram &&
                                <a title="Instagram" href={shop.instagram} target="_blank"><img src="/images/social/instagram.svg"/></a>
                            }
                        </div>
                    </li> }
                    { shop.photo1 && <>
                        <li className={styles.title}>
                            <h3>Veja algumas fotos nossas</h3>
                        </li>
                        <li>
                            <img className={styles.shopPhoto} src={`${serverUrl}/admin/shops/${shop.id}/photo/1`}/>
                        </li> </> }
                    { shop.photo2 && <li>
                        <img className={styles.shopPhoto} src={`${serverUrl}/admin/shops/${shop.id}/photo/2`}/>
                         
                    </li> }
                    { shop.photo3 && <li>
                        <img className={styles.shopPhoto} src={`${serverUrl}/admin/shops/${shop.id}/photo/3`}/>
                         
                    </li> }
                    { shop.photo4 && <li>
                        <img className={styles.shopPhoto} src={`${serverUrl}/admin/shops/${shop.id}/photo/4`}/>
                         
                    </li> }
                    { shop.photo5 && <li>
                        <img className={styles.shopPhoto} src={`${serverUrl}/admin/shops/${shop.id}/photo/5`}/>
                         
                    </li> }
                    { shop.photo6 && <li>
                        <img className={styles.shopPhoto} src={`${serverUrl}/admin/shops/${shop.id}/photo/6`}/>
                         
                    </li> }
                    

                </ul>
            </section>         

        </Layout>
    )
}

Shop.getInitialProps = async ({query}) =>{

        
    //console.log(query)
    const { shop, shopId } = query
    console.log("shop", shop, "shopId", shopId)
    let res
    let data = []
    let err = false

    
            try{ res = await axios.get(`${serverUrl}/admin/shops/${shopId}`)
                //console.log("RES shops", res.data)
                data = res.data
            }catch(err){ res = [] 
                console.log("Deu ruim shops lojas")  
                err= true
            }
            

        return {
            "data": data,
            "shopPath": shop,
            "err" : err
        }
}
import Layout from '../../../components/Layout'

import serverUrl from '../../../utils/env'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'

//import Link from 'next/link';



export default function Shop(props) {
    console.log("Props", props)

    return (
        
        <Layout pageTitle="Shopping" >

            
            <h1>path: {props.shopPath}</h1>
            <h1>path: {props.data.id}</h1>
            <h1>path: {props.data.name}</h1>
            

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
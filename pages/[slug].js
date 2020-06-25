import Layout from '../components/Layout'
import { useRouter } from 'next/router'




export default function Slug(props) {


    return (
        
        <Layout pageTitle="Shopping" >
            
            
            
            
            { props.alimentacao && 
                <>
                <p>Alimentos</p>
                <input type="text" />
                </>
                
            }

            { props.lojas && 
                <>
                <p>Lojas</p>
                
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
    let data = []
    let err = false
    let lojas = false
    let alimentacao = false
    

    switch(slug) {
        case "lojas":
            data = "lojas-ok"
            lojas = true
            break
        case "alimentacao":
            data = "alimentacao-ok"
            alimentacao = true
            break
        case "login":
            data = "login-ok"
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
            "alimentacao" : alimentacao
        }
}


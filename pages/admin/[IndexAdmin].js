import Layout from '../../components/Layout'
import { useRouter } from 'next/router'




export default function IndexAdmin(props) {


    return (
        
        <Layout pageTitle="Shopping" >
            
            
            
            
            { props.admin && 
                <>
                <p>Administrador</p>
                <input type="text" />
                </>
                
            }

            { props.users && 
                <>
                <p>Lojista</p>
                
                </>
                
            }

            { props.err &&
                <h1>Admin - Está página não existe!</h1>
            }

            
            
            
    
        </Layout>
    )
}

IndexAdmin.getInitialProps = async ({query}) =>{

        

    const { IndexAdmin } = query
    let data = []
    let err = false
    let admin = false
    let users = false

    

    switch(IndexAdmin) {
        case "admin":
            data = "Administrador-ok"
            admin = true
            break
        case "lojista":
            data = "Lojista-ok"
            users = true
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
            "IndexAdmin": IndexAdmin,
            "err" : err,
            "admin" : admin,
            "users" : users
        }
}


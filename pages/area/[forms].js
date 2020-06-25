import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link';



export default function Forms(props) {
    

    const router = useRouter()


    return (
        
        <Layout pageTitle="Shopping" >

            
            <h1>Slug: {props.forms  }</h1>

            { props.login && 
                <>
                    <hr />
                    <Link href="/area/[forms]" as="/area/cadastro">
                        <a><h3>Registre-se</h3></a>
                    </Link>

                    <hr />
                
                    <Link href="/admin/[IndexAdmin]" as="/admin/admin">
                        <a><h3>Admin - Admin</h3></a>
                    </Link>

                    <hr />
                
                    <Link href="/admin/[IndexAdmin]" as="/admin/lojista">
                        <a><h3>Admin - Lojista</h3></a>
                    </Link>
                </>
            }
            

        </Layout>
    )
}

export async function getStaticPaths() {
    return {
      // Only `/posts/1` and `/posts/2` are generated at build time
      paths: [{ params: { forms: 'login' } }, { params: { forms: 'cadastro' } }],
      // Enable statically generating additional pages
      // For example: `/posts/3`
      fallback: false,
    }
  }


export async function getStaticProps({params}) {
    //console.log(params)
    const { forms } = params
    let data = []
    let err = false
    let login = false
    let cadastro = false
    

    switch(forms) {
        case "login":
            data = "lojas-ok"
            login = true
            break
        case "cadastro":
            data = "alimentacao-ok"
            cadastro = true
            break
        default:
            err = true
            break
    }

    return {
        props : {
            "data": data,
            "forms": forms,
            "err" : err,
            "login" : login,
            "cadastro" : cadastro
        }
    }
  }

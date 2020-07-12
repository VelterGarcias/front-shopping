import Layout from '../components/Layout'

import Link from 'next/link'



export default function Index() {

    return (
        
        <Layout pageTitle="Valentin Shopping Center" >

            
            <h1>Index</h1>
            
            <Link href="/[slug]" as="/post">
                <a><h3>Erro</h3></a>
            </Link>
            

        </Layout>
    )
}


import Layout from '../components/Layout'

export default function Error() {

    return (
        
        <Layout pageTitle="Valentin Shopping Center" >
            <div className="error" >
                <img alt="Não encontramos a página procurada" src="/images/photos/404.svg"/>
                <h1>Está página não existe!</h1>
            </div>
        </Layout>
    )
}
//Nesse caso nem precisou criar como um array, já que o objetivo é apenas criar um array

const LinkItem = [
    {id:1, link:'/', label: 'Home'},
    {id:2, link:'/[slug]', as:'/lojas', label: 'Lojas'},
    {id:3, link:'/[slug]', as:'/alimentacao', label: 'Alimentação'},
    {id:4, link:'/area/[forms]', as:'/area/contato', label: 'Contato'},
    {id:5, link:'/sobre', label: 'O Shopping'}
]

export default LinkItem
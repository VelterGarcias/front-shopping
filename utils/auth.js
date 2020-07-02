import axios from 'axios'
import Router from 'next/router'
import { Cookies } from 'react-cookie'
import serverUrl from './env'

const cookies = new Cookies()

export async function handleAuthSSR(ctx) {
    
    //console.log(ctx)
    let token = null
    let user = null
    if(ctx?.req?.headers?.cookie) {
        token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //console.log("if", token)
    
    } else {
        token = cookies.get('token')
        //console.log("else", token)
    }
    try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const resp = await axios.get(serverUrl + '/auths/profile', config)
        user = resp.data
    } catch (err) {
        if (ctx.res) {
            //console.log("if-erro", err)
            ctx.res.writeHead(302, { Location: '/area/login' })
            ctx.res.end()
        } else {
            //console.log("else-erro", err)
            Router.push('/area/login')
        }
    }

    return user
}
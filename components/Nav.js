import styles from './Header.module.css'
import LinkItem from './LinkItem'
import Link from 'next/link'
import React from 'react'

export default function Nav(props) {

    const LinkMenu = (itens) => (
        <li>
            <Link href={itens.link} as={itens.as}>
                <a title={itens.label}>{itens.label}</a>
            </Link>
        </li>
    )


    return (
        <nav className={`${styles.menu} ${styles[props.isOpen]}`}>
            <div>
                <ul>
                    {  LinkItem.map(item => (
                        <LinkMenu key={item.id} link={item.link} label={item.label} as={item.as} />
                    ))
                    }
                </ul>
            </div>
            <Link href="/area/[forms]" as="/area/login" >
                <a title="Login" className={styles['btn-register']}>
                    Login
                </a>
            </Link>        

        </nav>
    )
}
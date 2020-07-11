import styles from './Footer.module.css';
import LinkItem from './LinkItem';
import Link from 'next/link';
import React from 'react';

export default function Footer(){

    const LinkMenu = (itens) => (
        <li>
            <Link href={itens.link} as={itens.as}>
                <a title={itens.label}>{itens.label}</a>
            </Link>
        </li>
    )

    return(
            <footer id={styles.footer}>
                <button type="button">
                    <img src="/images/icon-arrow-up.svg" alt="up" />
                </button>
                <div className={styles.columns}>
                    <div>
                        <ul className={styles.links}>
                            <li className={styles.title}>Links</li>
                            {  LinkItem.map(item => (
                                <LinkMenu key={item.id} link={item.link} label={item.label} as={item.as} />
                             ))
                            }
                        </ul>
                        <ul>
                            <li className={styles.title}>Contato</li>
                            <li>E-mail: support@ferrari.it</li>
                            <li className={styles.social}>
                                <a href="#"><img src="/images/social/facebook.svg" alt="Facebook"/></a>
                                <a href="#"><img src="/images/social/whatsapp.svg" alt="Whatsapp"/></a>
                                <a href="#"><img src="/images/social/youtube.svg" alt="YouTube"/></a>
                                <a href="#"><img src="/images/social/instagram.svg" alt="Instagram"/></a>
                            </li>
                        </ul>
                    </div>
                    <a href="/"><img src="/images/logo.svg" alt="Logo" className={styles.logo} /></a>
                </div>
                <p>2020 © Velter Garcias. All rights reserved.</p>
            </footer>
    )
}
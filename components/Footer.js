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
                <button title="Voltar ao topo" type="button" >
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
                            <li className={styles.title}>Fale conosco</li>
                            <li className={styles.contact}>
                                <p>E-mail: </p><a href="mailto: contato@valentinshopping.com"> contato@valentinshopping.com </a>
                            </li>
                            <li className={styles.contact}>
                            <p>Endereço:</p> <a href="https://goo.gl/maps/w7w3XC51RU2jtnHo8"> Rua Pedro Koff, 717 - Bento Gonçalves, RS</a>
                            </li>
                            
                            <li className={styles.social}>
                                <a title="Whatsapp" href="https://wa.me/5554984038507"><img src="/images/social/whatsapp.svg" alt="Whatsapp"/></a>
                                <a title="Telefone" href="tel:+5554984038507"><img src="/images/social/phone.svg" alt="Telefone"/></a>
                                <a title="Facebook" href="https://www.facebook.com/weads.marketing"><img src="/images/social/facebook.svg" alt="Facebook"/></a>
                                <a title="Instagram" href="https://www.instagram.com/weads.marketing/"><img src="/images/social/instagram.svg" alt="Instagram"/></a>
                            </li>
                        </ul>
                    </div>
                    <Link href="/">
                        <a title="Valentini Shopping Center"><img src="/images/logo.svg" alt="Logo" className={styles.logo} /></a>
                    </Link>
                </div>
                <p className={styles.rights} >2020 © Velter Garcias. All rights reserved.</p>
                <Link href="/privacy" >
                        <a className={styles.privacy} title="Valentini Shopping Center">Política de privacidade</a>
                </Link>
            </footer>
    )
}
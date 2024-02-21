import styles from './Logo.module.scss'
import Link from 'next/link'

export default function Logo() {
    return (
        <div className={` ${styles.logo} `}>
            <Link href="/">
                <div className='d-flex justify-content-center align-items-center ' >
                    <span type='button'>
                        <img src="/LOGO_01.png" alt="logo" className='' />
                    </span>
                </div>
            </Link>
        </div>
    )
}
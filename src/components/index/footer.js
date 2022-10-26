import Head from 'next/head'
import styles from '../../styles/index.module.css'


export default function home_footer_component() {
  return (
	 <footer className={styles.footer}>

        <a href="#" className={styles.dimmed}> 
          About Us 
        </a>

        <a href="https://eventsjoy.co" target="_blank" rel="noopener noreferrer">
          <img src="/eventsjoy_logo.svg" alt="Vercel Logo" className={styles.logo} />
          Eventsjoy
        </a>

        <a href="#" id="last" className={styles.dimmed}> 
          Contact Us 
        </a>

      </footer>
  )
}

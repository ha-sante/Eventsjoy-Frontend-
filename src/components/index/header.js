import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../utils/routes'

import styles from '../../styles/index.module.css'

import { Button, Heading, Pane, Avatar, Spinner } from 'evergreen-ui'

import { signIn, signOut, useSession } from 'next-auth/client'


export default function home_header_component() {

  const [session, loading] = useSession()

  return (
  	<header className={styles.header} >

      <Head>
        <title> Eventsjoy - Join the social events platform </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Pane 
      	display="flex" 
      	width="100%" 
      	height="100%" 
      	justifyContent="between"
      	className="d-flex align-items-center" 
      	padding={20}
      	>

        	<Pane width="50%" >

            <Link href={RoutesCollection.home} >
                <a>
                 <Heading size={700} > 
                    <img src="/eventsjoy_logo.svg" alt="Eventsjoy Logo" className={styles.logo} />
                    Eventsjoy 
                  </Heading>
                </a>
            </Link>
    	     
        	</Pane>

        	<Pane 
    	      width="50%" 
    	      display="flex"
      		  alignItems="right"
      		  justifyContent="flex-end">

          <Link href={RoutesCollection.create_event} >
    	      <Button appearance="primary" intent="success" > Create Event </Button>
           </Link>

             {
               session ?
                 <Link href={RoutesCollection.dashboard} >
                      <Avatar 
                        isSolid
                        name={session.user.email} 
                        size={35} 
                        marginLeft={20} />
                 </Link>
                :
                 <Link href={RoutesCollection.login} >
                  <Button 
                    marginLeft={20} 
                    appearance="primary" 
                    intent="none"> 
                    Login 
                  </Button>
                </Link>
             }


        </Pane>


      </Pane>

    </header>
  )
}

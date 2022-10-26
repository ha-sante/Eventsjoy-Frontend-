import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../utils/routes'

import dashboardStyles from '../../../styles/dashboard.module.css'
import styles from '../../../styles/index.module.css'

import { Button, Heading, Pane, Paragraph } from 'evergreen-ui'


export default function home_header_component(props) {
  return (
  	<header className={dashboardStyles.header} >

      <Head>
        <title> Eventsjoy - Join the social events platform </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Pane 
      	display="flex" 
      	width="100%" 
      	height="100%" 
      	justifyContent="space-between"
      	className="d-flex align-items-center" 
      	padding={20}
        background="#1e0a3c"
      	>

        	<Pane display="flex">

            <Link href={RoutesCollection.home} >
                <a>
                 <Heading size={700} color="white"> 
                    <img src="/eventsjoy_logo.svg" alt="Eventsjoy Logo" className={styles.logo} />
                    Eventsjoy 
                  </Heading>
                </a>
            </Link>


            <Pane 
              marginLeft={40}
              className="d-flex align-items-center" 
              display="flex">

              <Link href={RoutesCollection.dashboard} >
                <a>
                  <Paragraph 
                    color="white" 
                    size={400} 
                    marginLeft={20}
                    marginRight={20}> 
                    Events
                  </Paragraph> 
                </a>
              </Link>

              <Link href={RoutesCollection.dashboard} >
                <a>     
                <Paragraph 
                  color="white" 
                  size={400} 
                  marginRight={20}> 
                  Update Attendees
                </Paragraph> 
                </a>
              </Link>

              <Link href={RoutesCollection.dashboard} >
                <a>   
                  <Paragraph color="white" size={400}> 
                  Payments 
                  </Paragraph> 
                </a>
              </Link>

            </Pane>

    	     
        	</Pane>

        

        	<Pane 
  	      display="flex"
    		  alignItems="right"
    		  justifyContent="flex-end"
      		>

            <Link href={RoutesCollection.create_event} >
      	      <Button appearance="primary" intent="success" > Create Event </Button>
             </Link>

             {
               props.session?
                <Button 
                  marginLeft={20} 
                  appearance="primary" 
                  intent="none"
                  onClick={ ()=> props.signOut() }> 
                  Logout 
                </Button>
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

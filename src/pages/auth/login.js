import Head from 'next/head'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import RoutesCollection from '../../utils/routes'

import IndexHeader from '../../components/index/header'
import IndexFooter from '../../components/index/footer'

import authStyles from '../../styles/auth.module.css'
import styles from '../../styles/index.module.css'

import Helpers from '../../utils/helpers'

import { 
  Button, 
  Heading, 
  Pane, 
  TextInput,
  Paragraph,
  Spinner
} from 'evergreen-ui'


import { 
  ArrowRightIcon
} from 'evergreen-ui'




export default function auth_login() {

  const router = useRouter()
  const [session, loading] = useSession()
  const [getUserEmail, setUserEmail] = useState("");

  useEffect(() => {

    if(window.location.hostname === "localhost"){
      setUserEmail("henryasante29@gmail.com");
    }

    if(!loading){

        if(session){
          router.push(RoutesCollection.dashboard)
        }
    }    
    
    Helpers.log("session", session)
    Helpers.log("loading", loading)

  }, [loading]);


  if(loading){
    return(
      <Pane display="flex" alignItems="center" justifyContent="center" height={"100vh"}>
        <Spinner />
      </Pane>
     )
  }

  return (
	 <Pane className={authStyles.container} >
     
      <IndexHeader/>

      <main className={authStyles.main}>

        <Pane  
          className="d-flex align-items-center text-center" 
          width="100%" 
          marginTop="10%"
          alignItems="center"
          justifyContent="center"
          >
          
          <Pane width="25%">

              <Heading size={700} > Sign up or log in </Heading>

              <Pane width="100%" marginTop={20} >

                  <TextInput 
                    width="100%" 
                    placeholder="What's your email address?" 
                    padding={20} 
                    value={getUserEmail}
                    onChange={ (e)=> setUserEmail(e.target.value) }
                    />

              </Pane>


              <Pane width="100%" marginTop={20} className="text-center"  >
                
                  <Button 
                    className="text-center" 
                    appearance="primary" 
                    intent="success" 
                    width="100%" 
                    padding={20}
                    justifyContent="center"
                    onClick={()=> signIn('email', { email: getUserEmail }) }>
                    Let's do this
                  </Button>

              </Pane>


                <Pane width="100%" marginTop={20} className="text-center"  >

                  <Paragraph 
                    className="text-center" 
                    width="100%" 
                    justifyContent="center">
                    or
                  </Paragraph>

              </Pane>


              <Pane width="100%" marginTop={20} className="text-center"  >

                  <Button 
                    className="text-center" 
                    appearance="default" 
                    intent="none" 
                    width="100%" 
                    padding={20}
                    justifyContent="center"
                    onClick={()=> signIn("google")}>
                    Continue with Google
                  </Button>

              </Pane>

              { true && <Pane width="100%" marginTop={5} className="text-center"  >

                  <Button 
                    className="text-center" 
                    appearance="default" 
                    intent="none" 
                    width="100%" 
                    padding={20}
                    justifyContent="center"
                    onClick={()=> signIn("facebook")}>
                    Continue with Facebook
                  </Button>

              </Pane>
            }


          </Pane>

        </Pane>
      </main>

      <IndexFooter/>
   </Pane>
   )

}

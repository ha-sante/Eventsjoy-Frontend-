import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../utils/routes'

import { Button, Heading, Pane } from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'



export default function event_card_box(props) {
  return (
    <Pane
                      //key={index} 
                      borderRadius={4}
                      minHeight="auto"
                      width="100%" 
                      margin={18}
                      marginTop={2}
                      padding={10}
                      display="flex"
                      style={{  
                          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                        }}
                      >
            

                      <Pane 
                        width="20%"
                        height="100%"
                        style={{  
                            //backgroundImage: `url(${eventData.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                        
                      </Pane>


                      <Pane width="90%" height="auto">

                        <Pane height="auto" padding={10}>
                          <Heading size={400} color="blue"> 

                          </Heading>
                        </Pane>

                        <Pane height="auto" padding={10}>
                          <Heading size={500} color="black"> 

                          </Heading>
                        </Pane>

                      </Pane>


    </Pane>
  )
}

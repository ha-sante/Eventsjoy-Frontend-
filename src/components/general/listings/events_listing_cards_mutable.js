import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../utils/routes'

import { Button, Heading, Pane } from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'



export default function events_listing_cards_mutable() {
  return (
   <Pane marginTop={50} >

    <Pane 
      width="100%" 
      height="auto" 
      display="flex" 
      flexWrap="wrap"
      padding={8}
    >


             {
                [
                  { 
                    image: "/assets/images/event13.png",
                    title: "The Tribes of Person-Centred Therapy - Mick Cooper", 
                    timing: "Sun, Feb 7, 2021 10:00 AM GMT"
                  },
                    { 
                    image: "/assets/images/event12.png",
                    title: "Light, Land, and Water: Native and non-Native Visions of New England", 
                    timing: "Mon, Jan 25, 2021 5:00 PM GMT"
                  },
                    { 
                    image: "/assets/images/event10.png",
                    title: "Book Club with Margaret Atwood", 
                    timing: "Thu, Feb 11, 2021 7:00 PM GMT"
                  },  
                    { 
                    image: "/assets/images/event7.png",
                    title: "Book Club with Margaret Atwood", 
                    timing: "Thu, Feb 11, 2021 7:00 PM GMT"
                  },  
                  { 
                    image: "/assets/images/event9.png",
                    title: "Rock and Roll Fashion", 
                    timing: "Sat, Jan 16, 2021 12:00 AM GMT"
                  },
                ].map( (eventData, index)=> {
                  return(
                    <Pane
                      key={index} 
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
                            backgroundImage: `url(${eventData.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                        
                      </Pane>


                      <Pane width="90%" height="auto">

                        <Pane height="auto" padding={10}>
                          <Heading size={400} color="blue"> 
                            {  eventData.timing }
                          </Heading>
                        </Pane>

                        <Pane height="auto" padding={10}>
                          <Heading size={500} color="black"> 
                            { eventData.title }
                          </Heading>
                        </Pane>

                      </Pane>


                    </Pane>
                  )
                })
              }
             

    </Pane>

      <Pane 
        display="flex" 
        justifyContent="center"
        alignItems="center"
        width="100%" 
        marginTop={10}
        height="auto"
        >
        
            <Heading size={500}> 
              Continue loading
            </Heading>

      </Pane>
   

  </Pane>
  )
}

import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../utils/routes'

import { Button, Heading, Pane } from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'


export default function events_listing_cards_set() {
  return (
	 <Pane marginTop={20} marginBottom={20} >

    <Pane width="100%" padding={20}  >
      <Heading size={800}> More Events for you </Heading> 
    </Pane>


    <Pane 
      width="100%" 
      height="auto" 
      display="flex" 
      flexWrap="wrap"
      marginTop={10} 
      padding={5}
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
                    image: "/assets/images/event11.png",
                    title: "Rock and Roll Fashion", 
                    timing: "Sat, Jan 16, 2021 12:00 AM GMT"
                  },
                   { 
                    image: "/assets/images/event5.png",
                    title: "The Tribes of Person-Centred Therapy - Mick Cooper", 
                    timing: "Sun, Feb 7, 2021 10:00 AM GMT"
                  },
                    { 
                    image: "/assets/images/event6.png",
                    title: "Light, Land, and Water: Native and non-Native Visions of New England", 
                    timing: "Mon, Jan 25, 2021 5:00 PM GMT"
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

                  let singleEventRoute = `${RoutesCollection.event}/${index}`;

                  return(
                      <Pane 
                        key={index}
                        className="hero-image-tile"
                        borderRadius={4}
                        minHeight="250px"
                        width="22%" 
                        margin={18}
                        style={{  
                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                          }}
                        >
                        <Link href={singleEventRoute} >
                           <a>

                              <Pane 
                                height="130px"
                                style={{  
                                    backgroundImage: `url(${eventData.image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                  }}
                                >
                                
                              </Pane>
                              
                          </a>
                        </Link>

                        <Pane height="120px">

                          <Pane height="40px" padding={10}>
                            <Heading size={400} color="blue"> 
                              {  eventData.timing }
                            </Heading>
                          </Pane>

                          <Link href={singleEventRoute} >
                            <a>
                              <Pane height="60px" padding={10}>
                                <Heading size={500} color="black"> 
                                  { eventData.title }
                                </Heading>
                              </Pane>
                             </a>
                          </Link>

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
      marginTop={40}
      height="auto"
      >
      
      <Link href={RoutesCollection.events_listing} >
          <a>
            <Heading size={600}> 
              Access more events <ArrowRightIcon/>
            </Heading>
          </a>
       </Link>

    </Pane>
   

  </Pane>
  )
}

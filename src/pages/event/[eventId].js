import React, { useState, useEffect } from 'react';


import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import RoutesCollection from '../../utils/routes'

import styles from '../../styles/index.module.css'
import eventStyles from '../../styles/event.module.css'

import { 
  Button, 
  Heading, 
  Pane,
  Paragraph,
  Badge,
} from 'evergreen-ui'

import IndexHeader from '../../components/index/header'
import IndexFooter from '../../components/index/footer'
import IndexHero from '../../components/index/hero'


export default function event() {

  const router = useRouter()
  const { eventId } = router.query



  const [count, setCount] = useState(0);

  const eventData = { 
      image: "/assets/images/event5.png",
      title: "The Tribes of Person-Centred Therapy", 
      organizer: "Mick Cooper",
      timing: "Sun, Feb 7, 2021 10:00 AM GMT",
      price: "Free"
  }


  useEffect(() => {
      
      if(eventId){
        console.log("Query ID", eventId);
      }

  }, [eventId]);


  function registerForEvent(){
      console.log("Query ID", eventId);
  }



  return (
  <div className={eventStyles.container}>

      <IndexHeader/>

      <main className={eventStyles.main}>
      
        <Pane 
          width="80%" 
          className="mx-auto" 
          marginTop={50}
          borderRadius={5} 
          border >


          {/*top most part of the event card*/}
          <Pane height="400px" display="flex" >

            <Pane 
              width="70%"
              height="100%"
              borderRadius={5}
              style={{  
                backgroundImage: `url(/assets/images/event5.png)`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></Pane>

            <Pane 
                borderBottom="muted"
                width="30%" 
                height="100%"
                padding={20}
                display="flex" className={eventStyles.event_side_panel} >

                <Pane marginTop={20} width="100%">
                  <Heading size={200}> 
                    { eventData.timing }
                  </Heading>
                </Pane>

                <Pane flex={1} width="100%" className={eventStyles.main}> 
                    <Pane marginTop={20} width="100%" >
                      <Heading  size={600}> 
                        {  eventData.title }
                      </Heading>
                    </Pane>

                    <Pane marginTop={10} width="100%">
                      <Heading size={400}> 
                        - { eventData.organizer } <Badge color="blue">Follow</Badge>
                      </Heading>
                    </Pane>
                </Pane>


                <Pane marginTop={20} width="100%" >

                  <Pane marginBottom={10} width="100%">
                      <Heading size={400}> 
                        { eventData.price } 
                      </Heading>
                    </Pane>

                  <Button 
                    padding={20}
                    width="100%"
                    justifyContent="center" 
                    appearance="primary" 
                    intent="success" 
                    onClick={registerForEvent}> 
                    Register
                  </Button>
                </Pane>


            </Pane>

          </Pane>


          {/*top most part of the event card*/}
          <Pane height="auto" display="flex" >

            <Pane
              borderRight="muted"
              width="70%"
              height="100%"
              borderRadius={5} 
              padding={40}>

              <Pane marginTop={20} width="100%" >
                  <Heading  size={600}> 
                    About this event
                  </Heading>
              </Pane>

              <Pane marginTop={10} width="100%" >
                  <Paragraph size={500}> 
                    Animation is a mechanism of applying dynamic motion
                    effects to a non movable static object with respect to time and
                    space. In order to add photorealistic effects to an animated
                    scene it has to undergo the process of rendering. Rendering is
                    a process of converting geographical skeletons into
                    photorealistic images. Mainly rendering includes ray tracing
                    mechanisms to add light, motion and camera effects according
                    to angle at which light incidents on an object.
                     Modern film industry demands a large scale of 3D
                    animations to achieve imaginary actions in movies. Better
                    quality 3D models, e.g. more complex geometry and
                    photorealistic rendering, always demands more time and
                    computational power for rendering. To inculcate imaginary
                    actions in modern movies animation is becoming unavoidable
                    part of modern film industries. Computer animation is a
                    process where a series of still images are assembled to achieve
                    a continuous motion effect. Rendering is more time
                    consuming task as it includes more complex geometrical
                    models to be converted into a photorealistic animated scene. A
                    common method to save rendering time is to reduce the scene
                    complexity but this might compromise the quality of the final
                    animation scene. Therefore, animators often have to find a
                    balance between the quality of the scene and the production
                    time. However in recent years, animators were able to render
                    highly complex 3D models for creating their animation
                    sequences using high performance networked computers.
                  </Paragraph>
              </Pane>




              <Pane marginTop={20} width="100%" >
                  <Heading  size={600}> 
                    Tags
                  </Heading>
              </Pane>

              <Pane marginTop={10} width="100%" >
                  <Badge> #the-hello-world </Badge>
              </Pane>

            </Pane>


            <Pane 
                width="30%" 
                height="100%"
                padding={40}
                display="flex" className={eventStyles.event_side_panel} >

              <Pane marginTop={20} width="100%" >
                  <Heading  size={600}> 
                    Timing
                  </Heading>
              </Pane>


               <Pane marginTop={10} width="100%" >
                  <Paragraph size={500}> 
                    Event is happening 2 days from today.
                  </Paragraph>
              </Pane>



              <Pane marginTop={40} width="100%" >
                  <Heading  size={600}> 
                    Location
                  </Heading>
              </Pane>


               <Pane marginTop={10} width="100%" >
                  <Paragraph size={500}> 
                    Event is 2 miles from here
                  </Paragraph>
              </Pane>



              <Pane marginTop={40} width="100%" >
                  <Heading  size={600}> 
                   Social
                  </Heading>
              </Pane>


               <Pane marginTop={10} width="100%" >
                  <Paragraph size={500}> 
                    Below is what everyone is talking about the event
                  </Paragraph>
              </Pane>




            </Pane>

            
          </Pane>


        </Pane>




      </main>

      <IndexFooter/>

    </div>
  )
}
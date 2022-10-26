import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../utils/routes'

import { 
  Button, 
  Heading, 
  Pane, 
  Spinner,
  IconButton
} from 'evergreen-ui'

import { 
  ArrowRightIcon,
  TrashIcon,
  EditIcon
} from 'evergreen-ui'


import { useRouter } from 'next/router'


import DeleteEventPrompt from './prompts/deleteEvent'


export default function events_listing_cards_mutable(props) {

  const router = useRouter()
  const [getEventData, setEventData] = useState({})

  if(!props.events){
    return(
      <Pane 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        height="auto"
        flex="1">

        <Spinner />

      </Pane>
     )
  }


  return (
	 <Pane marginTop={5}  >

    <DeleteEventPrompt 
      getShowDeleteDialog={props.getShowDeleteDialog}
      setShowDeleteDialog={props.setShowDeleteDialog}
      deleteUserEvent={props.deleteUserEvent}
      getEventData={getEventData}/>

    <Pane 
      width="100%" 
      height="auto" 
      display="flex" 
      flexWrap="wrap"
      padding={5}>
             {
               props.events.get_events_by_owner_id.map( (eventData, index)=> {
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
                        borderRadius={4}
                        style={{  
                            backgroundImage: `url(${eventData.event_image ? eventData.event_image.url: "/assets/images/banner.png"})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                        
                      </Pane>


                      <Pane width="90%" height="auto">

                        <Pane height="auto" padding={10}>
                          <Heading size={400} color="blue"> 
                            {  eventData.event_schedule.date.start }
                          </Heading>
                        </Pane>

                        <Pane height="auto" padding={10}>
                          <Heading size={500} color="black"> 
                            { eventData.event_title }
                          </Heading>
                        </Pane>

                      </Pane>


                      <Pane className="d-flex align-items-center">

                          <IconButton 
                            onClick={ ()=>{ 
                             router.push(`${RoutesCollection.dashboard}/event/${eventData.id}`) 
                            }}
                            icon={EditIcon} 
                            marginRight={6}/>

                          <IconButton 
                            onClick={ ()=> { 
                              setEventData({ 
                                event_image: eventData.event_image,
                                id: eventData.id
                              })
                              props.setShowDeleteDialog(true) 
                            }}
                            icon={TrashIcon} 
                            marginRight={6} />

                      </Pane>
                    </Pane>
                  )
                })
              }
             

    </Pane>
   
  </Pane>
  )
}

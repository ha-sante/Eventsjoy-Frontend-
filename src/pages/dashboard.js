import React, { useState, useEffect, useContext } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'

import Helpers from '../utils/helpers'
import RoutesCollection from '../utils/routes'

import dashboardStyles from '../styles/dashboard.module.css'
import styles from '../styles/index.module.css'

import { 
  Button, 
  Heading, 
  Pane, 
  TextInput, 
  Spinner,
  Alert,
 } from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'


import DashboardHeader from '../components/general/dashboard/header'
import IndexFooter from '../components/index/footer'
import IndexHero from '../components/index/hero'

import EventsListingCardsMutable from '../components/general/dashboard/events_listing_cards_mutable'
import EventsListingCardsMutableFilterer from '../components/general/dashboard/events_listing_cards_mutable_filterer'


import { UserEventsCollectionContext } from './_app';

import { gql, useLazyQuery, useMutation } from '@apollo/client';



const GET_DASHBOARD_EVENTS_BY_OWNER_ID = gql`
  query get_events_by_owner_id($id: String!) {
      get_events_by_owner_id(id: $id) {
        id
        event_title
        event_schedule{ 
              date{
                start
              }
            }
        event_image{
          url
        }
      }
  }
`;

const DELETE_EVENT = gql`
  mutation delete_event($id: String!) {
    delete_event(id: $id) {
      id
      event_state
    }
  }
`;

export default function dashboard() {

  const UserEventsCollectionContextValues = useContext(UserEventsCollectionContext);
  const router = useRouter()
  const [session, loading] = useSession()

  const [getUserEvents, { data }] = useLazyQuery(GET_DASHBOARD_EVENTS_BY_OWNER_ID);
  const [deleteEvent, { deletedEvent }] = useMutation(DELETE_EVENT);

  const [getShowDeleteDialog, setShowDeleteDialog] = useState(false)


  useEffect(() => {

    if(!loading){

      // if session is undefined & and the loading is false
      if(!session){
        router.push(RoutesCollection.login)
      }

      if(session){
        getUserEvents({ variables:{"id": session.user.id}, fetchPolicy: "no-cache" });
      }  

      Helpers.log("data", data)
    }    

  }, [loading]);


  if(loading){
    return(
      <Pane display="flex" alignItems="center" justifyContent="center" height={"100vh"}>
        <Spinner />
      </Pane>
     )
  }



  async function deleteUserEvent(id){
    // take the event id and call the backend to do so
    Helpers.log("About to delete", id);

    try{
        let response = await deleteEvent({ variables: { id} });

        // update the events listings
        getUserEvents({ variables:{ "id": session.user.id}, fetchPolicy: "no-cache"});
        Helpers.notify(1, "Deleted your event data successfully");

        setShowDeleteDialog(false);
      }catch(error){
        Helpers.notify(2, "Failed to delete event data, resolve this via support chat");
      }

  }

  return (
    <div className={dashboardStyles.container}>

      <DashboardHeader 
        session={session} 
        loading={loading}
        signOut={signOut}
       />   

      <main className={dashboardStyles.main}>

        <Pane 
          display="flex" 
          justifyContent="space-between"
          width="100%" 
          padding={20}  
          marginTop={20} >

          <Heading size={800}> Events </Heading> 

          <Pane 
            //width="50%" 
            display="flex" 
            justifyContent="space-between"
            >
            
            <TextInput 
              width="250px" 
              marginRight={10}
              placeholder="Find event by name" 
              />

           <Link href={RoutesCollection.create_event} >
            <Button appearance="primary" intent="success" > Create Event </Button>
           </Link>
          </Pane>

        </Pane>


        <Pane>
            <EventsListingCardsMutable 
              getShowDeleteDialog={getShowDeleteDialog}
              setShowDeleteDialog={setShowDeleteDialog}
              events={data} 
              deleteUserEvent={deleteUserEvent} /> 
        </Pane>

      </main>

      <IndexFooter/>

    </div>
  )
}



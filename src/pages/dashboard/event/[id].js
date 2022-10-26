import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../utils/routes'

import styles from '../../../styles/index.module.css'
import dashboardStyles from '../../../styles/dashboard.module.css'

import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import Helpers from '../../../utils/helpers'

import { 
  Button, 
  Heading, 
  Pane, 
  Spinner,
} from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'


import IndexHeader from '../../../components/general/dashboard/header'
import IndexFooter from '../../../components/index/footer'
import IndexHero from '../../../components/index/hero'

import BasicDataEditorForm from '../../../components/general/dashboard/event_data_editing_forms/basic_event_data'
import ImageAndDescriptionDataEditorForm from '../../../components/general/dashboard/event_data_editing_forms/image_and_description'
import TicketsAndPublishEditorForm from '../../../components/general/dashboard/event_data_editing_forms/ticket_and_publish'


import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_EVENT_BY_ID = gql`
  query get_event($id: String!) {
      get_event(id: $id) {
        id
        event_title
        event_organizer{
          name
          image
        }
        event_type{
          name
        }
        event_category{
          name
        }
        event_tags
        event_location{
          venue{
            title
            address{
              label
              countryCode
              countryName
              county
              city
            }
            position{
              lat
              lng
            }
            mapView{
              west
              south
              east
              north
            }
           }
          online
          toBeAnnounced
        }
        event_schedule{
          date{
            start
            end
          }
          time{
            start
            end
          }
          timezone{
            zone
            label
          }
        }
        event_image{
          url
        }
        event_description{
          summary
          content
        }

     }
  }
`;

export default function create_event() {

  const router = useRouter()
  const { id } = router.query

  const [getEvent, { data }] = useLazyQuery(GET_EVENT_BY_ID);

  const [session, loading] = useSession()
  const [getViewState, setViewState] = useState(3);

  const [getLoadedEventData, setLoadedEventData] = useState();
  const [getEditingState, setEditingState] = useState("create");

  const [getEventReferenceId, setEventReferenceId] = useState("")


  function nextView(){
    setViewState(getViewState+1)
  }

  function previousView(){
    setViewState(getViewState-1)
  }

  const [getBasicEventData, setBasicEventData] = useState({
    event_title: "",
    event_organizer: {
      name: "", 
      image: ""
    },
    event_type: {
      name: ""
    },
    event_category: {
      name: ""
    },
    event_tags: [],
  });

  const [getLocationData, setLocationData] = useState({
      venue: {
        title: ""
      },
      online: "",
      toBeAnnounced: false
  });

  const [getScheduleData, setScheduleData] = useState({
      date: {start: new Date().toString(), end: new Date().toString() },
      time: {start: "", end: ""},
      timezone: { zone: "", label: "" }
  });

  // used for editing purposes only
  const [getFormEditing, setFormEditing] = useState({
      event_type: {
        name: "Event Type"
      },
      event_category: {
        name: "Event Category"
      },
      selected_location_tab_index: 0,
      event_location_venue_original_results: [],
      event_location_venue_results: [],
      event_location_venue_title: ""
  });

  const [getEventImageData, setEventImageData] = useState({ url: "" })
  const [getDescriptionData, setDescriptionData] = useState({ summary: "", content: "" })


 const [getTicketsData, setTicketsData] = useState([
    {
      type: 'paid',
      name: '',
      quantity: '',
      price: '',
      date: {start: new Date().toString(), end: new Date().toString() },
      time: {start: "", end: ""},
      timezone: { zone: getScheduleData.timezone.zone, label: getScheduleData.timezone.label }
    }
  ]);


  function prepareBasicEventDataForEditing(data){
    const { 
      event_title, 
      event_organizer, 
      event_type, 
      event_category, 
      event_tags,
      event_location,
      event_schedule,
      event_image,
      event_description,
    } = data;


    Helpers.log("event_image sent", event_image);
    Helpers.log("event_description sent", event_description);

    // set the specific data
    setBasicEventData({  event_title, event_organizer, event_type, event_category, event_tags })
    setFormEditing({ ...getFormEditing, event_type, event_category })

    // set the location data & schedule data
    setLocationData({ ...event_location });
    setScheduleData({ ...event_schedule });

    // set the event image & description
    setEventImageData({ ...event_image })
    setDescriptionData({ ...event_description })
  }


  useEffect(()=>{
    if(id){
      if(id !== "create"){
        setEventReferenceId(id)
        setEditingState("update");
        getEvent({  variables: { id }, });

        Helpers.log("id change", id);
        setLoadedEventData(true)
      }
    }
  }, [id])

  useEffect(()=>{
    if(data){
       setLoadedEventData(true)
       prepareBasicEventDataForEditing(data.get_event);
       Helpers.log("data change", data);
    }
  }, [data])


  useEffect(() => {

    if(!loading){
      // if session is undefined & and the loading is false
      if(!session){
        router.push(RoutesCollection.login)
      }
    }    

  }, [loading]);




  async function updateQueryCache(response){
    if(id && data){
       Helpers.log("response called", response);
       setLoadedEventData(true)
       prepareBasicEventDataForEditing(response.data.update_event);
    }
  }


  // if the ID is undefined
  if(id === undefined){
    return(
      <Pane display="flex" alignItems="center" justifyContent="center" height={"100vh"}>
        <Spinner />
      </Pane>
     )
  }

  // if the ID is defined, but it's a create event
  // check if event data is set and then allow
  if(id !== "create"){
    if(getLoadedEventData == undefined && getEditingState === "update"){
      return(
        <Pane display="flex" alignItems="center" justifyContent="center" height={"100vh"}>
          <Spinner />
          <Heading> Loading event data </Heading>
        </Pane>
       )
    }
  }



  return (
  <div className={dashboardStyles.container}>

      <IndexHeader
        session={session} 
        loading={loading}
        signOut={signOut}/>

      <main className={dashboardStyles.main}>

        <Pane width="80%" className="mx-auto" marginTop={40} >

          { 
          getViewState === 1 && 
          <BasicDataEditorForm 
            getBasicEventData={getBasicEventData}
            setBasicEventData={setBasicEventData}

            getLocationData={getLocationData}
            setLocationData={setLocationData}

            getScheduleData={getScheduleData}
            setScheduleData={setScheduleData}
            
            getFormEditing={getFormEditing}
            setFormEditing={setFormEditing}

            setEventReferenceId={setEventReferenceId}
            getEventReferenceId={getEventReferenceId}

            getEditingState={getEditingState}
            updateQueryCache={updateQueryCache}

            nextView={nextView} 
            previousView={previousView} /> 
          }
            
          { 
          getViewState === 2 && 
          <ImageAndDescriptionDataEditorForm 
            getDescriptionData={getDescriptionData}
            setDescriptionData={setDescriptionData}

            getEventImageData={getEventImageData}
            setEventImageData={setEventImageData}

            getEventReferenceId={getEventReferenceId}

            getEditingState={getEditingState}
            updateQueryCache={updateQueryCache}

            nextView={nextView} 
            previousView={previousView} /> 
          }


         { 
          getViewState === 3 && 
          <TicketsAndPublishEditorForm 
            getDescriptionData={getDescriptionData}
            setDescriptionData={setDescriptionData}

            getEventImageData={getEventImageData}
            setEventImageData={setEventImageData}

            getEventReferenceId={getEventReferenceId}

            getEditingState={getEditingState}
            updateQueryCache={updateQueryCache}

            getTicketsData={getTicketsData}
            setTicketsData={setTicketsData}

            nextView={nextView} 
            previousView={previousView} /> 
          }
          
             
        </Pane>

      </main>

      <IndexFooter/>

    </div>
  )
}

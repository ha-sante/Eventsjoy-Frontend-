import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../../utils/routes'

import styles from '../../../../styles/index.module.css'

import inAppDataCollections from '../../../../utils/inAppData'
import LocationServices from '../../../../utils/api_interactions/location_services'
import Helpers from '../../../../utils/helpers'

import { 
  Button, 
  Heading, 
  Pane,
  TextInput, 
  Paragraph,
  SelectMenu,
  TagInput,
  Tablist,
  Tab,
  SearchInput,
  Popover,
  Text,
  Badge,
  Autocomplete,
} from 'evergreen-ui'

import { 
  NewTextBoxIcon,
  ChevronDownIcon,
  MapMarkerIcon,
  CalendarIcon,
  TimeIcon,
  ArrowRightIcon
} from 'evergreen-ui'


import{
  DatePicker,
  TimePicker
} from '@blueprintjs/datetime'


let dateFormat = require("dateformat");
let Validator = require('validatorjs');

import { gql, useQuery, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/client'



const CREATE_EVENT = gql`
  mutation create_event($data: EventInput!) {
    create_event(data: $data) {
      id
      event_state
      event_title
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation update_event($id: String!, $data: EventInput!) {
    update_event(id: $id, data: $data) {
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

export default function BasicEventDataForm(props) {

  const [session, loading] = useSession()

  const [createEvent, { createdData }] = useMutation(CREATE_EVENT);
  const [updateEvent, { data }] = useMutation(UPDATE_EVENT);

  const [getDataCheckSuccess, setDataCheckSuccess] = useState(false)


  function handleTextInputDataChange(e){
    let name = e.target.name;
    let value = e.target.value;


    if(name === "event_organizer"){
      
      props.setBasicEventData({ 
        ...props.getBasicEventData, 
        event_organizer: { ...props.getBasicEventData.event_organizer, "name": value  } 
      });
    
    }else{
       props.setBasicEventData({ ...props.getBasicEventData, [name]: value });
    }

  }

  function handleTextInputLocationDataChange(e){
    let name = e.target.name;
    let value = e.target.value;

    switch(name){
      case name === "online":
      props.setLocationData({ ...props.getLocationData, "toBeAnnounced": false });
      props.setLocationData({ ...props.getLocationData, "venue": { title: "" } });
      break; 

      case name === "toBeAnnounced":
      props.setLocationData({ ...props.getLocationData, "venue": { title: "" } });
      props.setLocationData({ ...props.getLocationData, "online": "" });
      break;
    }

    props.setLocationData({ ...props.getLocationData, [name]: value });
  }



  function handleSelectDataChange(item, select_name){
    props.setFormEditing({ ...props.getFormEditing, [select_name]: { "name": item.value } });
    props.setBasicEventData({ ...props.getBasicEventData, [select_name]: { "name": item.value } });
  }

  function handleStartTimeSelectChange(item, select_name){
     props.setScheduleData({ ...props.getScheduleData, 
      "time": { ...props.getScheduleData.time, [select_name]: item.value }  
      });
  }

  function handleLocationTextInputQuery(e){

    let value = e.target.value;

    LocationServices.searchForLocation(value).then( res =>{

      if(res.items.length === 0){

        props.setFormEditing({ 
          ...props.getFormEditing, 
          event_location_venue_results: ["Try a full wording to get results..."] 
        })

      }else{

        let searchCollection = [];

        // go over and strip title for showing listings
        res.items.map( data =>{
           searchCollection.push(data.title);
        })

        // set this for showing the listings
        props.setFormEditing({ ...props.getFormEditing, 
          event_location_venue_results: searchCollection,
          event_location_venue_original_results: res.items 
        })

      }

    }).catch( err=>{
      props.setFormEditing({ 
        ...props.getFormEditing, 
        event_location_venue_results: ["No results found..."] 
      })
    })

  }


  function handleStartDatePickerChange(value){
    props.setScheduleData({ ...props.getScheduleData, 
      "date": { ...props.getScheduleData.date, "start": value.toString() }  
      });
  }

  function handleEndingDatePickerChange(value){
      props.setScheduleData({ ...props.getScheduleData, 
        "date": { ...props.getScheduleData.date, "end": value.toString() }  
      });
  }


  function handleSelectLocationFromItems(chosenItem){

    // find specific
    let found = props.getFormEditing.event_location_venue_original_results.filter( data =>{
        if(data.title === chosenItem){
           return data;
        }
    }) 

    let vanueData = found[0];

    // get only the needed parts
    let { title, id, address, position, mapView } = vanueData;
    let { 
      label, countryCode, countryName, stateCode, 
      state, county, city, district, postalCode 
    } = vanueData.address;

    let preparedData = { 
      ...props.getLocationData, 
      venue: { 
        ...(title && {title}),
        ...(id && {id}),
        ...(address && {
          "address": {
          ...(label && {label}), 
          ...(countryCode && {countryCode}), 
          ...(countryName && {countryName}), 
          ...(stateCode && {stateCode}), 
          ...(state && {state}), 
          ...(county && {county}), 
          ...(city && {city}), 
          ...(district && {district}), 
          ...(postalCode && {postalCode}), 
          }
        }),
        ...(position && {position}),
        ...(mapView && {mapView})
      }
    }

    props.setLocationData(preparedData);
  }
  

  function handleSelectTimeZoneFromItems(chosenItem){

    // find specific
    let found = inAppDataCollections.timezones_collection.filter( data =>{
        if(data.label === chosenItem.value){
           return data;
        }
    }) 

    props.setScheduleData({ ...props.getScheduleData, timezone: { 
      zone: found[0].timezone, 
      label: found[0].label } 
    });
  }
  


  function validateFinalData(data){

    // check the event title
    // check the event organizers name
    // check the event type
    // check the event category
    // check the event location
      // check option if 1,
      // check for the location details

    // check the event timing
      // check the date start and end
      // check the time start and end
      // check the timezone
   let rules = {
      'event_owner_id': 'required',
      'event_state': 'required',
      'event_title': 'required',
      'event_organizer.name': 'required',

      'event_type.name': 'required',
      'event_category.name': 'required',

      'event_schedule.date.start': 'required',
      'event_schedule.date.end': 'required',      
      'event_schedule.time.start': 'required',
      'event_schedule.time.end': 'required',
      'event_schedule.timezone.zone': 'required',

    };

    let validation = new Validator(data, rules);

    return validation.passes(); // true
  }

  async function SubmitCreateEvent(){

    let ready = { 
          event_owner_id: "",
          event_state: "draft",
           ...props.getBasicEventData, 
          event_location: { ...props.getLocationData }, 
          event_schedule: { ...props.getScheduleData }
    }

    // add owner id to the user id
    ready.event_owner_id = session.user.id;

    // take away the venue scoring feature
    delete ready.event_location.venue.scoring;

    // data validation
    if( validateFinalData(ready) ){

      try{
        let response = await createEvent({ variables: {"data": ready} });

        Helpers.notify(1, "Saved your event data successfully");
        props.setEventReferenceId(response.data.create_event.id); // set the created events refrence Id
        props.nextView() // next view state
      }catch(error){
        Helpers.notify(2, "Failed to save event data, resolve this via support chat");
      }
   
   }else{
      setDataCheckSuccess(true);
      Helpers.notify(2, "Failed to save event data, please fill in all required data");
   }

  }

 async function SubmitUpdateEvent(){

    let ready = { 
          event_owner_id: "",
          event_state: "draft",
           ...props.getBasicEventData, 
          event_location: { ...props.getLocationData }, 
          event_schedule: { ...props.getScheduleData }
    }

    // add owner id to the user id
    ready.event_owner_id = session.user.id;

    // take away the venue scoring feature
    delete ready.event_location.venue.scoring;

    // data validation
    if( validateFinalData(ready) ){

      try{
        let response = await updateEvent({ 
          variables: { "id": props.getEventReferenceId, "data": ready }
        });

        props.updateQueryCache(response);
        Helpers.notify(1, "Updated your event data successfully");
        props.nextView() // next view state
      }catch(error){
        Helpers.notify(2, "Failed to update event data, resolve this via support chat");
      }
   
   }else{
      setDataCheckSuccess(true);
      Helpers.notify(2, "Failed to update event data, please fill in all required data");
   }

  }


  if(!props){
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
  <div>

          <Pane 
            marginBottom={40}
            width="80%" 
            className="mx-auto"           
            display="flex" 
            justifyContent="space-between">

              <Pane width="20%" marginTop={20} >

                <NewTextBoxIcon color="#ddd" size={80} />

              </Pane>

              <Pane width="80%" marginTop={20} >

                  <Heading size={700}> Basic Event Details </Heading>

                  <Paragraph marginTop={10} >
                  Name your event and tell event-goers why they should come. 
                  Add details that highlight what makes it unique.
                  </Paragraph> 

                  <TextInput 
                    marginTop={20}
                    width="100%" 
                    placeholder="What's the name of your event?" 
                    padding={22} 
                    name="event_title"
                    value={props.getBasicEventData.event_title}
                    isInvalid={getDataCheckSuccess && props.getBasicEventData.event_title === ""} // true =
                    onChange={handleTextInputDataChange}/>

                  <TextInput 
                    marginTop={20}
                    width="100%" 
                    placeholder="What is the organizers name?" 
                    padding={22} 
                    name="event_organizer"
                    value={props.getBasicEventData.event_organizer.name}
                    isInvalid={getDataCheckSuccess && props.getBasicEventData.event_organizer.name === ""}
                    onChange={handleTextInputDataChange}/>

                  <Pane 
                    marginTop={20}
                    width="60%"
                    display="flex" 
                    justifyContent="space-between">
                      
                          <SelectMenu
                            height={250}
                            title="Select Event Type"
                            options={
                              inAppDataCollections.event_types_collection.map( data => ({ 
                                  label: data.name, 
                                  value: data.name 
                                }))
                            }
                            name="event_type"
                            value={props.getFormEditing.event_type.name}
                            Selected={props.getFormEditing.event_type.name}
                            onSelect={ (item)=> handleSelectDataChange(item, "event_type") }>

                            <Button  
                              display="flex" 
                              justifyContent="space-between" 
                              width="48%" 
                              padding={22}
                              className="text_ellipses">
                              {props.getFormEditing.event_type.name} <ChevronDownIcon/>
                            </Button>

                          </SelectMenu>


                          <SelectMenu
                            height={250}
                            title="Select Event Category"
                            options={
                               inAppDataCollections.event_categories_collection.map( data => ({ 
                                  label: data.name, 
                                  value: data.name 
                                }))
                            }
                            name="event_category"
                            Selected={props.getFormEditing.event_category.name}
                            onSelect={ (item)=> handleSelectDataChange(item, "event_category") }>

                            <Button
                              display="flex" 
                              justifyContent="space-between" 
                              width="48%" 
                              padding={22} 
                              className="text_ellipses">
                              {props.getFormEditing.event_category.name} <ChevronDownIcon/> 
                            </Button>

                          </SelectMenu>


                  </Pane>

                  <Pane marginTop={20}  >
  
                   <Heading size={600}> Tags </Heading>

                    <Paragraph marginTop={10} >
                      Improve discoverability of your event by adding tags 
                      relevant to the subject matter.
                    </Paragraph> 

                    <TagInput
                          marginTop={10}
                          width="100%"
                          padding={8}
                          id="event_tags"
                          inputProps={{ placeholder: 'Add your Tag and press Enter' }}
                          values={props.getBasicEventData.event_tags}
                          onChange={values => {
                            props.setBasicEventData({ ...props.getBasicEventData, event_tags: values })
                          }}
                        />

                   </Pane>

              </Pane>

          </Pane>

          <Pane  marginTop={60} width="90%"  className="mx-auto" >
            <hr/>
          </Pane>


          <Pane 
            marginTop={40}
            width="80%" 
            className="mx-auto"           
            display="flex" 
            justifyContent="space-between">

              <Pane width="20%" marginTop={20} >

                <MapMarkerIcon color="#ddd" size={80} />

              </Pane>

              <Pane width="80%" marginTop={20} >

                  <Heading size={700}> Event Location Details </Heading>

                  <Paragraph marginTop={10} >
                  Help people in the area discover your event 
                  and let attendees know where to show up.
                  </Paragraph> 

        
                   <Pane width="100%" height="auto" marginTop={15} >

                    <Pane width="100%">

                      <Tablist 
                          padding="none"
                          marginBottom={15} 
                          width="100%" 
                          marginLeft="none" 
                          marginRight={24}>
                        {["Venue", "Online Event", "To be announced"].map((tab, index) => (
                          <Tab
                            marginLeft="none"
                            key={tab}
                            id={tab}
                            padding={18}
                            onSelect={() => {
                              props.setFormEditing({ ...props.getFormEditing, selected_location_tab_index: index })
                               
                              if(index===2){
                                props.setLocationData({ ...props.getLocationData, "toBeAnnounced": true });
                              }else{
                                props.setLocationData({ ...props.getLocationData, "toBeAnnounced": false });
                              }

                            }}
                            isSelected={index === props.getFormEditing.selected_location_tab_index}
                            aria-controls={`panel-${tab}`}
                          >
                            {tab}
                          </Tab>
                        ))}
                      </Tablist>

                    </Pane>


                    <Pane width="100%" marginTop={10} >

                      
                                  {false && <SearchInput
                                    margin={0} 
                                    width="100%"
                                    height={44}
                                    placeholder="Search for the venue or address" 
                                   />}

                              


                          { props.getFormEditing.selected_location_tab_index === 0 && 
                             <Pane>

                             <Autocomplete
                                title="Your location search results"
                                onChange={handleSelectLocationFromItems}
                                items={props.getFormEditing.event_location_venue_results}
                              >
                                {(props) => {
                                  const { 
                                    getInputProps, 
                                    getRef, 
                                    inputValue, 
                                    openMenu
                                  } = props

                                  return (
                                    <SearchInput
                                      margin={0} 
                                      width="100%"
                                      height={44}
                                      placeholder="Search for the venue or address" 
                                      ref={getRef}
                                      onFocus={openMenu}
                                      value={inputValue}
                                      {...getInputProps()}
                                      onInput={handleLocationTextInputQuery}
                                   />
                                  )

                                }}

                              </Autocomplete>

                              { props.getLocationData.venue.title.length !== 0 &&
                                <Paragraph size={300} marginTop={10} >
                                    Event Location is set to <span style={{ "color": "#1070CA" }}>
                                     {props.getLocationData.venue.title}
                                    </span> 
                                </Paragraph> 
                               }

                              </Pane>
                             }



                            { props.getFormEditing.selected_location_tab_index === 1 &&  
                              <TextInput 
                                marginTop={0}
                                width="100%" 
                                placeholder="What is the online URL for the event?" 
                                padding={22} 
                                name="online"
                                onChange={handleTextInputLocationDataChange}/>
                             }

                            { props.getFormEditing.selected_location_tab_index === 2 && 
                              <TextInput 
                                marginTop={0}
                                width="100%" 
                                placeholder="What should customers know about the announcement?" 
                                padding={22} 
                                name="toBeAnnounced"
                                onChange={handleTextInputLocationDataChange}/>
                             }
                      
                    </Pane>


                  </Pane>

              </Pane>

          </Pane>


          <Pane  marginTop={60} width="90%"  className="mx-auto" >
            <hr/>
          </Pane>


          <Pane 
            marginTop={40}
            width="80%" 
            className="mx-auto"           
            display="flex" 
            justifyContent="space-between">

              <Pane width="20%" marginTop={20} >

                <CalendarIcon color="#ddd" size={80} />

              </Pane>

              <Pane width="80%" marginTop={20} >

                  <Heading size={700}> Event Date and Time </Heading>

                  <Paragraph marginTop={10} >
                  Tell event-goers when your event starts and 
                  ends so they can make plans to attend.
                  </Paragraph> 
        
                  
                  <Pane width="100%" height="auto" marginTop={15} >

                    <Pane width="100%">

                      <Tablist 
                          padding="none"
                          marginBottom={15} 
                          width="100%" 
                          marginLeft="none" 
                          marginRight={24}>

                        {["Single Event"].map((tab, index) => (
                          <Tab
                            marginLeft="none"
                            key={tab}
                            id={tab}
                            padding={18}
                            //["Single Event", "Recurring Event"]
                            //onSelect={() => setState({ selectedIndex: index })}
                            isSelected={index === 0}
                            aria-controls={`panel-${tab}`}
                          >
                            {tab}
                          </Tab>
                        ))}

                      </Tablist>

                    </Pane>


                    <Pane width="100%" marginTop={10} >

                      {["Single Event", "Recurring Event"].map((tab, index) => (
                        <Pane
                          key={index}
                          //id={`panel-${tab}`}
                          role="tabpanel"
                          aria-labelledby={tab}
                          //aria-hidden={index !== state.selectedIndex}
                          display={index === 0 ? 'block' : 'none'}
                        >

                          <Paragraph marginTop={10} >
                            Single event happens once and can last multiple days
                          </Paragraph> 


                          <Pane 
                              marginTop={10} 
                              width="60%" 
                              display="flex" 
                              justifyContent="space-between">

                                <Popover
                                    content={
                                      <Pane
                                        width={240}
                                        height="auto"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDirection="column">

                                        <DatePicker
                                          name="start"
                                          minDate={new Date()}
                                          value={new Date(props.getScheduleData.date.start)}
                                          onChange={handleStartDatePickerChange}/>

                                      </Pane>}>

                                    <Button 
                                      paddingTop={20} 
                                      paddingBottom={20} 
                                      paddingRight={10} 
                                      paddingLeft={10} 
                                      width="48%" 
                                      display="flex"
                                      justifyContent="space-between"> 

                                      <Pane>
                                        <CalendarIcon marginRight={5} color="#ddd" size={15} />
                                        Event Starts
                                      </Pane>

                                      <Paragraph size={300} marginLeft={3}>
                                          <span style={{ "color": "#1070CA" }}>
                                            { props.getScheduleData.date.start === "" ? 
                                              ""
                                              :
                                              dateFormat(props.getScheduleData.date.start, "dS mmm yyyy") 
                                            }
                                          </span> 
                                      </Paragraph> 

                                    </Button>

                                </Popover>


                                <SelectMenu
                                  height={250}
                                  title="Select Event Start Time"
                                  options={
                                    inAppDataCollections.event_time_ranges.map( data => ({ 
                                        label: data, 
                                        value: data 
                                      }))
                                  }
                                  name="start"
                                  Selected={props.getScheduleData.time.start}
                                  onSelect={ (item)=> handleStartTimeSelectChange(item, "start") }>

                                  <Button 
                                    paddingTop={20} 
                                    paddingBottom={20} 
                                    paddingRight={10} 
                                    paddingLeft={10}  
                                    display="flex" 
                                    justifyContent="space-between" 
                                    width="48%" 
                                    className="text_ellipses">

                                    <Pane>
                                      <TimeIcon marginRight={10} color="#ddd" size={15} />
                                      Start Time
                                    </Pane>

                                     <Paragraph size={300} marginLeft={3}>
                                          <span style={{ "color": "#1070CA" }}>
                                            { props.getScheduleData.time.start }
                                          </span> 
                                     </Paragraph> 

                                     <ChevronDownIcon/>

                                  </Button>

                                </SelectMenu>

                          </Pane>

                          
                           <Pane 
                              marginTop={20} 
                              width="60%" 
                              display="flex" 
                              justifyContent="space-between">

                                <Popover
                                    content={
                                      <Pane
                                        width={240}
                                        height="auto"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDirection="column"
                                      >
                                         <DatePicker
                                          name="end"
                                          minDate={new Date()}
                                          value={new Date(props.getScheduleData.date.end)}
                                          onChange={handleEndingDatePickerChange}/>

                                      </Pane>}>

                                    <Button 
                                      paddingTop={20} 
                                      paddingBottom={20} 
                                      paddingRight={10} 
                                      paddingLeft={10} 
                                      width="48%" 
                                      justifyContent="space-between"> 

                                      <Pane>
                                        <CalendarIcon marginRight={5} color="#ddd" size={15} />
                                        Event Ends 
                                      </Pane>

                                      <Paragraph size={300} marginLeft={3}>
                                          <span style={{ "color": "#1070CA" }}>
                                            { props.getScheduleData.date.end === "" ? 
                                            ""
                                            :
                                            dateFormat(props.getScheduleData.date.end, "dS mmm yyyy") 
                                            }
                                          </span> 
                                      </Paragraph> 

                                    </Button>

                                </Popover>


                                <SelectMenu
                                  height={250}
                                  title="Select Event End Time"
                                  options={
                                    inAppDataCollections.event_time_ranges.map( data => ({ 
                                        label: data, 
                                        value: data 
                                      }))
                                  }
                                  name="end"
                                  Selected={props.getScheduleData.time.end}
                                  onSelect={ (item)=> handleStartTimeSelectChange(item, "end") }>

                                  <Button 
                                    paddingTop={20} 
                                    paddingBottom={20} 
                                    paddingRight={10} 
                                    paddingLeft={10}  
                                    display="flex" 
                                    justifyContent="space-between" 
                                    width="48%" 
                                    className="text_ellipses">

                                    <Pane>
                                      <TimeIcon marginRight={10} color="#ddd" size={15} />
                                      End Time 
                                    </Pane>

                                    <Paragraph size={300} marginLeft={3}>
                                          <span style={{ "color": "#1070CA" }}>
                                            { props.getScheduleData.time.end }
                                          </span> 
                                     </Paragraph> 


                                     <ChevronDownIcon/>

                                  </Button>

                                </SelectMenu>


                          </Pane>


                          <Pane 
                              marginTop={20}
                              width="60%">

                                  <Paragraph marginTop={20} >
                                    Set your event Timezone, will be converted for visitors
                                  </Paragraph> 


                               <SelectMenu
                                  height={250}
                                  title="Select Event Timezone"
                                  options={
                                    inAppDataCollections.timezones_collection.map( data => ({ 
                                        label: data.label, 
                                        value: data.label 
                                      }))
                                  }
                                  name="end"
                                  Selected={props.getScheduleData.timezone}
                                  onSelect={ (item)=> handleSelectTimeZoneFromItems(item) }>

                                  <Button 
                                    paddingTop={20} 
                                    paddingBottom={20} 
                                    paddingRight={15} 
                                    paddingLeft={15}  
                                    display="flex" 
                                    marginTop={10}
                                    justifyContent="space-between" 
                                    width="48%" 
                                    className="text_ellipses">

                                    <Pane>
                                      TimeZone 
                                    </Pane>

                                    <Paragraph size={300} marginLeft={3}>
                                          <span style={{ "color": "#1070CA" }}>
                                            { props.getScheduleData.timezone.zone }
                                          </span> 
                                     </Paragraph> 

                                     <ChevronDownIcon/>

                                  </Button>

                                </SelectMenu>


                            </Pane>



                        </Pane>
                      ))}

                    </Pane>


                  </Pane>

              </Pane>

          </Pane>


          <Pane marginTop={60} width="90%"  className="mx-auto" >
            <hr/>
          </Pane>



          <Pane 
            marginTop={40}
            width="80%" 
            className="mx-auto"           
            display="flex" 
            justifyContent="space-between">

                <Paragraph marginTop={10} >
                  Looks like your event creation is halfway done
                </Paragraph> 

                <Pane 
                  width="60%" 
                  className="mx-auto"           
                  display="flex" 
                  justifyContent="space-between">

                    <Button 
                      padding={20} 
                      width="48%" 
                      justifyContent="center"
                      disabled={true}
                      onClick={()=> props.previousView() }> 
                        Discard
                    </Button>

                    <Button 
                      padding={20} 
                      width="48%" 
                      appearance="primary"
                      intent="success"
                      justifyContent="center"
                      onClick={()=>{  
                        if(props.getEditingState==="update"){
                          SubmitUpdateEvent() 
                        }else{
                          SubmitCreateEvent() 
                        }
                      }}> 
                        Continue <ArrowRightIcon marginLeft={10}/>
                    </Button>
                  
                </Pane>
          </Pane>

    </div>
  )
}



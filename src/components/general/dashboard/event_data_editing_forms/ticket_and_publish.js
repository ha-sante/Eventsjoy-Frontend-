import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../../utils/routes'
import inAppDataCollections from '../../../../utils/inAppData'
import Helpers from '../../../../utils/helpers'

import { 
	Pane, 
	Tablist, 
	Tab, 
	Heading,
	Paragraph,
  Button,
  TextInput,
  Popover,
  SelectMenu,
  Badge,
  IconButton
} from 'evergreen-ui'


import { 
  CreditCardIcon,
  ArrowRightIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon,
  PlusIcon,
  EditIcon,
  TrashIcon
} from 'evergreen-ui'

import{
  DatePicker,
  TimePicker
} from '@blueprintjs/datetime'

let dateFormat = require("dateformat");
let Validator = require('validatorjs');

export default function tickets_and_publish(props) {

  /*
	Set ticket state {paid, free, donation}

	ticket name
	ticket quantity
	ticket price

	ticket sales start date
	ticket sales start time

	ticket sales end date
	ticket sales end time

  */	

   function handleTextInputDataChange(e, index){
    let name = e.target.name;
    let value = e.target.value;

    let ready = { ...props.getTicketsData[index], [name]: value }

    let collection = [ ...props.getTicketsData ];
    collection[index] = ready;

    Helpers.log("collection", collection);
    
    props.setTicketsData(collection)
  }

  function handleTicketTimeSelectChange(value, name, index){
    Helpers.log("value", value.value);

    let readyTime = { ...props.getTicketsData[index].time, [name]: value.value }
    let readyObj = { ...props.getTicketsData[index], 'time': readyTime }

    let collection = [ ...props.getTicketsData ];
    collection[index] = readyObj;

    Helpers.log("collection", collection);
    
    props.setTicketsData(collection)
  }

  function handleTicketDatePickerChange(value, name, index){
    Helpers.log("value", value);

    let readyDate = { ...props.getTicketsData[index].date, [name]: value.toString() }
    let readyObj = { ...props.getTicketsData[index], 'date': readyDate }

    let collection = [ ...props.getTicketsData ];
    collection[index] = readyObj;

    Helpers.log("collection", collection);
    
    props.setTicketsData(collection)
  }

  
  function handleSelectTimeZoneFromItems(chosenItem, index){
    // find specific
    let found = inAppDataCollections.timezones_collection.filter( data =>{
        if(data.label === chosenItem.value){
           return data;
        }
    })[0];

    let readyObj = { 
      ...props.getTicketsData[index], 
      'timezone':  {  zone: found.timezone, label: found.label } 
    }

    let collection = [ ...props.getTicketsData ];
    collection[index] = readyObj;

    Helpers.log("collection", collection);
    
    props.setTicketsData(collection)
  }

  function handleSelectTicketType(typeName, index){
    let ready = { ...props.getTicketsData[index], type: typeName.toLowerCase() }

    let collection = [ ...props.getTicketsData ];
    collection[index] = ready;

    Helpers.log("collection", collection);
    
    props.setTicketsData(collection)
  }
  
  async function updateEventData(){

    // let ready = { 
    //   event_image: props.getEventImageData,
    //   event_description: props.getDescriptionData,
    // }

    // // data validation
    // if( validateFinalData(ready) ){

    //     try{
    //         let response = await updateEvent({ 
    //             variables: { "id": props.getEventReferenceId, "data": ready} 
    //         });

    //         Helpers.log("Create Event Response", response);      
    //         Helpers.notify(1, "Saved your event data successfully");
    //         props.nextView() // next view state
    //       }catch(error){
    //         Helpers.log("Error", error);
    //         Helpers.notify(2, "Failed to save event data, resolve this via chat");
    //       }

    //  }else{
    //     Helpers.notify(2, "Failed to save event data, the event image is required");
    //  } 
  }

  return (
    <Pane>


         <Pane 
            marginTop={40}
            width="80%" 
            className="mx-auto"           
            display="flex" 
            justifyContent="space-between">

              <Pane width="20%" marginTop={20} >

                <CreditCardIcon color="#ddd" size={80} />

              </Pane>

              <Pane width="80%" marginTop={20} >

                  <Heading size={700}> Event Tickets </Heading>

                  <Paragraph marginTop={10} >
          					Create a ticket collection if 
          					you want to sell multiple ticket types for people to use. 
                  </Paragraph> 

        
                   <Pane 
                     width="100%" 
                     height="auto" 
                     marginTop={15} 
                     borderRadius={4}
                     style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
                     padding={10}
                     marginBottom={20}>

                    { props.getTicketsData.map( (singleTicket, index)=>{
                      return(
                        <Pane 
                          key={index} 
                          padding={10} 
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center">

                          <Heading> 
                            <CreditCardIcon marginBottom={4} marginRight={10}/> 
                            {singleTicket.name} 
                          </Heading>

                          <Pane
                            display="flex"
                            justifyContent="space-between">
                            <Badge color="blue">{singleTicket.quantity} Available Tickets</Badge>
                            <Badge color="green" marginLeft={10}>${singleTicket.price} price</Badge>                       
                          </Pane>

                          <Pane className="d-flex align-items-center">

                              <IconButton 
                                onClick={ ()=> { Helpers.log("Hello") }}
                                icon={EditIcon} 
                                marginRight={6}/>

                              <IconButton 
                                onClick={ ()=> { Helpers.log("Hello") }}
                                icon={TrashIcon} 
                                marginRight={6} />

                          </Pane>

                        </Pane>
                        )
                      })
                    }
                  </Pane>

                  <Pane 
                     width="100%" 
                     height="auto" 
                     marginTop={15} 
                     borderRadius={4}
                     style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
                     padding={20}>


                    { props.getTicketsData && props.getTicketsData.map( (singleTicket, index)=>{
                      return(
                        <Pane
                          key={index}
                          background="white" 
                          width="100%">


                            <Pane width="100%" marginTop={10}>

                              <Tablist 
                                  padding="none"
                                  width="100%" 
                                  marginLeft="none" 
                                  marginRight={24}>
                                {["Paid", "Free", "Donation"].map((tab) => (
                                  <Tab
                                    marginLeft="none"
                                    key={tab}
                                    id={tab}
                                    padding={18}
                                    onSelect={() => { handleSelectTicketType(tab, index) }}
                                    isSelected={tab.toUpperCase() === props.getTicketsData[index].type.toUpperCase()}
                                    aria-controls={`panel-${tab}`}>
                                    {tab} Ticket
                                  </Tab>
                                ))}
                              </Tablist>
                            </Pane>

                            <Pane 
                              width="100%" 
                              display="flex"
                              marginBottom={20}
                              justifyContent="space-between"
                              alignItems="center">

                              <TextInput 
                                 marginTop={20}
                                 width="50%" 
                                 placeholder="Name of Ticket" 
                                 padding={22} 
                                 name="name"
                                 onChange={ (e)=> handleTextInputDataChange(e, index) }/>

                              <TextInput 
                                 marginTop={20}
                                 width="30%" 
                                 placeholder="Available Tickets Count" 
                                 padding={22} 
                                 name="quantity"
                                 onChange={ (e)=> handleTextInputDataChange(e, index) }/>

                              <Pane display="flex" width="15%" marginTop={20} alignItems="center">
                                <Paragraph width="15%" >$</Paragraph> 
                                <TextInput
                                   width="80%" 
                                   placeholder="Price" 
                                   padding={22} 
                                   name="price"
                                   onChange={ (e)=> handleTextInputDataChange(e, index) }/>
                              </Pane>

                            </Pane>

                            <Paragraph marginTop={10} >
                              When will the sales for the tickets start and end?
                            </Paragraph> 

                            <Pane 
                                marginTop={10} 
                                width="70%" 
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
                                            value={new Date(singleTicket.date.start)}
                                            onChange={ (value)=> handleTicketDatePickerChange(value,'start',index) }/>

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
                                          <CalendarIcon marginRight={2} color="#ddd" size={15} />
                                          Event Starts
                                        </Pane>

                                        <Paragraph size={300} marginLeft={3}>
                                            <span style={{ "color": "#1070CA" }}>
                                              { singleTicket.date.start === "" ? 
                                                ""
                                                :
                                                dateFormat(singleTicket.date.start, "dS mmm yyyy") 
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
                                    Selected={singleTicket.time.start}
                                    onSelect={ (value)=> handleTicketTimeSelectChange(value,"start",index) }>

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
                                              { singleTicket.time.start }
                                            </span> 
                                       </Paragraph> 

                                       <ChevronDownIcon/>

                                    </Button>

                                  </SelectMenu>
                            </Pane>

                            
                            <Pane 
                                marginTop={20} 
                                width="70%" 
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
                                            name="end"
                                            minDate={new Date()}
                                            value={new Date(singleTicket.date.end)}
                                            onChange={ (value)=> handleTicketDatePickerChange(value,'end',index) }/>

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
                                              { singleTicket.date.end === "" ? 
                                              ""
                                              :
                                              dateFormat(singleTicket.date.end, "dS mmm yyyy") 
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
                                    Selected={singleTicket.time.end}
                                    onSelect={ (value)=> handleTicketTimeSelectChange(value,"end",index) }>

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
                                              { singleTicket.time.end }
                                            </span> 
                                       </Paragraph> 


                                       <ChevronDownIcon/>

                                    </Button>

                                  </SelectMenu>
                            </Pane>


                            <Pane 
                                marginTop={20}
                                width="70%">

                                    <Paragraph marginTop={20} >
                                      Set your ticket sales Timezone, will be converted for visitors
                                    </Paragraph> 


                                 <SelectMenu
                                    height={250}
                                    title="Select Ticket Timezone"
                                    options={
                                      inAppDataCollections.timezones_collection.map( data => ({ 
                                          label: data.label, 
                                          value: data.label 
                                        }))
                                    }
                                    name="end"
                                    Selected={singleTicket.timezone}
                                    onSelect={ (item)=> handleSelectTimeZoneFromItems(item, index) }>

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
                                              { singleTicket.timezone.zone }
                                            </span> 
                                       </Paragraph> 

                                       <ChevronDownIcon/>

                                    </Button>

                                  </SelectMenu>
                            </Pane>

                            <Pane marginTop={20} display="flex" justifyContent="flex-end">
                              
                                { index !== 0 && <Button 
                                  padding={20} 
                                  width="30%" 
                                  justifyContent="center"
                                  onClick={updateEventData}
                                  marginRight={20}> 
                                   Cancel Ticket
                                </Button>}


                               <Button 
                                  padding={20} 
                                  width="30%" 
                                  appearance="primary"
                                  intent="success"
                                  justifyContent="center"
                                  onClick={updateEventData}> 
                                   Add Ticket <PlusIcon marginLeft={10}/>
                                </Button>

                            </Pane>

                        </Pane>
                        )
                    })}

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
                      onClick={()=> props.previousView() }> 
                        Go Back
                    </Button>

                    <Button 
                      padding={20} 
                      width="48%" 
                      appearance="primary"
                      intent="success"
                      justifyContent="center"
                      onClick={updateEventData}> 
                        Save & Continue <ArrowRightIcon marginLeft={10}/>
                    </Button>
                  
                </Pane>
          </Pane>


    </Pane>
  )
}



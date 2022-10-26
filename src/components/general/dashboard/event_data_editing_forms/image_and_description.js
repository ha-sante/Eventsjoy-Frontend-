import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import styles from '../../../../styles/index.module.css'
import Helpers from '../../../../utils/helpers'

import { 
  Button, 
  Heading, 
  Pane,
  TextInput, 
  Paragraph,
  Text,
  Textarea
} from 'evergreen-ui'

import { 
  NewTextBoxIcon,
  ChevronDownIcon,
  MapMarkerIcon,
  CameraIcon,
  ArrowRightIcon
} from 'evergreen-ui'


// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



import { gql, useQuery, useMutation } from '@apollo/client';

const UPDATE_EVENT = gql`
  mutation update_event($id: String!, $data: EventInput!) {
    update_event(id: $id, data: $data) {
      event_image{
        url
      }
    }
  }
`;

let Validator = require('validatorjs');

export default function DetailsAndTicketsForm(props) {

  const [updateEvent, { data }] = useMutation(UPDATE_EVENT);
  const [files, setFiles] = useState([])
  const [getUpdateFileSet, setUpdateFileSet] = useState(false)


  useEffect(()=>{

    // check if it is in update mode
    // if true, check if tru use the url to set the files
    if(props.getEditingState === "update"){

      if(props.getEventImageData){

        if(props.getEventImageData.url !== undefined){
          let files = [ { source: props.getEventImageData.url, options: { type: "local" } }  ]
          setFiles(files);
          setUpdateFileSet(true)
        }
        
      }

    }
  }, [])


  function handleTextInputDataChange(e){
    let name = e.target.name;
    let value = e.target.value;

    props.setDescriptionData({ ...props.getDescriptionData, [name]: value });
  }

  function handleEventImageUpload(data){

    // check if the files collection is zero
    // check if the current files array is not the same
    if(getUpdateFileSet === false){
      
      let result = Helpers.prepareImageUploadData(data, "prod_upload_preset", "testing");

      if(result){

        Helpers.uploadImageData(result).then( res => {
          props.setEventImageData({ url: res.data.secure_url })

          Helpers.log("Response", res);
          Helpers.notify(1, "Successfully uploaded your image");
        }).catch( (err)  =>{
          Helpers.log("Error", err);
          Helpers.notify(3, "Failed to upload image, please check your internet/contact support")
        })

      }else{
        Helpers.notify(3, "Failed to upload image, please upload 5mb size or less")
      }

    }else{ 
      setUpdateFileSet(false) 
    }

  }



  function validateFinalData(data){

    let rules = {
      'event_image.url': 'required',
    };

    let validation = new Validator(data, rules);

    return validation.passes(); // true
  }

  async function updateEventData(){

    let ready = { 
      event_image: props.getEventImageData,
      event_description: props.getDescriptionData,
    }

    // data validation
    if( validateFinalData(ready) ){

        try{
            let response = await updateEvent({ 
                variables: { "id": props.getEventReferenceId, "data": ready} 
            });

            Helpers.log("Create Event Response", response);      
            Helpers.notify(1, "Saved your event data successfully");
            props.nextView() // next view state
          }catch(error){
            Helpers.log("Error", error);
            Helpers.notify(2, "Failed to save event data, resolve this via chat");
          }

     }else{
        Helpers.notify(2, "Failed to save event data, the event image is required");
     } 
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

                <CameraIcon color="#ddd" size={80} />

              </Pane>

              <Pane width="80%" marginTop={20} >

                  <Heading size={700}> Main Event Image </Heading>

                  <Paragraph marginTop={10} >
                  This is the first image attendees will see at the top of your listing. 
                  Use a high quality image: 2160x1080px (2:1 ratio).
                  </Paragraph> 

                  <Pane marginTop={20} height="auto" >

                   <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={1}
                        name="files"
                        server={{
                          load: (source, load, error, progress, abort, headers) => {
                            var myRequest = new Request(source);
                            fetch(myRequest).then(function(response) {
                              response.blob().then(function(myBlob) {
                                load(myBlob);
                              });
                            });
                          }
                        }}
                        onaddfile={(err, data) => {
                           if(data){ handleEventImageUpload(data) } 
                         }}
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      />

                  </Pane>

              </Pane>

          </Pane>

          <Pane  marginTop={60} width="90%"  className="mx-auto" >
            <hr/>
          </Pane>

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

                  <Heading size={700}> Description </Heading>

                  <Paragraph marginTop={10} >
                    Add more details to your event like your schedule, sponsors, 
                    or featured guests.Learn more
                  </Paragraph> 

                  <Pane marginTop={20} >

                    <TextInput 
                       marginTop={20}
                       width="100%" 
                       placeholder="Summary of event details?" 
                       padding={22} 
                       name="summary"
                       onChange={handleTextInputDataChange}/>

                     <Textarea
                        marginTop={20}
                        name="hello"
                        placeholder="Welcome to this"
                        name="content"
                        onChange={handleTextInputDataChange}/>

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

    </div>
  )
}



import React, { useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import { 
  Button, 
  Heading, 
  Pane, 
  Dialog,
  Text,
 } from 'evergreen-ui'

import { 
  WarningSignIcon
} from 'evergreen-ui'


export default function deleteEventPrompt(props) {

  return (
      <Dialog
          isShown={props.getShowDeleteDialog}
          onCloseComplete={() => props.setShowDeleteDialog(false) }
          hasHeader={false}
          hasFooter={false}
          confirmLabel="Yes Delete Event">

                <Pane 
                  width="100%"
                  height="200px"
                  borderRadius={5}
                  style={{  
                    backgroundImage: `url(${props.getEventData.event_image ? props.getEventData.event_image.url: "/assets/images/banner.png"})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                   }}>
                  
                </Pane>

                 <Pane width={"100%"} alignItems="center" className="text-center" >
                          <Heading size={600} marginTop={20} > 
                            Please confirm event deletion 
                           </Heading>

                          <Text size={400} marginTop={10} > 
                                By confirming, the event will de deleted 
                                <br/> and not recoverable.
                        </Text>
                    </Pane>

                  
                    <Pane width={"100%"} alignItems="center" className="text-center" >
                        <Button 
                            appearance="primary" 
                            intent="danger"
                            marginTop={16} 
                            onClick={ ()=> props.deleteUserEvent(props.getEventData.id) } 
                        >
                          Yes delete
                        </Button>
                    </Pane>

      </Dialog>
  )
}



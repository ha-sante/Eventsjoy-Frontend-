import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../../../utils/routes'

import { 
  Button, 
  Heading, 
  Pane,
  SelectMenu
} from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'



export default function events_listing_cards_mutable_filterer() {
  return (
	 <Pane marginTop={60} height="auto" >
         
      <Pane 
        borderRadius={4}
        minHeight="100%"
        width="100%" 
        padding={20}
        style={{  
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
        }}
        >

          <Heading size={600} color="black"> 
            Filter Events
          </Heading>


           <SelectMenu
              title="Event Categories"
              options={
                ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']
                  .map(label => ({ label, value: label }))
              }
              selected={1}
            >

              <Button 
                marginTop={30}
                width="100%" 
                justifyContent="left" 
                appearance="none" 
                intent="none"> 

                Event Price 
              </Button>

            </SelectMenu>



           <SelectMenu
              title="Event Categories"
              options={
                ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']
                  .map(label => ({ label, value: label }))
              }
              selected={1}
            >

              <Button 
                marginTop={30}
                width="100%" 
                justifyContent="left" 
                appearance="none" 
                intent="none"> 

                Event Category 
              </Button>

            </SelectMenu>


           <SelectMenu
              title="Event Categories"
              options={
                ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']
                  .map(label => ({ label, value: label }))
              }
              selected={1}
            >

              <Button 
                marginTop={30}
                width="100%" 
                justifyContent="left" 
                appearance="none" 
                intent="none"> 

                Event Format 
              </Button>

            </SelectMenu>




           <SelectMenu
              title="Event Categories"
              options={
                ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']
                  .map(label => ({ label, value: label }))
              }
              selected={1}
            >

              <Button 
                marginTop={30}
                width="100%" 
                justifyContent="left" 
                appearance="none" 
                intent="none"> 

                Event Currency 
              </Button>

            </SelectMenu>


            <SelectMenu
              title="Event Categories"
              options={
                ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']
                  .map(label => ({ label, value: label }))
              }
              selected={1}
            >

              <Button 
                marginTop={30}
                width="100%" 
                justifyContent="left" 
                appearance="none" 
                intent="none"> 

                Event Date 
              </Button>

            </SelectMenu>


          <SelectMenu
              title="Event Categories"
              options={
                ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber']
                  .map(label => ({ label, value: label }))
              }
              selected={1}
            >

              <Button 
                marginTop={30}
                width="100%" 
                justifyContent="left" 
                appearance="none" 
                intent="none"> 

                Event Language 
              </Button>

            </SelectMenu>

        </Pane>

  </Pane>
  )
}

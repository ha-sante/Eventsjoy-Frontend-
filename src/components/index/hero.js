import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/index.module.css'

import { 
  Button, 
  Heading, 
  Pane, 
  TextInput 
} from 'evergreen-ui'



import { 
  MapMarkerIcon
} from 'evergreen-ui'



export default function home_hero_component() {
  return (
	 <Pane className={styles.hero} marginTop={60} >

     <Pane  
        display="flex" 
        width="100%" 
        height="100%" 
        justifyContent="between"
        className="d-flex align-items-center" 
        padding={20}>
       
        <Pane width="50%" className="hero-search-group" >

            <Pane width="100%" >

                <Heading size={900} width="80%" > 
                  Which event do you want to attend? 
                </Heading>

                <Heading size={400} width="80%" marginTop={10} > 
                  Click here to find events near you <MapMarkerIcon size={15} />
                </Heading>

            </Pane>

            <TextInput
              placeholder="Which event do you want to attend?"
              height="50px"
              marginTop={10}
              padding={15}
              width="60%"
              borderRadius={5}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
              }}
            />

        </Pane>


        <Pane 
          width="50%" 
          height="500px"
          display="flex"
          alignItems="right"
          justifyContent="flex-end"
          className="">


          <Pane 
            className="hero-image-tiles" 
            display="flex" 
            flexWrap="wrap" 
            width="100%" 
            height="100%" 
            alignItems="center"
            padding={5}
            //border="default"
            >
              

              {
                [
                  {height: "60%", image: "/assets/images/event.png"},
                  {height: "60%", image: "/assets/images/event2.png"},
                  {height: "30%", image: "/assets/images/event3.png"},
                  {height: "30%", image: "/assets/images/event4.png"},
                ].map( (imageData, index)=> {
                  return(
                    <Pane 
                      key={index}
                      className="hero-image-tile"
                      borderRadius={4}
                      padding={10}
                      height={imageData.height} 
                      width="45%" 
                      margin={15}
                      style={{  
                          backgroundImage: `url(${imageData.image})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                        }}
                      >
                    </Pane>
                  )
                })
              }
             

          </Pane>



        </Pane>



     </Pane>

  </Pane>
  )
}

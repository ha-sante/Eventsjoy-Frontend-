import Head from 'next/head'
import Link from 'next/link'
import RoutesCollection from '../utils/routes'

import styles from '../styles/index.module.css'

import { Button, Heading, Pane } from 'evergreen-ui'

import { 
  ArrowRightIcon
} from 'evergreen-ui'


import IndexHeader from '../components/index/header'
import IndexFooter from '../components/index/footer'
import IndexHero from '../components/index/hero'

import ClosetEventsListing from '../components/general/closet_events_listing'
import EventsListingCardsSet from '../components/general/events_listing_cards_set'
import EventsListingCardsMutable from '../components/general/listings/events_listing_cards_mutable'
import EventsListingCardsMutableFilterer from '../components/general/listings/events_listing_cards_mutable_filterer'


export default function events_listing() {
  return (
  <div className={styles.container}>

      <IndexHeader/>

      <main className={styles.main}>

        <Pane  
          display="flex"
          width="90%" 
          className="mx-auto"
          justifyContent="center"
        >

          <Pane width="20%">
              <EventsListingCardsMutableFilterer/>
          </Pane>

          <Pane width="80%">
            <EventsListingCardsMutable/>
          </Pane>

        </Pane>
       
      </main>

      <IndexFooter/>

    </div>
  )
}

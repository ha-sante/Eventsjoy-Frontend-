import Head from 'next/head'
import styles from '../styles/index.module.css'

import IndexHeader from '../components/index/header'
import IndexFooter from '../components/index/footer'
import IndexHero from '../components/index/hero'


import ClosetEventsListing from '../components/general/closet_events_listing'
import EventsListingCardsSet from '../components/general/events_listing_cards_set'


export default function Home() {
  return (
    <div className={styles.container}>

      <IndexHeader/>

      <main className={styles.main}>
      
      	<IndexHero/>
      	
        <ClosetEventsListing/>

        <hr/>

        <EventsListingCardsSet/>

      </main>

      <IndexFooter/>

    </div>
  )
}

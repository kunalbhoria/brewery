import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

import Link from 'next/link';
import styles from '../styles/style.module.css'

export default function Home({ randomData }) {

  const [randomBrew , setRandomBrew] = useState(randomData)

  const handleClick = async()=>{
    let randomReq = await fetch(`https://api.openbrewerydb.org/breweries/random`)
    const randomBrew = await randomReq.json();
    setRandomBrew(randomBrew)
   
  }

  return (
    <>
    <Head>
    <title>Cheer With Us</title>
            <meta name="description" content="Find all breweries list. All information about breweries you want is here. Find a surprise for you. " />
            <link rel="canonical" href="/" />
    </Head>
      <div>
        <div className={styles.base}>
        </div>
        <div className={styles.main}>
          <div className={styles.center}>
            <div className={styles.nav}>
              <Link href='/all'>
             🍻 SHOW ALL
              </Link>
              <p onClick={handleClick}>
             🍺 SURPRISE ME
              </p>
            </div>
            <div className={styles.dataBox}>
              <p className={styles.location}>{randomBrew[0].street}, {randomBrew[0].state}, {randomBrew[0].country}, {randomBrew[0].postal_code}</p>
              <h2 className={styles.name}>{randomBrew[0].name}</h2>
              <p className={styles.type} >{randomBrew[0].brewery_type}</p>
              <a href={randomBrew[0].website_url}>{randomBrew[0].website_url}</a>
              {/* <p className={styles.beer}>🍻</p> */}
              <img className={styles.beer} src='/beer4.png' />
            </div>
          </div>
        </div>
      </div>
    </>
  )


}


export async function getServerSideProps(context) {
  try {
    let randomReq = await fetch(`https://api.openbrewerydb.org/breweries/random`)
    const randomBrew = await randomReq.json();
    // console.log(data);

    let allBrew = await fetch(`https://api.openbrewerydb.org/breweries`)
    const data = await allBrew.json();
    return {
      props: { randomData: JSON.parse(JSON.stringify(randomBrew)), data: JSON.parse(JSON.stringify(data)) }
    }

  } catch (error) {
    console.log(error)
    return {
      props: { randomBrew: [], data: [] }
    }
  }
}

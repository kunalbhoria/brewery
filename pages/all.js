import { useState, useEffect } from 'react'
import styles from '../styles/all.module.css';
import Card from '../component/card';
import Link from 'next/link';
import Head from 'next/head';

function All({ data }) {

    const [allBrew, setAllBrew] = useState(data)
    const [page, setPage] = useState(1)
    
    const defaultCity = ['All', 'new_york', 'los_angeles', 'phoenix', 'chicago', 'colorado'];
    
    const defaultType = ['All', 'micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor', 'closed'];
    
    const [name, setName] = useState('');
    const [type, setType] = useState('All');
    const [city, setCity] = useState('All');
    
    
    const filterData = () => {
        
        let filterdData = data.filter(brew => {
            if (brew.name.toLowerCase().indexOf(name.trim().toLowerCase()) >= 0 || name == "") {
                if (type == "All" || type == brew.brewery_type) {
                    if (city == "All" || city == brew.city) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
        });
        // console.log(filterdData)
        
        setAllBrew(filterdData);
        
    };
    
    useEffect(() => {
        
        filterData();
        
    },[name,type,city]);
    
    
    
    useEffect(()=>{
        
        page>1 && setPage(1)
    },[allBrew]);
    
    
    let cityOptions = defaultCity.map(value => <option key={value} value={value} >{value.replace(/_/g, ' ')}</option>)
    let typeOptions = defaultType.map(value => <option key={value} value={value} >{value}</option>)
    
    const pageCount = allBrew.length / 9;

    let pagination = []
    for (let n = 1; n <= pageCount; n++) {
        pagination.push(<p style={{ backgroundColor: page == n ? 'gainsboro' : 'rgba(250, 235, 215, 0.71)' }} onClick={() => setPage(n)} className={styles.page} key={n}>{n}</p>)
    }
    let namecard = [];

    for (let n = 0; n < 9; n++) {
        const randomNumber = Math.floor(Math.random()*7 + 1)

        if (page == 1) {
            allBrew[n] && namecard.push(<Card key={allBrew[n].id} randomNumber={randomNumber} brew={allBrew[n]} />);
        } else {
            let i = n + (page - 1) * 9
            allBrew[i] && namecard.push(<Card key={allBrew[i].id} randomNumber={randomNumber} brew={allBrew[i]} />);
        }
    }
    //  allBrew.map(brew => <Card key={brew.id} brew={brew} />);
    // console.log(page)
    return (
        <>
        <Head>
    <title>Find your breweries</title>
    <meta name="description" content="Find all breweries list. All information about breweries you want is here. Find a surprise for you. " />
    <link rel="canonical" href="/" />
    </Head>
        <div>

            <div className={styles.base}>
            </div>

            <Link href='/'><a className={styles.homeLink}>Home Page</a></Link>
            <div className={styles.head}>
                <h2>Here Are All the Breweries.</h2>
            </div>

            <div className={styles.searchBox}>
                <div className={styles.inputBox}>
                    <input type='text' value={name} placeholder='Search here ....' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.filterBox}>

                    <label>
                        Select City
                        <select name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)}>
                            {cityOptions}
                        </select>
                    </ label>

                    <label>
                        Select Type
                        <select name='type' id="type" value={type} onChange={(e) => setType(e.target.value)} >
                            {typeOptions}
                        </select>
                    </label>

                </div>
            </div>
            <div className={styles.cardBox}>
                {namecard}
            </div>
            <div className={styles.paginationBox}>
                {pagination}
            </div>
        </div>
        </>
    )
}

export default All;




export async function getServerSideProps(context) {
    try {

        let allBrew = await fetch(`https://api.openbrewerydb.org/breweries`)
        const data = await allBrew.json();
        return {
            props: { data: JSON.parse(JSON.stringify(data)) }
        }

    } catch (error) {
        console.log(error)
        return {
            props: {  data: [] }
        }
    }
}

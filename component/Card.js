import {useState} from 'react';
import styles from '../styles/all.module.css'
import Image from 'next/image';

function Card({brew,randomNumber}) {
    
    const [isHover,setIsHover] = useState(false);
 
  return (
    <div
     style={{backgroundColor:isHover ? 'rgba(153, 205, 50, 0.395)':'#9b4f347b'}} 
    className={styles.card} 
    onMouseOver={()=>setIsHover(true)}
    onMouseOut={()=>setIsHover(false)} >

        {isHover ? (<div className={styles.secondary}>
        <h2>{brew.name}</h2> 
        <p>{brew.brewery_type}</p>
        <p>{brew.street}, {brew.state}, {brew.country}, {brew.postal_code}</p>
        <a href={brew.website_url}>{brew.website_url}</a>
    </div>)
       :(
   <div className={styles.primary}>
    <div>
       <Image src={`/b${randomNumber}.jpg`} height='120px' width='200px' layout='responsive' />
       </div>
       <h2>{brew.name}</h2>
   </div>
       )
}
    </div>
          )
}

export default Card
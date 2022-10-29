import Image from 'next/image';
import styles from '../styles/not-found.module.css';

function NotFound() {
  return (
    <div className={styles.main} >
      <h1 className={styles.mainHeading} >500 Internal Server Error</h1>
      <p className='breadcrumb' ><a href='/'>Home</a> &gt; <span>500</span></p>
      <p className={styles.description} >It appears that the page you're looking for is having some error. For relevant pages, check out our <a href='/'>homepage</a>.</p>
      <div className={styles.secondary} >
        <div className={styles.imgBox} >
          <Image alt="page not found" src='/beer.png' height='150px' width='150px' layout='responsive' />
        </div>
        <div className={styles.right} ><h4><span>500 Page</span><span>Internal Server Error!</span></h4></div>
      </div>
    </div>
  )
}

export default NotFound;
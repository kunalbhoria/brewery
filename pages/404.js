import Image from 'next/image';
import styles from '../styles/not-found.module.css';

function NotFound() {
  return (
    <div className={styles.main} >
      <h1 className={styles.mainHeading} >404 Not Found</h1>
      <p className='breadcrumb' ><a href='/'>Home</a> &gt; <span>404</span></p>
      <p className={styles.description} >It appears that the page you're looking for is not available on our website. For relevant pages, check out our <a href='/'>homepage</a>.</p>
      <div className={styles.secondary} >
        <div className={styles.imgBox} >
          <Image alt="page not found" src='/beer.png' height='150px' width='150px' layout='responsive' />
        </div>
        <div className={styles.right} ><h4><span>404 Page</span><span>Not Found!</span></h4></div>
      </div>
    </div>
  )
}

export default NotFound;
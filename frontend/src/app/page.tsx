import styles from '../../styles/Start.module.css';
import ImagesSection from './components/start/ImagesSection';
import MiddleSection from './components/start/MiddleSection';
import NavBar from './components/start/NavBar';
import Title from './components/start/Title';

export default function MainPage() {
  return (
    <>
      <div className={styles.mainNavBar}>
        <Title />
        <NavBar />
      </div>
      <MiddleSection />
      <ImagesSection />
    </>
  );
}

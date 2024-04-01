'use client';

import styles2 from '../../../styles/Dashboard.module.css';
import ReduxProvider from '../../store/StoreProvider';
import Test from '../components/dashboard/Test';
import ChartTitle from '../components/public/AuthSectionTitle';
import IconSection from '../components/public/IconsSection';

export default function Dashboard() {
  const data = [
    {
      text: 'Dashboard',
      img: 'dashboard.svg',
    },
    {
      text: 'Favorites',
      img: 'fav.svg',
    },
    {
      text: 'All files',
      img: 'folder.svg',
    },
    {
      text: 'Settings',
      img: 'settings.svg',
    },
    {
      text: 'Support',
      img: 'support.svg',
    },
    {
      text: 'Logout',
      img: 'logout.svg',
    },
  ];
  return (
    <ReduxProvider>
      <div className={styles2.leftPanel}>
        <ChartTitle />
        <div>
          {data.map((item, index) => (
            <Test key={index} text={item.text} img={item.img} />
          ))}
        </div>
        <div className={styles2.dragAndDrop}>
          <img src='upload.svg' />
          <p>Upload files</p>
          <p>Drag or click here</p>
        </div>
        <IconSection />
      </div>
      <div className={styles2.rightPanel}></div>
    </ReduxProvider>
  );
}

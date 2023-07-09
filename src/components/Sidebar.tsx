import React from 'react';
import Image from 'next/image';

import styles from '@/styles/components/Sidebar.module.css';

const Sidebar = () => (
  <div className={styles.container}>
    <Image src="/Brand.png" width={40} height={24} alt="Henry challenge" className={styles.brand} />
    <button type="button" className={`${styles.gap} ${styles.button}`}>
      <Image src="/file-text.svg" width={24} height={24} alt="File" />
    </button>
  </div>
);

export default Sidebar;

import React from 'react';

import styles from '@/styles/components/Loading.module.css';

const Loading = () => (
  <div className={styles.container}>
    <div className={styles.loader} />
  </div>
);

export default Loading;

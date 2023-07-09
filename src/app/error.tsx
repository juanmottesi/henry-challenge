'use client'

import React from 'react';

import styles from '@/styles/error.module.css';

const Error = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      {`Sorry is not you, it's us.`}
    </div>
  </div>
);

export default Error;

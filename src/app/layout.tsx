import React from 'react';
import { Nunito } from 'next/font/google';

import Sidebar from '@/components/Sidebar';

import styles from '@/styles/layout.module.css';

const nunito = Nunito({ subsets: ['latin'], weight: '400' });

export const metadata = { title: 'Leaderboard' };

const RootLayout = ({ children, }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${nunito.className} ${styles.body}`}>
      <div className={styles.template}>
        <Sidebar />
        <div className={styles.childrenContainer}>
          {children}
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;

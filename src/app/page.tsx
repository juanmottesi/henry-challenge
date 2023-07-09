import LeaderboardCard from '@/components/LeaderboardCard';
import Api from '@/services/Api';
import React from 'react';

import styles from '@/styles/Page.module.css';

const Home = async () => {
  const tours = await Api.getTours();

  return (
    <main>
      <h1 className={styles.title}>Golf Leaderboard</h1>
      <LeaderboardCard tours={tours} />
    </main>
  )
}


export default Home;
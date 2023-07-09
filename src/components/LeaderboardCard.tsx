'use client';

import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';

import { Ranking, Tour, Tours } from '@/services/ApiUtils';
import Api from '@/services/Api';

import CustomPagination from './CustomPagination';
import Loading from './Loading';

import SelectStyles from '@/styles/components/SelectStyles';
import styles from '@/styles/components/LeaderboardCard.module.css';

type LeaderboardCard = {
  tours: Tours;
};

type OptionType = {
  label: string | number;
  value: number;
};

const columns = [
  {
    dataField: 'position',
    text: '#',
    headerClasses: `${styles.tableElement} ${styles.separator}`,
    classes: styles.tableElement,
  },
  {
    dataField: 'name',
    text: 'name',
    headerClasses: `${styles.tableElement} ${styles.separator}`,
    classes: styles.tableElement,
  },
  {
    dataField: 'points',
    text: 'points',
    headerClasses: `${styles.tableElement} ${styles.separator} ${styles.withoutSeparatorBeforeLG}`,
    classes: styles.tableElement,
  },
  {
    dataField: 'amountWins',
    text: '# of wins',
    headerClasses: `${styles.tableElement} ${styles.separator} ${styles.displayLG}`,
    classes: `${styles.tableElement} ${styles.displayLG}`,
  },
  {
    dataField: 'amountTopTens',
    text: `# of top 10's`,
    headerClasses: `${styles.tableElement} ${styles.separator} ${styles.displayLG}`,
    classes: `${styles.tableElement} ${styles.displayLG}`,
  },
  {
    dataField: 'amountEvents',
    text: '# of events',
    headerClasses: `${styles.tableElement} ${styles.displayLG}`,
    classes: `${styles.tableElement} ${styles.displayLG}`,
  },
];

const LeaderboardCard = ({ tours }: LeaderboardCard) => {
  const [waiting, setWaiting] = useState(false);
  const [tourSelected, setTourSelected] = useState<Tour & OptionType>();
  const [seasonSelected, setSeasonSelected] = useState<OptionType | null>(null);
  const [ranking, setRanking] = useState<Ranking>([]);
  const [errorMessage, setErrorMessage] = useState('Select tournament and season.');

  const tourOptions = tours.map((tour) => ({ value: tour.id, label: tour.name, ...tour }));
  const seasonOptions = tourSelected?.seasons.map((season): OptionType => ({ label: season, value: season })) || [];

  const handleTourChange = (option: SingleValue<Tour & OptionType>) => {
    if (option) {
      setTourSelected(option);
      if (seasonSelected && !option.seasons.includes(seasonSelected.value)) {
        setSeasonSelected(null);
        setRanking([]);
        setErrorMessage('Select tournament and season.');
      }
    }
  };

  useEffect(() => {
    if (tourSelected && seasonSelected) {
      setWaiting(true);
      setRanking([]);
      Api.getRanking(tourSelected.value, seasonSelected.value)
        .then((ranking) => setRanking(ranking))
        .catch(() => setErrorMessage('Not found results.'))
        .finally(() => setWaiting(false));
    }
  }, [tourSelected, seasonSelected]);

  return (
    <PaginationProvider pagination={paginationFactory({ custom: true, totalSize: ranking.length })}>
      {
        ({ paginationProps, paginationTableProps }) => (
          <>
            <div className={styles.card}>
              <div className={styles.headerContainer}>
                <Select
                  id="Tour"
                  options={tourOptions}
                  value={tourSelected}
                  onChange={handleTourChange}
                  styles={SelectStyles}
                  isSearchable={false}
                  placeholder="Tour"
                />
                <Select
                  id="Season"
                  options={seasonOptions}
                  value={seasonSelected}
                  onChange={(option) => option && setSeasonSelected(option)}
                  styles={SelectStyles}
                  isSearchable={false}
                  placeholder="Season"
                />
              </div>
              <div>
                <BootstrapTable
                  {...paginationTableProps}
                  keyField="id"
                  data={ranking}
                  columns={columns}
                  wrapperClasses={styles.table}
                  headerClasses={styles.headerTable}
                />
                {waiting && <Loading />}
                {!ranking.length && !waiting && (
                  <div className={styles.emptyContainer}>
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
            {!!ranking.length && <CustomPagination
              page={paginationProps.page || 1}
              sizePerPage={paginationProps.sizePerPage || 10}
              onPageChange={paginationProps.onPageChange || (() => null)}
              totalSize={paginationProps.totalSize || 0}
            />}
          </>
        )
      }
    </PaginationProvider>
  );
};

export default LeaderboardCard;

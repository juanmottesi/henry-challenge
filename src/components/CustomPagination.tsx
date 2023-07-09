import React from 'react';
import Image from 'next/image';

import styles from '@/styles/components/CustomPagination.module.css';

type CustomPaginationType = {
  page: number;
  sizePerPage: number;
  onPageChange: (newPage: number, sizePerPage: number) => void;
  totalSize: number;
}

const CustomPagination = ({ page, sizePerPage, onPageChange, totalSize }: CustomPaginationType) => {
  const amountOfPages = Math.ceil(totalSize / sizePerPage) || 1;

  const handleNextPage = () => {
    if (page === amountOfPages) return;
    onPageChange(page + 1, sizePerPage);
  }

  const handlePrevPage = () => {
    if (page === 1) return;
    onPageChange(page - 1, sizePerPage);
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={handlePrevPage}>
        <Image src="/chevron-left.svg" alt="prev" width={24} height={24} />
      </button>
      <div className={styles.textContainer}>
        {page}
        <span className={styles.grey}>de</span>
        {amountOfPages}
      </div>
      <button type="button" className={styles.button} onClick={handleNextPage}>
        <Image src="/chevron-right.svg" alt="next" width={24} height={24} />
      </button>
      <div className={styles.textContainer}>
        {totalSize}
        <span className={styles.grey}>items</span>
      </div>
    </div>
  );
};

export default CustomPagination;

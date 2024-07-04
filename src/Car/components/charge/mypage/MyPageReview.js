import React from 'react';
import styles from '../scss/MyPageCharge.module.scss';
const MyPageReview = () => {
  return (
    <>
      <div className={styles.reservationList}>
        <h3 style={{ textAlign: 'center' }}>
          내가 쓴 리뷰
        </h3>

        <div className={styles.flex}>
          <div className='value'>날짜 및 시간</div>
          <div></div>
        </div>
        <div className={styles.flex}>
          <div className='value'>충전소/전기차</div>
          <div>OOO 충전소</div>
        </div>
        <div className={styles.flex}>
          <div className='value'>제목</div>
          <div>123456</div>
        </div>
      </div>
    </>
  );
};

export default MyPageReview;

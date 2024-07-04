import React, { useState } from 'react';
import styles from '../scss/SmallScreen.module.scss';
import QuickMarker from '../assets/img/marker-quick.png';
import SlowMarker from '../assets/img/marker-slow.png';
import DisableMarker from '../assets/img/marker-disable.png';

const SmallScreen = ({ onToggle, filter }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle('disable');
  };

  return (
    <div className={styles.smallScreen}>
      <span className={styles.markerList}>
        <img src={QuickMarker} alt='급속' />
        <span>급속</span>
      </span>
      <span className={styles.markerList}>
        <img src={SlowMarker} alt='완속' />
        <span>완속</span>
      </span>
      <span
        className={`${styles.markerList} ${isChecked ? styles.active : styles.inactive}`}
        onClick={handleToggle}
        style={{ cursor: 'pointer' }}
      >
        <img src={DisableMarker} alt='이용자 제한' />
        <span>이용 제한 충전소 표시하기</span>
        <input
          type='checkbox'
          className={styles.markerCheckbox}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </span>
    </div>
  );
};

export default SmallScreen;

import React, { useContext } from 'react';
import styles from './reservation_css/CarInfo.module.scss';
import { CarContext } from '../../../../contexts/CarContext';

// CarSwiperReal.js에서 불러온 rentCar를 집어넣음
const CarInfo = () => {
  const { selectedCar } = useContext(CarContext);

  if (!selectedCar) {
    return (
      <div className={styles.thisCar}>
        예약하실 차량을 선택해 주세요.
      </div>
    );
  }

  return (
    <>
      <div className={styles.carInfoContainer}>
        {/* rentCar(전기차목록)을 map해서 전부 보여줌. car는 car 말고 c 같은거 넣어도 됨. (ex -> c.carName) */}
        {/* CarDetailResponseDTO ->
          private String id;
          private String carName;
          private String carCompany;
          private int maximumPassenger;
          private Year carYear;
          private int carPrice;
          private String carPicture;
          private CarOptions carOptions; // 안넣음
          private String category;
          여기 적힌 값을 그대로 오타 없이 가져와야 함
         */}
        <div
          className={styles.selectedCar}
          key={selectedCar.carId}
        >
          <img
            src={selectedCar.carPicture}
            alt='자동차 이미지'
            style={{
              width: '100%',
            }}
          />
          {/* <div>===================</div> */}
          <div className={styles.selectinfo}>
            <div className={styles.selectcarbox}>
              <div className={styles.selinformation}>
                차종
              </div>
              :
              <div className={styles.selinformation2}>
                {selectedCar.carName}
              </div>
            </div>
            <div className={styles.selectcarbox}>
              <div className={styles.selinformation}>
                제조회사
              </div>
              :
              <div className={styles.selinformation2}>
                {selectedCar.carCompany}
              </div>
            </div>
            <div className={styles.selectcarbox}>
              <div className={styles.selinformation}>
                연식
              </div>
              :
              <div className={styles.selinformation2}>
                {selectedCar.carYear}년
              </div>
            </div>

            <div className={styles.selectcarbox}>
              <div className={styles.selinformation}>
                종류
              </div>
              :
              <div className={styles.selinformation2}>
                {selectedCar.category}
              </div>
            </div>
            <div className={styles.selectcarbox}>
              <div className={styles.selinformation}>
                탑승인원
              </div>
              :
              <div className={styles.selinformation2}>
                최대 {selectedCar.maximumPassenger}명
              </div>
            </div>
            <div className={styles.selectcarbox}>
              <div className={styles.selinformation}>
                가격
              </div>
              :
              <div className={styles.selinformation2}>
                {selectedCar.carPrice}원 (렌트가격)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInfo;

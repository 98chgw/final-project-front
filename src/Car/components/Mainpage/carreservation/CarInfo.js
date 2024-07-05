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
          style={{
            display: 'flex',
            marginTop: '50px',
          }}
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
              차종 :{selectedCar.carName}
            </div>
            <div className={styles.selectcarbox}>
              제조회사 :{selectedCar.carCompany}
            </div>
            <div className={styles.selectcarbox}>
              연식 :{selectedCar.carYear}년
            </div>

            <div className={styles.selectcarbox}>
              종류 :{selectedCar.category}
            </div>
            <div className={styles.selectcarbox}>
              탑승인원 : 최대 {selectedCar.maximumPassenger}
              명
            </div>
            <div className={styles.selectcarbox}>
              가격 :{selectedCar.carPrice}원 (렌트가격)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInfo;

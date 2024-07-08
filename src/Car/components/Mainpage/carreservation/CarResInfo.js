import styles from './reservation_css/CarResInfo.module.scss';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { CarContext } from '../../../../contexts/CarContext';
import AuthContext from '../../../../util/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config/host-config';
import { useNavigate } from 'react-router-dom';

const MAX_EXTRA_LENGTH = 255; // 비고 최대 글자 수

const CarResInfo = ({
  pickup,
  returning,
  totalPrice,
  onExtraChange,
}) => {
  const { selectedCar } = useContext(CarContext); // db에서 자동차 정보 가져온 것.

  const { isLoggedIn } = useContext(AuthContext); // 로그인 중인지?

  const [extra, setExtra] = useState(''); // 비고
  const [warning, setWarning] = useState(''); // 경고 메시지 상태

  const { userName, phoneNumber } = useContext(AuthContext); // 유저 정보 가져오기

  const token = localStorage.getItem('ACCESS_TOKEN'); // 로컬 토큰

  const navigate = useNavigate();

  const handleExtraChange = (e) => {
    const newExtra = e.target.value;
    if (newExtra.length <= MAX_EXTRA_LENGTH) {
      setExtra(newExtra);
      setWarning(''); // 경고 메시지 제거
      onExtraChange(newExtra); // 부모 컴포넌트에 extra 값 전달
    } else {
      setWarning('최대 255자까지 입력할 수 있습니다.'); // 경고 메시지 설정
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      console.error('유저를 찾을 수 없습니다.');
    }
  }, [isLoggedIn]);

  const formatDate = (date) => {
    if (!date) return '선택되지 않음';
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);

    // 마지막 마침표 제거
    return formattedDate.replace(/.$/, '');
  };

  const formatTime = (time) => {
    if (!time) return '선택되지 않음';
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('유저를 찾을 수 없습니다. 로그인 하세요.');
      return;
    }

    const reservationData = {
      token,
      carId: selectedCar.id,
      rentDate: pickup.date,
      turninDate: returning.date,
      rentTime: formatTime(pickup.time),
      turninTime: formatTime(returning.time),
      totalPrice,
      extra,
    };

    try {
      const res = await axios.post(
        API_BASE_URL + '/rentcar/reservation',
        reservationData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('예약 성공~!!!', res.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  if (!isLoggedIn) {
    navigate('/Login');
    return <div>회원만 예약이 가능합니다.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.resInfo}>
        <div className={styles.resName}>
          이름: {userName}
        </div>
        <div className={styles.phoneNumber}>
          전화번호: {phoneNumber}
        </div>
        <div>예약하실 자동차: {selectedCar.carName}</div>
        <div className={styles.date}>
          픽업 날짜: {formatDate(pickup.date)}
        </div>
        <div className={styles.date}>
          반납 날짜: {formatDate(returning.date)}
        </div>
        <div className={styles.time}>
          픽업 시간: {formatTime(pickup.time)}
        </div>
        <div className={styles.time}>
          반납 시간: {formatTime(returning.time)}
        </div>
        <div>결제 금액: {totalPrice} 원</div>
        <div className={styles.extra}>
          메모:
          <input
            type='text'
            value={extra}
            onChange={handleExtraChange}
            maxLength={MAX_EXTRA_LENGTH} // 입력 최대 길이 설정
          />
          {warning && (
            <div className={styles.warning}>{warning}</div>
          )}{' '}
          {/* 경고 메시지 표시 */}
        </div>
      </div>
    </form>
  );
};

export default CarResInfo;

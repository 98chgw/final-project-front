import React, { useContext, useEffect } from 'react';
import { ReserveStationContext } from '../../../../../contexts/ReserveStationContext';

const ReservedStationMap = () => {
  const { reserveStation, setReserveStation } = useContext(
    ReserveStationContext,
  );

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/admin',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setReserveStation(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStations();
  }, [setReserveStation]);

  const handleCancelReservation = async (reservationNo) => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(
        // 마이페이지에 예약번호 기준으로 예약 취소되는거 훔쳐옴.
        `http://localhost:8181/mypage?reservationNo=${reservationNo}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      // 예약 취소가 성공하면 UI에서 해당 예약을 제거
      setReserveStation((prevStations) =>
        prevStations.filter(
          (station) =>
            station.reservationNo !== reservationNo,
        ),
      );
    } catch (error) {
      console.error(error);
      alert('예약 취소에 실패했습니다.');
    }
  };

  const formatRentTime = (rentTime) => {
    const date = new Date(rentTime);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: true,
    });
  };

  const formatRentEndTime = (rentTime, time) => {
    const date = new Date(rentTime);
    date.setMinutes(date.getMinutes() + time);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: true,
    });
  };

  const AdminContents = () => {
    return (
      <>
        {reserveStation.map((e) => (
          <div className='list-body' key={e.reservationNo}>
            <div className='res-no'>{e.reservationNo}</div>
            <div className='res-user-name'>
              <div>{e.name}</div>
              <div>{e.phoneNumber}</div>
            </div>
            <div className='res-user-no'></div>
            <div className='res-station-name'>
              {e.stationName}
            </div>
            <div className='res-station-time'>
              <div>{formatRentTime(e.rentTime)}</div>
              <div>
                ~ {formatRentEndTime(e.rentTime, e.time)}
              </div>
            </div>
            <button
              className='res-cancel-btn'
              onDoubleClick={() =>
                handleCancelReservation(e.reservationNo)
              }
            >
              취소
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {reserveStation.length > 0 ? (
        <>
          <AdminContents />
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          예약된 충전소가 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservedStationMap;

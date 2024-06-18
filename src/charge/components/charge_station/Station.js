import React, { useContext } from 'react';
import '../scss/ChargeStationList.scss';
import { MapContext } from '../contexts/MapContext';

const Station = ({
  index,
  StationName,
  StationAddress,
  ChargeSpeed,
  ChargeType,
  ChargeCompany,
  Facilities,
  Availability,
  lat,
  lng,
}) => {
  const {
    setSelectedStation,
    setSelectedMarkerIndex,
    setMapLevel,
  } = useContext(MapContext);

  // 위치 찾기 버튼 클릭 시 발동하는 함수
  const handleLocateClick = () => {
    setSelectedStation({ lat, lng }); // 선택된 좌표 업데이트
    setSelectedMarkerIndex(index); // 선택된 마커 인덱스 설정
    setMapLevel(5); // 지도 레벨 설정
  };

  return (
    <div className='Station' style={{ marginTop: '5px' }}>
      {/* 왼쪽박스 */}
      <div className='Status'>
        <div className='Name' onClick={handleLocateClick}>
          <span>
            ({ChargeSpeed}) {StationName}
          </span>
        </div>
        <div className='Address'>
          <a
            href={`https://map.kakao.com/link/to/${StationAddress},${lat},${lng}`}
            target='_blank'
            rel='noreferrer'
          >
            {StationAddress}
          </a>
        </div>
      </div>
      {/* 오른쪽박스 */}
      <div className='Charger'>
        <div className='ChargerNum'>{ChargeType}</div>
        <div className='ChargeAble'>{Availability}</div>
      </div>
    </div>
  );
};

export default Station;

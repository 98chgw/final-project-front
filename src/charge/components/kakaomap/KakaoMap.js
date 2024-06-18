import { useContext, useEffect, useState } from 'react';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import KakaoMapMarker from './KakaoMapMarker';
import styled from 'styled-components';
import { areas } from '../charge_station/areas';
import { MapContext } from '../contexts/MapContext';

// 카카오 지도 스타일
const MapContainer = styled(Map)`
  width: 100%;
  height: 795px;
  border: 1px solid #888;
`;

const KakaoMap = () => {
  // 지도 초기 위도, 경도
  const [center, setCenter] = useState({
    lat: 37.552484,
    lng: 126.937641,
  });

  // 장소 배열
  const [markers, setMarkers] = useState(areas);

  // 마커 클릭 시 창 열림
  const openWindow = (index) => {
    setMarkers(
      markers.map((marker, i) => ({
        ...marker,
        isOpen: i === index,
      })),
    );
  };

  // 창닫기 클릭시 창 닫힘
  const closeWindow = (index) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, isOpen: false } : marker,
    );
    setMarkers(updatedMarkers);
  };

  // 맵의 배경 클릭 시 창 닫힘
  const handleMapClick = () => {
    const updatedMarkers = markers.map((marker) => ({
      ...marker,
      isOpen: false,
    }));
    setMarkers(updatedMarkers);
  };

  const { selectedStation, selectedMarkerIndex, mapLevel } =
    useContext(MapContext);

  // 선택된 좌표 변경 시 지도 중심 업데이트
  useEffect(() => {
    if (selectedStation) {
      setCenter(selectedStation);
      openWindow(selectedMarkerIndex);
    }
  }, [selectedStation, selectedMarkerIndex]);

  return (
    <>
      <MapContainer
        id='map'
        center={center}
        level={mapLevel}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <KakaoMapMarker
            key={index}
            id={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            StationName={marker.StationName}
            AC={marker.AC}
            DC={marker.DC}
            isOpen={marker.isOpen}
            openWindow={() => openWindow(index)}
            closeWindow={() => closeWindow(index)}
          />
        ))}
        <ZoomControl
          position={'RIGHT'} /* 확대 및 축소 컨트롤러 */
        />
      </MapContainer>
    </>
  );
};

export default KakaoMap;

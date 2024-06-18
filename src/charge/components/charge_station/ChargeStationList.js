import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Station from './Station';
import '../scss/ChargeStationList.scss';
import { SearchContext } from '../contexts/SearchContext';
import loadingImg from '../../assets/img/loading.png';

const ChargeStationList = () => {
  const { searchConditions } = useContext(SearchContext);
  const {
    selectedArea,
    selectedSubArea,
    facilitySearch,
    isSearchClicked,
  } = searchConditions;
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  // 백엔드(데이터베이스)에서 받아온 충전소 데이터
  useEffect(() => {
    if (!isSearchClicked) return;

    const fetchStations = async () => {
      // 로딩중이다
      setIsLoading(true);
      setError(null);
      // 불러왔다
      try {
        const response = await fetch(
          'http://localhost:8181/charge/home', // 현재 링크
        );
        // 에러떴다
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setStations(data.chargers);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchStations();
  }, [isSearchClicked]);

  // 시/도, 시/군/구, 키워드 검색 함수
  const filteredStations = stations.filter((station) => {
    const isAreaMatch = selectedArea
      ? station.address.includes(selectedArea)
      : true;
    const isSubAreaMatch = selectedSubArea
      ? station.address.includes(selectedSubArea)
      : true;
    const isFacilityMatch = facilitySearch
      ? station.chargerName.includes(facilitySearch)
      : true;
    return isAreaMatch && isSubAreaMatch && isFacilityMatch;
  });

  // 검색을 안한 초기 상태
  if (!isSearchClicked) {
    return <p>검색 조건을 입력해주세요.</p>;
  }

  // 충전소 데이터 불러오는 상태
  if (isLoading) {
    return (
      <div>
        <p>충전소 정보를 불러오는 중...</p>
        <p>
          <img
            className='loading'
            src={loadingImg}
            alt='Loading'
          />
        </p>
      </div>
    );
  }

  // 에러
  if (error) {
    return <p>Error: {error}</p>;
  }

  // 더 보기 버튼 클릭 시 20개씩 더 보여주는 함수
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
    console.log(stations);
  };

  return (
    <div className='ListContainer'>
      {filteredStations.length > 0 ? (
        <>
          {filteredStations
            .slice(0, visibleCount)
            .map((station, index) => (
              <Station
                key={index}
                index={index}
                id={station.id}
                StationName={station.chargerName} // 충전소 이름
                StationAddress={station.address} // 충전소 주소
                ChargeSpeed={station.chargingSpeed} // 완속 or 급속
                ChargeType={station.chargerType} // 충전기 타입
                ChargeCompany={station.chargerCompany} // 충전기 회사
                Facilities={station.facilities} // 이용 시설
                Availability={station.availability} // 이용자 제한 or 이용 가능
                price={station.chargingPrice} // 충전 가격
                lat={station.latitude} // 위도
                lng={station.longitude} // 경도
              />
            ))}
          {visibleCount < filteredStations.length && (
            <div
              onClick={handleShowMore}
              className='show-more-button'
            >
              {' '}
              &darr; 더 보기 &darr;
            </div>
          )}
        </>
      ) : (
        <p>
          조건에 맞는 충전소가 없습니다. 검색을 다시
          진행해주세요.
        </p>
      )}
    </div>
  );
};

export default ChargeStationList;

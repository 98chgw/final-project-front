import React, { useState } from 'react';
import ChargeStationSearch from './ChargeStationSearch';
import ChargeStationList from './ChargeStationList';
import '../scss/SearchList.scss'; // CSS 파일을 import 해주세요 (필요에 따라 파일명은 변경 가능)

const SearchList = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(visible);

  // visible prop이 변경되면 isVisible 상태를 업데이트합니다.
  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <>
      <div
        className={`search-list-container ${isVisible ? 'visible' : 'hidden'}`}
      >
        <div className='search-list-content'>
          <ChargeStationSearch />
          <ChargeStationList />
        </div>
      </div>
    </>
  );
};

export default SearchList;

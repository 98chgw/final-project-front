import React, { useState } from 'react';
import Frame from '../Frame';
import './AdminPage.scss';
import ReservedStationSelect from './adminstation/ReservedStationSelect';
import ReservedCarSelect from './admincar/ReservedCarSelect';
import ReviewSelect from './adminreview/ReviewSelect';
import ReservedStationList from './adminstation/ReservedStationList';
import ReservedCarList from './admincar/ReservedCarList';
import ReviewList from './adminreview/ReviewList';
import { ReserveStationProvider } from '../../../../contexts/ReserveStationContext';

const AdminPage = () => {
  const [selected, setSelected] = useState(null);
  return (
    <ReserveStationProvider>
      <Frame>
        <div className='admin-page-select'>
          <ReservedStationSelect
            isSelected={selected === 'station'}
            onClick={() => setSelected('station')}
          />
          <ReservedCarSelect
            isSelected={selected === 'car'}
            onClick={() => setSelected('car')}
          />
          <ReviewSelect
            isSelected={selected === 'review'}
            onClick={() => setSelected('review')}
          />
        </div>
        <div className='admin-page-list'>
          {!selected && (
            <div className='no-select'>
              <div>카테고리 누르면 관리자만 목록 보임</div>
            </div>
          )}
          {selected === 'station' && (
            <ReservedStationList />
          )}
          {selected === 'car' && <ReservedCarList />}
          {selected === 'review' && <ReviewList />}
        </div>
      </Frame>
    </ReserveStationProvider>
  );
};

export default AdminPage;

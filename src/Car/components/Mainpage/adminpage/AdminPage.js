import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../Frame';
import ReservedStationSelect from './adminstation/ReservedStationSelect';
import ReservedCarSelect from './admincar/ReservedCarSelect';
import ReviewSelect from './adminreview/ReviewSelect';
import ReservedStationList from './adminstation/ReservedStationList';
import ReservedCarList from './admincar/ReservedCarList';
import ReviewList from './adminreview/ReviewList';
import './AdminPage.scss';
import AuthContext from '../../../../util/AuthContext';

const AdminPage = () => {
  const { role } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (selection, path) => {
    setSelected(selection);
    navigate(path);
  };

  if (role !== 'ADMIN') {
    navigate('/');
  }

  return (
    <Frame>
      <div className='admin-page-select'>
        <ReservedStationSelect
          isSelected={selected === 'station'}
          onClick={() =>
            handleSelect('station', '/admin/station')
          }
        />
        <ReservedCarSelect
          isSelected={selected === 'car'}
          onClick={() => handleSelect('car', '/admin/car')}
        />
        <ReviewSelect
          isSelected={selected === 'review'}
          onClick={() =>
            handleSelect('review', '/admin/review')
          }
        />
      </div>
      <div className='admin-page-list'>
        {!selected && (
          <div className='no-select'>
            <div>카테고리 누르면 관리자만 목록 보임</div>
          </div>
        )}
        {selected === 'station' && <ReservedStationList />}
        {selected === 'car' && <ReservedCarList />}
        {selected === 'review' && <ReviewList />}
      </div>
    </Frame>
  );
};

export default AdminPage;

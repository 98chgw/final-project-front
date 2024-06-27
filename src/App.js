import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import React from 'react';
import './App.scss';
import Mypage from './Car/components/Mainpage/Mypage';
import Error from '../src/Car/components/Errorpage/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Car/components/user/Login';
import Noti from './Car/components/Mainpage/noti/Noti';
import Event from './Car/components/Mainpage/event/Event';
import Review from './Car/components/Mainpage/review/Review';
import Testheader from './Car/components/Mainpage/Testheader';
import Testhome from './Car/components/Mainpage/Testhome';
import { AuthContextProvider } from './util/AuthContext';
import { ModalProvider } from '@lasbe/react-modal';
import LoginSuccess from './Car/components/user/LoginSuccess';
import ChargeStation from './Car/components/charge/charge_station/ChargeStation';
import ReservationCharge from './Car/components/charge/reservation_charge/ReservationCharge';
import { Checkout } from './Car/components/pay/Checkout';
import { Success } from './Car/components/pay/Success';
import { Fail } from './Car/components/pay/Fail';
import Carres from './Car/components/car/Carres';
import UserInfoSave from './charge/components/mypage/UserInfoSave';

import EventDetail from './Car/components/Mainpage/event/EventDetail';

const App = () => {
  const location = useLocation();
  // 헤더가 안보여도 되는 페이지 경로
  const hideHeaderPaths = ['/pay', '/success', '/fail'];

  return (
    <ModalProvider>
      <AuthContextProvider>
        <div
          className='App'
          style={{ fontFamily: 'font2' }}
        >
          {!hideHeaderPaths.includes(location.pathname) && (
            <Testheader />
          )}
          <Routes>
            {/* 메인 홈페이지 */}
            <Route exact path='/' element={<Testhome />} />
            {/* 이용방법 페이지 */}
            <Route path='/noti' element={<Noti />} />
            {/* 이벤트 페이지 */}
            <Route path='/event' element={<Event />} />
            <Route
              path='/event/:id'
              element={<EventDetail />}
            />
            {/* 이용후기 페이지 */}
            <Route path='/review' element={<Review />} />
            {/* 충전소 페이지 */}
            <Route
              path='charge/list'
              element={<ChargeStation />}
            />
            <Route
              path='charge/reservation'
              element={<ReservationCharge />}
            />

            {/* 전기차 예약하기 */}
            <Route path='/car/res' element={<Carres />} />

            {/* 마이페이지 */}
            <Route path='/mypage' element={<Mypage />} />

            {/* 공통 로그인페이지 */}
            <Route path='/Login' element={<Login />} />

            {/* 카카오 로그인페이지 */}
            <Route
              path='/oauth/kakao'
              element={<LoginSuccess />} // 강아지 사진 나오면 로그인 성공
            />
            {/* 네이버 로그인페이지 */}
            <Route
              path='/oauth/naver'
              element={<LoginSuccess />} // 강아지 사진 나오면 로그인 성공
            />

            {/* 구글 로그인페이지 */}

            {/* 토스페이먼츠 */}
            <Route path='/pay' element={<Checkout />} />
            <Route path='/success' element={<Success />} />
            <Route path='/fail' element={<Fail />} />

            {/* 에러페이지 */}
            <Route path='/*' element={<Error />} />

            <Route
              path='/info'
              element={<UserInfoSave />}
            />
          </Routes>
        </div>
      </AuthContextProvider>
    </ModalProvider>
  );
};

export default App;

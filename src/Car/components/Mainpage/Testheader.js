import React, { useContext, useState } from 'react';
import './Testheader.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../util/AuthContext';
import {
  API_BASE_URL,
  USER,
} from '../../../config/host-config';
import ChargeFooter from '../charge/footer/ChargeFooter';

const Testheader = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(1);

  const onClick = (index, text) => {
    navigate(text === '' ? '/' : text);
    setState(index);
  };

  const onclick = () => {
    navigate('/');
  };
  const click = () => {
    navigate('/Login');
  };

  const { isLoggedIn, name, onLogout, role } =
    useContext(AuthContext);

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    const res = await fetch(
      `${API_BASE_URL}${USER}/logout`,
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer ' +
            localStorage.getItem('ACCESS_TOKEN'),
        },
      },
    );

    // AuthContext의 onLogout 함수를 호출하여 로그인 상태를 업데이트 합니다.
    onLogout();
  };
  const cllick = () => {
    navigate('/');
    setState(1);
  };
  return (
    <div className='Testheader'>
      <div className='logo' onClick={cllick} />

      <div className='tabline'>
        <button
          className={state === 1 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(1, '/')}
        >
          Home
        </button>
        <button
          className={state === 2 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(2, '/car/res')}
        >
          전기차 렌트
        </button>
        <button
          className={state === 3 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(3, '/charge/list')}
        >
          충전소 보기
        </button>
        <button
          className={state === 4 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(4, '/charge/reservation')}
        >
          충전소 예약
        </button>
        <button
          className={state === 5 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(5, '/noti')}
        >
          이용방법
        </button>
        <button
          className={state === 6 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(6, '/event')}
        >
          이벤트
        </button>
        <button
          className={state === 7 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(7, '/review')}
        >
          이용후기
        </button>
        <button
          className={state === 8 ? 'tabliactive' : 'tabli'}
          onClick={() => onClick(8, '/mypage')}
        >
          마이페이지 {name}
        </button>
        {!isLoggedIn ? (
          <button className='loginbtn' onClick={click}>
            로그인
          </button>
        ) : (
          <button
            className='loginbtn'
            onClick={logoutHandler}
          >
            <p style={{ marginTop: '10px' }}>로그아웃</p>
          </button>
        )}
        {isLoggedIn && role === 'ADMIN' && (
          <button
            className={
              state === 9 ? 'tabliactive' : 'tabli'
            }
            onClick={() => onClick(9, '/admin')}
          >
            예약 목록 & 관리
          </button>
        )}
      </div>
      <ChargeFooter />
    </div>
  );
};

export default Testheader;

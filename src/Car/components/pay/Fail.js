import { useSearchParams } from 'react-router-dom';
import './Pay.scss';

export function Fail() {
  const [searchParams] = useSearchParams();

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <div className='result-wrapper'>
      <div className='box_section'>
        <h2 className='pay-head'>결제 실패</h2>
        <p className='pay-body'>{`에러 코드: ${searchParams.get('code')}`}</p>
        <p className='pay-body'>{`실패 사유: ${searchParams.get('message')}`}</p>
        <p
          className='public-btn pay-button'
          onClick={handleCloseWindow}
        >
          창 닫기
        </p>
      </div>
    </div>
  );
}

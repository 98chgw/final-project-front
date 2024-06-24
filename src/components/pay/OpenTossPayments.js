import React from 'react';

// 토스페이먼트 여는 컴포넌트
const OpenTossPayments = ({ totalPrice }) => {
  const handleNavigation = () => {
    const width = 440;
    const height = 633;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      `/pay?totalPrice=${totalPrice}`,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  };

  return (
    <div>
      <span
        className='pay-button'
        onClick={handleNavigation}
      >
        결제 창 열기
      </span>
    </div>
  );
};

export default OpenTossPayments;

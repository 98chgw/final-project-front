import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Event.module.scss';
import style from '../../../../scss/Button.module.scss';
import axios from 'axios';
import { Modal } from 'reactstrap';
import EventAddModal from './EventAddModal';

const EventDetail = () => {
  const location = useLocation();
  const { id, img, title, status } = location.state || {};
  const navigate = useNavigate();
  const toList = () => navigate('/events');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [editedContents, setEditedContents] = useState(img);
  const [currentHeader, setCurrentHeader] = useState(title);
  const [currentContents, setCurrentContents] =
    useState(img);

  const token = localStorage.getItem('ACCESS_TOKEN');

  const removeEvent = async () => {
    try {
      await axios.delete(
        `http://localhost:8181/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert('삭제 완료');
      navigate('/events');
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.contentline}>
        <div className={styles.eventDetailHeader}>
          <div
            className={`${styles.eventCurrent} ${styles.marginBox}`}
          >
            {status}
          </div>
          <div className={styles.eventDetailTitle}>
            {title}
          </div>
          <div
            className={`${styles.flexBox} ${styles.marginBox}`}
          >
            <div>글번호</div>
            <div>{id}</div>
          </div>
        </div>
        <div className={styles.eventDetailBody}>
          {img && (
            <img
              className={styles.eventDetailImg}
              src={img}
              alt={title}
            />
          )}
          <button
            className={`${style.publicBtn} ${styles.eventButton}`}
            onClick={openModal}
          >
            수정
          </button>
          <button
            className={`${style.publicBtn} ${styles.eventButton}`}
            onClick={removeEvent}
          >
            삭제
          </button>
          <button
            className={style.publicBtn}
            onClick={toList}
          >
            목록
          </button>

          {isModalOpen && (
            <EventAddModal
              isOpen={isModalOpen}
              toggle={closeModal}
              eventId={id}
              eventTitle={title}
              eventImage={img}
              isEditMode={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

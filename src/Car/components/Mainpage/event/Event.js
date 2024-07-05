import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Event.module.scss';
import Eventlist from './Eventlist';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../util/AuthContext';
import handleRequest from '../../../../util/handleRequest';
import { API_BASE_URL } from '../../../../config/host-config';
import axiosInstance from '../../../../config/axios-config';
import style from '../../../../scss/Button.module.scss';
import EventAddModal from './EventAddModal';
import { Modal } from 'reactstrap';
import Frame from '../Frame';

const Event = () => {
  const redirection = useNavigate();
  const { onLogout } = useContext(AuthContext);
  const [isModal, setIsModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_EVENT_URL = API_BASE_URL + '/events';

  const eventAddModalOpen = () => {
    console.log('클릭 이벤트 발생!');
    setIsModal(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      await handleRequest(
        () => axiosInstance.get(`${API_EVENT_URL}/list`),
        (data) => {
          setEvents(data.events);
          setLoading(false);
        },
        onLogout,
        redirection,
      );
    };

    fetchEvents();
  }, [API_EVENT_URL, onLogout, redirection]);

  return (
    <Frame>
      <div className={styles.eventbody}>
        <Eventlist eventList={events} />
      </div>
      <button
        className={`${style.publicBtn} ${styles.eventButton}`}
        onClick={eventAddModalOpen}
      >
        추가
      </button>

      {isModal && (
        <EventAddModal
          isOpen={isModal}
          toggle={() => setIsModal(false)}
        />
      )}
    </Frame>
  );
};

export default Event;

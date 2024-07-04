import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import './Modal2.scss';
import axios from 'axios';
import axiosInstance from '../../../../config/axios-config';
import AuthContext from '../../../../util/AuthContext';

const Modal2 = ({ onClose, onSave, selectedType }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [rating, setRating] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [carList, setCarList] = useState([]);
  const [chargeList, setChargeList] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8181/car/res',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(
          '렌트카 목록 응답 데이터 : ',
          response.data,
        );
        setCarList(response.data.carList);
      } catch (error) {
        console.log(
          '렌트카 목록을 가져오는데 실패했습니다. : ',
          error,
        );
      }
    };

    if (selectedType === 'rental') {
      fetchCarList();
    }
  }, [token, selectedType]);

  useEffect(() => {
    const fetchChargeList = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8181/charge/reservation',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(
          '충전소 목록 응답 데이터 : ',
          response.data,
        );
        setChargeList(response.data.chargers);
      } catch (error) {
        console.log(
          '충전소 목록을 가져오는데 실패했습니다. : ',
          error,
        );
      }
    };
    if (selectedType !== 'rental') {
      fetchChargeList();
    }
  }, [token, selectedType]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 350) {
      setContent(inputValue);
      setError('');
    } else {
      setError('350자 이상 작성할 수 없습니다.');
    }
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedItem === '') {
      window.alert(
        `${selectedType === 'rental' ? '차량' : '충전소'}를 선택해주세요.`,
      );
      return;
    }

    if (content.trim().length === 0) {
      window.alert('후기를 입력해주세요.');
      return;
    }

    if (content.length > 350) {
      window.alert('350자 이상 작성할 수 없습니다.');
      return;
    }

    if (selectedType !== 'rental') {
      const reviewChargeData = {
        content,
        rating,
        stationName: selectedItem,
      };

      try {
        const response = await axiosInstance.post(
          'http://localhost:8181/review/charge',
          reviewChargeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setReviewList([...reviewList, response.data]);
        alert('리뷰 작성이 완성되었습니다.');
        onSave(content, selectedItem, rating);
      } catch (err) {
        setError(err.message);
        alert('리뷰 등록에 실패하였습니다.');
      }
    } else {
      const reviewCarData = {
        content,
        rating,
        carName: selectedItem,
      };

      try {
        const response = await axiosInstance.post(
          'http://localhost:8181/review/car',
          reviewCarData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setReviewList([...reviewList, response.data]);
        alert('리뷰 작성이 완성되었습니다.');
        onSave(content, selectedItem, rating);
      } catch (err) {
        setError(err.message);
        alert('리뷰 등록에 실패하였습니다.');
      }
    }
    setContent(''); // 폼 초기화
    setSelectedItem(''); // 폼 초기화
    setRating(1); // 폼 초기화
  };

  return (
    <div className='modal2'>
      <div className='modal2-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div className='selection-row'>
            <div>
              <label htmlFor='item'>{`${selectedType === 'rental' ? '차량' : '충전소'} 선택:`}</label>
              <select
                id='item'
                value={selectedItem}
                onChange={handleItemChange}
              >
                <option value=''>선택하세요</option>
                {selectedType === 'rental'
                  ? carList.map((car) => (
                      <option
                        key={car.carId}
                        value={car.carId}
                      >
                        {car.carName}
                      </option>
                    ))
                  : chargeList.map((charge) => (
                      <option
                        key={charge.stationId}
                        value={charge.stationId}
                      >
                        {charge.stationName}
                      </option>
                    ))}
              </select>
            </div>
            <div>
              <label htmlFor='rating'>별점 선택:</label>
              <select
                id='rating'
                value={rating}
                onChange={handleRatingChange}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {`${value}점`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='image-upload'>
            <label htmlFor='photo'>upload</label>
            <input
              type='file'
              id='photo'
              accept='image/*'
              onChange={handlePhotoChange}
            />
            <div className='photo-preview'>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt='이미지 미리보기'
                  className='preview-image'
                />
              )}
            </div>
          </div>
          <div className='review-textarea'>
            <textarea
              value={content}
              onChange={handleChange}
              placeholder='후기를 작성해주세요.'
            />
          </div>
          {error && <p className='error'>{error}</p>}
          <div className='submit-button'>
            <button type='submit'>저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal2;

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import { kakao } from '../App';
import UserContext from '../context/UserContext';
import { Button, Color_3 } from '../styles/common';
import MapModal, { ModalBackground } from './MapModal';
import Modal from './Modal';
import Navigator from './Navigator';
import AutoComplete from './AutoComplete';

const MapContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: 70vh;
  margin-bottom: 50px;
  justify-content: center;
  @media ${({ theme }) => theme.size.tablet} {
    height: 50vh;
    padding: 0 10px;
  }

  @media ${({ theme }) => theme.size.mobile} {
    height: 50vh;
    padding: 0 10px;
  }
`;

const Map = styled.div`
  display: flex;
  width: 100%;
  border-radius: 6px;
  justify-content: center;
`;

const SearchForm = styled.form`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 360px;
  height: 60px;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  align-items: center;
  z-index: 12;
  @media ${({ theme }) => theme.size.tablet} {
    top: -70px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

const Input = styled.input`
  position: relative;
  width: calc(70%);
  height: 38px;
  margin-right: 10px;
  border: none;
  padding: 0 8px;
  border-radius: 3px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-right: 10px;
  }
`;

const Search = styled.button`
  position: absolute;
  right: 115px;
  font-size: 16px;
  border: none;
  background-color: transparent;
`;

const Categories = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  overflow: hidden;
  z-index: 999;
`;

const Select = styled.select`
  width: 80px;
  height: 38px;
  border: none;
  background-color: transparent;
  padding: 0 6px;
  text-align: center;
  z-index: 999;
  outline: none;
`;

const UploadModal = styled(ModalBackground)`
  left: 0;
  height: 170px;
  padding: 28px;
  color: ${Color_3};
  z-index: 11;
`;

const Address = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const Label = styled.span`
  display: block;
  margin: 10px 0;
`;

const KakaoMap = ({ posts, handleSearch }) => {
  const containerRef = useRef();
  const backgroundRef = useRef();
  const inputRef = useRef();
  const selectRef = useRef();
  const map = useRef(null);
  const geocoder = useRef(null);
  const blueMarker = useRef();
  const history = useHistory();

  const [post, setPost] = useState();
  const [categories, setCategories] = useState([]);
  const [address, setAddress] = useState();
  const [isMarked, setMarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [auto, setAuto] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [user] = useContext(UserContext);
  const [marker, setMaker] = useState([]);
  const [naviIsOpen, setNaviIsOpen] = useState(true);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 4,
    };
    map.current = new kakao.maps.Map(containerRef.current, options);
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 주소-좌표 변환 객체를 생성합니다
    geocoder.current = new kakao.maps.services.Geocoder();

    blueMarker.current = new kakao.maps.Marker();

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/category`)
      .then(({ data }) => {
        if (data.status) {
          setCategories(data.data);
        }
      });
  }, []);

  useEffect(() => {
    // 지도에 마커를 표시합니다
    blueMarker.current.setMap(map.current);

    if (posts?.length) {
      let bounds = new kakao.maps.LatLngBounds();
      let markers = [];
      if (marker.length) {
        setMarkers(null);
        setMaker([]);
      }
      for (let i = 0; i < posts.length; i++) {
        displayMarker(posts[i], markers);
        bounds.extend(new kakao.maps.LatLng(posts[i].lat, posts[i].lng));
      }
      setMaker([...markers]);
      map.current.setBounds(bounds);
    }

    function displayMarker(post, markers) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const newMarker = new kakao.maps.Marker({
        map: map.current,
        position: new kakao.maps.LatLng(post.lat, post.lng),
        image: markerImage,
      });

      markers.push(newMarker);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        setCenter(post.lat, post.lng);
        setMarked(false);
        setPost({ ...post });
      });
    }

    if (user && user?.role !== 2) {
      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      kakao.maps.event.addListener(map.current, 'click', function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;
        searchAddrFromCoords(mouseEvent.latLng, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setAddress({
              name: result[0].address_name,
              lat: latlng.Ma,
              lng: latlng.La,
            });
          }
        });

        // 마커 위치를 클릭한 위치로 옮깁니다
        setCenter(latlng.Ma, latlng.La);
        blueMarker.current.setPosition(latlng);
        setMarked(true);
      });
    }

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.current.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        callback,
      );
    }

    function setMarkers(map) {
      for (var i = 0; i < marker.length; i++) {
        marker[i].setMap(map);
      }
    }
  }, [posts, user]);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.left = '0px';
    }
  }, [post]);

  const setCenter = (lat, lng) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.current.panTo(moveLatLon);
  };

  const handleClose = () => {
    setPost(null);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const { value } = inputRef.current;
    const categoryId = selectRef.current.value;
    handleSearch(value, categoryId);
    setPost(null);
  };

  const goToUpload = () => {
    history.push({ pathname: '/upload', state: { ...address } });
  };

  const handleInputChange = () => {
    const { value } = inputRef.current;

    if (value) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/post/search`, {
          params: { search: value },
        })
        .then(({ data }) => {
          const { post } = data.data;
          if (post.length) {
            const result = post.map((p) => p.title);
            setAuto(result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAuto();
    }
  };

  const changeInputValue = (value) => {
    inputRef.current.value = value;
  };

  return (
    <MapContainer>
      {isOpen && (
        <Modal
          message={`${address?.name}이(가) 맞으신가요?`}
          setIsOpen={setIsOpen}
          callback={goToUpload}
        />
      )}
      <SearchForm>
        <Input
          ref={inputRef}
          onChange={handleInputChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder="검색어를 입력해주세요"
        />
        <Search type="submit" onClick={onSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Search>
        <Categories>
          <Select ref={selectRef}>
            <option value="">전체</option>
            {categories?.map((category, i) => (
              <option value={category.id} key={i + 1}>
                {category.value}
              </option>
            ))}
          </Select>
        </Categories>
        {auto && isFocus && (
          <AutoComplete value={auto} changeInputValue={changeInputValue} />
        )}
      </SearchForm>
      <Map ref={containerRef} id="map">
        {naviIsOpen && (
          <Navigator
            role={user?.role}
            isOpen={naviIsOpen}
            setIsOpen={setNaviIsOpen}
          />
        )}

        {!isMarked && post && (
          <MapModal
            post={post}
            backgroundRef={backgroundRef}
            handleClose={handleClose}
          />
        )}
        {isMarked && address && (
          <UploadModal>
            <Address>{address.name}</Address>
            <Label>이 주소로 사업지</Label>
            <Button width="120px" height="42px" onClick={() => setIsOpen(true)}>
              등록하기
            </Button>
          </UploadModal>
        )}
      </Map>
    </MapContainer>
  );
};

export default KakaoMap;

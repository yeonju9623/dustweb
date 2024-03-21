import './App.css';
import './Fonts/Font.css';
import sunnyIcon from './asset/sunnyIcon.svg';
import cloudIcon from './asset/cloudIcon.svg';
import dustIcon from './asset/dustIcon.svg';
import maskIcon from './asset/maskIcon.svg';
import favoriteIcon from './asset/favoriteIcon.svg';
import favoriteClickIcon from './asset/favoritrClickIcon.svg';
import prevIcon from './asset/prevIcon.svg';
import nextIcon from './asset/nextIcon.svg';
import { useEffect, useState } from 'react';
// import data from './asset/data.json';
// import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function App() {

  // // 미세먼지 데이터 상태
  // let [dustData, setdustData] = useState([]);
  // // 선택된 지역 상태
  // const [selectedRegion, setselectedRegion] = useState({
  //   sidoName: '서울', 
  //   stationName: dustData.length > 0 ? dustData.filter(item => item.sidoName === '서울')[0].stationName : ''
  // });
  // // 즐겨찾기 목록 상태 추가
  // let [favoriteLocations, setfavoriteLocations] = useState([]);
  // // 즐겨찾기 목록 보이기 여부 상태
  // let [showFavorites, setshowFavorites] = useState(false);
  // // 마지막으로 선택된 지역 상태 추가 
  // // (즐겨찾기지역보기 -> 전체지역보기 버튼을 누를 시 즐겨찾기지역보기를 누르기 전 보던 지역으로 이동하기 위해)
  // // let [lastSelectedRegion, setlastSelectedRegion] = useState('부산광역시');
  // const [lastSelectedRegion, setlastSelectedRegion] = useState({
  //   sidoName: '서울',
  //   stationName: ''
  // });
  
  // 로컬스토리지에 즐겨찾기 목록 저장하는 함수
  const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem('favoriteLocations', JSON.stringify(favorites));
  };

  // 로컬스토리지에서 즐겨찾기 목록 불러오는 함수
  const loadFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favoriteLocations');
    return favorites ? JSON.parse(favorites) : [];
  };

  // 미세먼지 데이터 상태
  let [dustData, setdustData] = useState([]);
  // 선택된 지역 상태
  const defaultRegion = dustData.length > 0 ? {
    sidoName: dustData[0].sidoName,
    stationName: dustData[0].stationName
  } : {
    sidoName: '서울',
    stationName: ''
  };
  const [selectedRegion, setselectedRegion] = useState(defaultRegion);
  // 즐겨찾기 목록 상태 추가
  let [favoriteLocations, setfavoriteLocations] = useState(loadFavoritesFromLocalStorage());
  // 즐겨찾기 목록 보이기 여부 상태
  let [showFavorites, setshowFavorites] = useState(false);
  // 마지막으로 선택된 지역 상태 추가 
  // (즐겨찾기지역보기 -> 전체지역보기 버튼을 누를 시 즐겨찾기지역보기를 누르기 전 보던 지역으로 이동하기 위해)
  const [lastSelectedRegion, setlastSelectedRegion] = useState(defaultRegion);
  
  // useEffect를 사용하여 컴포넌트가 마운트 될 때 한 번만 'data.json'파일을 가져오는 코드
  // 이를 위해 fetch 또는 axios 사용 가능 (여기서는 fetch를 사용할 것임)
  // url에 sidoName이 필수사항이라 모든 sidoName을 가져오기 위해서 각 sidoName을 순회하면서 
  // 각 sidoName에 대한 api 호출을 반복적으로 수행하여 모든 지역 데이터를 가져온다.
  
  // 다음과 같이하면 순회하는게 아니라서 "서울"이라는 특정 sidoName만 가져와짐
  // useEffect(() => {
  //   // API 호출을 통해 미세먼지 데이터 가져오기
  //   fetch('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=HU0mLSxW2NPms%2Fxt8JhIwxoZTx5Iih29FeUgfrzbN%2BzzPYwxlE%2BsVVni%2FsCmgpHJZ2nh0%2B62okrYytgpHuI10A%3D%3D&sidoName=서울&returnType=json&ver=1.0')
  //     .then(response => response.json())
  //     .then(data => {
  //       // API에서 받아온 데이터를 상태로 설정
  //       setdustData(data.response.body.items);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 모든 sidoName에 대한 데이터 가져오기
  // useEffect(() => {
  //   // sidoName 목록 가져오기
  //   const sidoNames = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "세종"];

  //   // 각 sidoName에 대한 API 호출 수행
  //   sidoNames.forEach(sidoName => {
  //     fetch(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&returnType=json&serviceKey=HU0mLSxW2NPms%2Fxt8JhIwxoZTx5Iih29FeUgfrzbN%2BzzPYwxlE%2BsVVni%2FsCmgpHJZ2nh0%2B62okrYytgpHuI10A%3D%3D&ver=1.0`)
  //       .then(response => response.json())
  //       .then(data => {
  //         // api에서 받아온 데이터를 상태로 설정
  //         // 이전에 가져온 데이터와 병합하여 저장하는 것이 좋음
  //         setdustData(prevData => [...prevData, ...data.response.body.items]);
  //       })
  //       .catch(error => {
  //         console.log('Error fetching data:', error);
  //       });
  //   });
  // }, []);

  // 모든 sidoName에 대한 데이터 가져오기
  useEffect(() => {
    // sidoName 목록 가져오기
    const sidoNames = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "세종"];

    // Promise.all을 사용하여 모든 API 호출을 병렬로 실행
    Promise.all(sidoNames.map(sidoName => 
      fetch(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&returnType=json&serviceKey=${process.env.REACT_APP_DUST_KEY}&ver=1.0`)
        .then(response => response.json())
        .then(data => data.response.body.items)
        .catch(error => {
          console.log('Error fetching data for', sidoName, ':', error);
          return []; // 에러 발생 시 빈 배열 반환
        })
    ))
    .then(allData => {
      // 모든 API 호출이 완료되면 데이터를 하나의 배열로 합침
      const mergedData = allData.flat();
      // 데이터 상태 업데이트
      setdustData(mergedData);
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
  }, []);

  // 드롭다운에서 sidoName 변경 시 stationName 초기화
  // useEffect(() => {
  //   setselectedRegion(prevRegion => ({
  //     ...prevRegion,
  //     stationName: ''
  //   }));
  // }, [selectedRegion.sidoName]); 

  // useEffect(() => {
  //   console.log('dustData updated:', dustData);
  // }, [dustData]);

  // useEffect(() => {
  //   // JSON 파일에서 미세먼지 데이터 가져오기
  //   setdustData(data.response.body.items);
  // }, []);
  
  useEffect(() => {
    // dustData가 비어있는 경우 실행하지 않음
    if (dustData.length === 0) return;
  
    // 선택된 sidoName와 stationName에 해당하는 미세먼지 데이터 가져오기
    const selectedDustData = dustData.filter(item => item.sidoName === selectedRegion.sidoName && item.stationName === selectedRegion.stationName);
  
    if (selectedDustData.length > 0) {
      // 선택된 미세먼지 데이터가 있을 경우 해당 데이터를 사용
      console.log(selectedDustData);
    }
  }, [dustData, selectedRegion.sidoName, selectedRegion.stationName]);

  // // 드롭다운 메뉴 변경 시 처리 함수
  // let handleRegionChange = (e) => {
  //   setselectedRegion(e.target.value);
  // };

  // 드롭다운 관련 함수

  // sidoName을 선택할 때 실행되는 함수
  const handleSidoChange = e => {
    const selectedSidoName = e.target.value;
    setselectedRegion({
      sidoName: selectedSidoName,
      stationName: '' // stationName 초기화
    });
  };

  // stationName을 선택할 때 실행되는 함수
  const handleStationChange = e => {
    const selectedStationName = e.target.value;
    setselectedRegion(prevRegion => ({
      ...prevRegion,
      stationName: selectedStationName
    }));
  };


  // 즐겨찾기 토글(추가, 삭제) 함수
  const handleFavoriteClick = () => {
    const isFavorite = favoriteLocations.some(region => region.sidoName === selectedRegion.sidoName && region.stationName === selectedRegion.stationName);
    if (isFavorite) {
      // 즐겨찾기에서 삭제
      const updatedFavorites = favoriteLocations.filter(region => region.sidoName !== selectedRegion.sidoName || region.stationName !== selectedRegion.stationName);
      setfavoriteLocations(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    } else {
      // 즐겨찾기에 추가
      const updatedFavorites = [...favoriteLocations, selectedRegion];
      setfavoriteLocations(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    }
  };

  // console.log(favoriteLocations);

  // 이전 지역 함수 보기
  let handlePreFavorite = () => {
    let currentIndex = favoriteLocations.indexOf(selectedRegion);
    let prevIndex = (currentIndex - 1 + favoriteLocations.length) % favoriteLocations.length;
    setselectedRegion(favoriteLocations[prevIndex]);
  }

  // 다음 지역 보기 함수
  let handleNextFavorite = () => {
    let currentIndex = favoriteLocations.indexOf(selectedRegion);
    let nextIndex = (currentIndex + 1) % favoriteLocations.length;
    setselectedRegion(favoriteLocations[nextIndex]);
  };

  // 즐겨찾기 지역 보기 클릭 시 마지막 선택 지역 정보 저장
  let handleFavoriteRegionClick = () => {
    if (favoriteLocations.length > 0) {
      // 즐겨찾기 목록 중 첫 번째 지역으로 설정
      setselectedRegion(favoriteLocations[0])
    }
    // 마지막 선택 지역 정보 저장
    setlastSelectedRegion(selectedRegion);
    // 즐겨찾기 지역 보기 활성화
    setshowFavorites(true);
  }

  // 전체 지역 보기 클릭 시 마지막 선택 지역으로 복원
  let handleTotalRegionClick = () => {
    // 마지막 선택 지역 정보로 복원
    // setselectedRegion(lastSelectedRegion);
    setselectedRegion({ sidoName: lastSelectedRegion.sidoName, stationName: lastSelectedRegion.stationName });
    // 즐겨찾기 지역 보기 비활성화
    setshowFavorites(false);
  }

  return (
    <div className="container">
      {/* 오른쪽 부분 */}
      <RightSide 
        selectedRegion = {selectedRegion}
        setselectedRegion = {setselectedRegion}
        dustData = {dustData}
        // handleRegionChange = {handleRegionChange}
        // handleSidoRegion = {handleSidoChange}
        // handleDtationChange = {handleStationChange}
        handleSidoChange = {handleSidoChange}
        handleStationChange = {handleStationChange} 
        favoriteLocations = {favoriteLocations}
        handleFavoriteClick = {handleFavoriteClick}
        handlePreFavorite = {handlePreFavorite}
        handleNextFavorite = {handleNextFavorite}
        showFavorites = {showFavorites}
        setshowFavorites = {setshowFavorites}
        handleFavoriteRegionClick = {handleFavoriteRegionClick}
        handleTotalRegionClick = {handleTotalRegionClick}
      />

      {/* 왼쪽 부분 */}
      <LeftSide 
        selectedRegion = {selectedRegion}
        dustData = {dustData}
        // handleRegionChange= {handleRegionChange}
        favoriteLocations = {favoriteLocations}
        handleFavoriteClick = {handleFavoriteClick}
        handlePreFavorite = {handlePreFavorite}
        handleNextFavorite = {handleNextFavorite}
        showFavorites = {showFavorites}
      />
    </div>
  );
}

function RightSide({selectedRegion, handleSidoChange, handleStationChange, dustData, handleFavoriteClick, handlePreFavorite, handleNextFavorite, favoriteLocations, showFavorites, setshowFavorites, handleFavoriteRegionClick, handleTotalRegionClick}) {

  // 선택된 지역의 미세먼지 정보 가져오기
  // const selectedDustData = dustData ? dustData.filter(item => item.sidoName === selectedRegion.split(' ')[0] && item.stationName === selectedRegion.split(' ')[1]) : [];
  let selectedDustData = dustData ? dustData.filter(item => item.sidoName === selectedRegion.sidoName && item.stationName === selectedRegion.stationName) : [];
  // const selectedDustData = dustData ? dustData.filter(item => item.sidoName === selectedRegion.sidoName && item.stationName === selectedRegion.stationName) : [];


  return (
    <div className="right">
      <div className="title">
        <p>{selectedDustData.length > 0 ? `${selectedDustData[0].sidoName} ${selectedDustData[0].stationName}` : ''}</p>
      </div>
      <div className="contents">
        <p>대한민국 지역의 미세먼지를 알려주는 사이트입니다.
          <br/>
          해당 사이트에서는 전체 지역의 미세먼지 현황에 대해 알 수 있고 특정 지역의 미세먼지 정보에 대해 알 수 있습니다.
          <br />
          또한 특정 지역을 즐겨찾기하여 쉽게 즐겨찾기 한 지역의 미세먼지 정보에 대해 알 수 있습니다.
        </p>
      </div>
      <div className="search">
        <p>원하는 지역을 고르세요.</p>
        {/* 드롭다운 메뉴: select 태그 사용 */}
        {/* 첫 번째 드롭다운 메뉴: sifoName 선택 */}
        <select className='dropdown' onChange={handleSidoChange} value={selectedRegion.sidoName}>
          {dustData && [...new Set(dustData.map(item => item.sidoName))].map((sido, i) =>  (
            <option key={i} value={sido}>
              {sido}
            </option>
          ))}
        </select>
        {/* 두 번째 드롭다운 메뉴: stationName 선택 */}
        <select className='dropdown' onChange={handleStationChange} value={selectedRegion.stationName}>
          {/* 선택된 sidoName에 해당하는 중복되지 않은 stationName만 보여주기 */}
          {dustData && [...new Set(dustData
              .filter((item) => item.sidoName === selectedRegion.sidoName)
              .map(item => item.stationName))]
              .map((stationName, i) => (
                  <option key={i} value={stationName}>
                      {stationName}
                  </option>
          ))}
        </select>
      </div>
      {selectedDustData.map((data, index) => (
        <div key={index} className='leftBox'>
          {/* 즐겨찾기 버튼 */}
          <div className="favoriteBtn" onClick={handleFavoriteClick}>
            <img src={favoriteLocations.includes(selectedRegion) ? favoriteClickIcon : favoriteIcon} alt="no img" />
          </div>
          <div className="dustTitle">
            {/* 통합대기환경지수에 따라 4가지 기준으로 나눠 title의 color를 다르게 출력 */}
            {data.khaiValue >= 0 && data.khaiValue <= 30 && 
              <div className='box'>
                <p className='fp sunny'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            {data.khaiValue > 30 && data.khaiValue <= 50 && 
              <div className='box'>
                <p className='fp cloud'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            {data.khaiValue > 50 && data.khaiValue <= 100 && 
              <div className='box'>
                <p className='fp dust'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            {data.khaiValue > 100 && 
              <div className='box'>
                <p className='fp mask'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            <p className='lp'>{data.dataTime}</p>
          </div>
          <div className="dustImg">
            {/* 통합대기환경지수에 따라 4가지 기준으로 나눠 아이콘을 다르게 출력 */}
            {data.khaiValue >= 0 && data.khaiValue <= 30 && <img src={sunnyIcon} alt="no sunnyIcon" />}
            {data.khaiValue > 30 && data.khaiValue <= 50 && <img src={cloudIcon} alt="no cloudIcon" />}
            {data.khaiValue > 50 && data.khaiValue <= 100 && <img src={dustIcon} alt="no dustIcon" />}
            {data.khaiValue > 100 && <img src={maskIcon} alt="no maskIcon" />}
          </div>
          <div className="dustContents">
            <p>미세먼지(PM10) 농도: {data.pm10Value}㎍/㎥</p>
            <p>초미세먼저(PM2.5) 농도: {data.pm25Value}㎍/㎥</p>
            <p>통합대기환경수치(Khai)값: {data.khaiValue}</p>
          </div>
          {/* 이전, 다음 버튼 */}
          {showFavorites && (
            <>
              <div className="prevBtn" onClick={handlePreFavorite}>
                <div>
                  <img src={prevIcon} alt="no prevIcon" />
                </div>
              </div>
              <div className="nextBtn" onClick={handleNextFavorite}>
                <div>
                  <img src={nextIcon} alt="no nextIcon" />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="btn">
        <div className="totalRegion" onClick={handleTotalRegionClick}>
          <p>전체 지역 보기</p>
        </div>
        <div className="favoriteRegion" onClick={handleFavoriteRegionClick}>
          <p style={{ fontWeight: showFavorites ? 'bold' : 'normal' }}>즐겨찾기 지역 보기</p>
        </div>
      </div>
    </div>
  )
}

function LeftSide({selectedRegion, dustData, handleFavoriteClick, handlePreFavorite, handleNextFavorite, favoriteLocations, showFavorites}) {
  
  // const selectedDustData = dustData ? dustData.filter(item => item.sidoName === selectedRegion.split(' ')[0] && item.stationName === selectedRegion.split(' ')[1]) : [];
  let selectedDustData = dustData ? dustData.filter(item => item.sidoName === selectedRegion.sidoName && item.stationName === selectedRegion.stationName) : [];
  // const selectedDustData = dustData ? dustData.filter(item => item.sidoName === selectedRegion.sidoName && item.stationName === selectedRegion.stationName) : [];


  return (
    <div className="left">
      {selectedDustData.map((data, index) => (
        <div key={index} className='leftBox'>
          <div className="favoriteBtn" onClick={handleFavoriteClick}>
            <img src={favoriteLocations.includes(selectedRegion) ? favoriteClickIcon : favoriteIcon} alt="no img" />
          </div>
          <div className="dustTitle">
            {/* 통합대기환경지수에 따라 4가지 기준으로 나눠 title의 color를 다르게 출력 */}
            {data.khaiValue >= 0 && data.khaiValue <= 30 && 
              <div className='box'>
                <p className='fp sunny'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            {data.khaiValue > 30 && data.khaiValue <= 50 && 
              <div className='box'>
                <p className='fp cloud'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            {data.khaiValue > 50 && data.khaiValue <= 100 && 
              <div className='box'>
                <p className='fp dust'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            {data.khaiValue > 100 && 
              <div className='box'>
                <p className='fp mask'>{`${data.sidoName} ${data.stationName}`}</p>
                <p className='fp'>의 미세먼지는</p>
              </div>
            }
            <p className='lp'>{data.dataTime}</p>
          </div>
          <div className="dustImg">
            {/* 통합대기환경지수에 따라 4가지 기준으로 나눠 아이콘을 다르게 출력 */}
            {data.khaiValue >= 0 && data.khaiValue <= 30 && <img src={sunnyIcon} alt="no sunnyIcon" />}
            {data.khaiValue > 30 && data.khaiValue <= 50 && <img src={cloudIcon} alt="no cloudIcon" />}
            {data.khaiValue > 50 && data.khaiValue <= 100 && <img src={dustIcon} alt="no dustIcon" />}
            {data.khaiValue > 100 && <img src={maskIcon} alt="no maskIcon" />}
          </div>
          <div className="dustContents">
            <p>미세먼지(PM10) 농도: {data.pm10Value}㎍/㎥</p>
            <p>초미세먼저(PM2.5) 농도: {data.pm25Value}㎍/㎥</p>
            <p>통합대기환경수치(Khai)값: {data.khaiValue}</p>
          </div>
          {/* 이전, 다음 버튼 */}
          {showFavorites && (
            <>
              <div className="prevBtn" onClick={handlePreFavorite}>
                <div>
                  <img src={prevIcon} alt="no prevIcon" />
                </div>
              </div>
              <div className="nextBtn" onClick={handleNextFavorite}>
                <div>
                  <img src={nextIcon} alt="no nextIcon" />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default App;


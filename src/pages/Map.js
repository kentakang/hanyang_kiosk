/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const theme = createMuiTheme({
  overrides: {
    MuiCardHeader: {
      root: {
        height: 42,
      },
      title: {
        fontFamily: 'Spoqa Han Sans',
        color: '#00355e',
        fontSize: '2em',
        fontWeight: '500'
      }
    },
    MuiCardContent: {
      root: {
        backgroundColor: '#eeeeee',
        height: 1500,
        overflow: 'auto',
      }
    }
  },
  typography: { useNextVariants: true },
});

const Map = ({ match }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    if (match.params.location) {
      Array.from(document.getElementsByTagName("g")).forEach(element => {
        if (element.textContent === match.params.location) {
          const levels = Array.from(element.parentNode.parentNode.parentNode.childNodes);
          setCurrentLevel(levels.length - levels.indexOf(element.parentNode.parentNode) + 1);
        }
      });
      
      setCurrentLocation(match.params.location);
    }
  }, []);

  const setLevel = level => (
    currentLevel === level ? setCurrentLevel(0) : setCurrentLevel(level)
  );

  const getClassName = name => (
    currentLocation === name ? 'map__space map__space--selected' : 'map__space'
  );

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="pageCard">
        <CardHeader 
          title="내부 지도" 
        />
        <CardContent>
          <div className="main">
            <div className="mall">
              <div className={`levels ${currentLevel !== 0 ? `levels--selected-${currentLevel} levels--open` : ''}`}>
                <div className={`level level--5 ${currentLevel === 5 ? 'level--current' : ''}`} onClick={() => setLevel(5)}>
                  <svg className="map map--5" viewBox="0 0 1200 230" width="100%" height="230px" preserveAspectRatio="xMidYMid meet">
                    <rect width="1200" height="230" className="map__ground" />
                    <g>
                      <rect x="10" y="120" width="170" height="100" className="map__space" />
                      <text x="60" y="180" fontFamily="Spoqa Han Sans" fontSize="24">1컴넷B</text>
                    </g>
                    <g>
                      <rect x="190" y="10" width="100" height="100" className="map__space" />
                      <text x="210" y="70" fontFamily="Spoqa Han Sans" fontSize="24">1컴넷A</text>
                    </g>
                    <g>
                      <rect x="190" y="120" width="100" height="100" className="map__space" />
                      <text x="195" y="180" fontFamily="Spoqa Han Sans" fontSize="24">1자동차B</text>
                    </g>
                    <g>
                      <rect x="300" y="10" width="100" height="100" className="map__space" />
                      <text x="305" y="70" fontFamily="Spoqa Han Sans" fontSize="24">1자동차A</text>
                    </g>
                    <g>
                      <rect x="300" y="120" width="100" height="100" className="map__space" />
                      <text x="315" y="180" fontFamily="Spoqa Han Sans" fontSize="24">1전자B</text>
                    </g>
                    <g>
                      <rect x="410" y="10" width="100" height="100" className="map__space" />
                      <text x="425" y="70" fontFamily="Spoqa Han Sans" fontSize="24">1전자A</text>
                    </g>
                    <g>
                      <rect x="410" y="120" width="100" height="100" className="map__space" />
                      <text x="425" y="180" fontFamily="Spoqa Han Sans" fontSize="24">1기계B</text>
                    </g>
                    <g>
                      <rect x="580" y="10" width="100" height="100" className="map__space" />
                      <text x="595" y="70" fontFamily="Spoqa Han Sans" fontSize="24">1기계A</text>
                    </g>
                    <g>
                      <rect x="520" y="120" width="160" height="100" className={getClassName('생활지도부')} />
                      <text x="545" y="180" fontFamily="Spoqa Han Sans" fontSize="24">생활지도부</text>
                    </g>
                    <g>
                      <rect x="690" y="10" width="100" height="100" className="map__space" />
                      <text x="705" y="70" fontFamily="Spoqa Han Sans" fontSize="24">1건설B</text>
                    </g>
                    <g>
                      <rect x="690" y="120" width="100" height="100" className="map__space" />
                      <text x="705" y="180" fontFamily="Spoqa Han Sans" fontSize="24">1건설A</text>
                    </g>
                    <g>
                      <rect x="860" y="10" width="100" height="100" className="map__space" />
                      <text x="875" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2컴넷B</text>
                    </g>
                    <g>
                      <rect x="860" y="120" width="100" height="100" className="map__space" />
                      <text x="875" y="180" fontFamily="Spoqa Han Sans" fontSize="24">2컴넷A</text>
                    </g>
                    <g>
                      <rect x="970" y="10" width="100" height="100" className="map__space" />
                      <text x="975" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2자동차B</text>
                    </g>
                    <g>
                      <rect x="970" y="120" width="100" height="100" className="map__space" />
                      <text x="975" y="180" fontFamily="Spoqa Han Sans" fontSize="24">2자동차A</text>
                    </g>
                    <g>
                      <rect x="1080" y="10" width="100" height="100" className="map__space" />
                      <text x="1095" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2전자B</text>
                    </g>
                    <g>
                      <rect x="1080" y="120" width="100" height="100" className="map__space" />
                      <text x="1095" y="180" fontFamily="Spoqa Han Sans" fontSize="24">2전자A</text>
                    </g>
                  </svg>
                </div>
                <div className={`level level--4 ${currentLevel === 4 ? 'level--current' : ''}`} onClick={() => setLevel(4)}>
                  <svg className="map map--4" viewBox="0 0 1200 230" width="100%" height="230px" preserveAspectRatio="xMidYMid meet">
                    <rect width="1200" height="230" className="map__ground" />
                    <g>
                      <rect x="10" y="10" width="400" height="210" className="map__space" />
                      <text x="165" y="130" fontFamily="Spoqa Han Sans" fontSize="36">중학교</text>
                    </g>
                    <g>
                      <rect x="480" y="10" width="100" height="100" className="map__space" />
                      <text x="495" y="70" fontFamily="Spoqa Han Sans" fontSize="24">3컴넷B</text>
                    </g>
                    <g>
                      <rect x="420" y="120" width="160" height="100" className={getClassName('제3교무실')} />
                      <text x="450" y="180" fontFamily="Spoqa Han Sans" fontSize="24">제3교무실</text>
                    </g>
                    <g>
                      <rect x="590" y="10" width="100" height="100" className="map__space" />
                      <text x="605" y="70" fontFamily="Spoqa Han Sans" fontSize="24">3컴넷A</text>
                    </g>
                    <g>
                      <rect x="590" y="120" width="150" height="100" className="map__space" />
                      <text x="630" y="180" fontFamily="Spoqa Han Sans" fontSize="24">CAD실</text>
                    </g>
                    <g>
                      <rect x="700" y="10" width="100" height="100" className="map__space" />
                      <text x="715" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2기계B</text>
                    </g>
                    <g>
                      <rect x="750" y="120" width="120" height="100" className={getClassName('교육정보부')} />
                      <text x="755" y="180" fontFamily="Spoqa Han Sans" fontSize="24">교육정보부</text>
                    </g>
                    <g>
                      <rect x="880" y="10" width="100" height="100" className="map__space" />
                      <text x="895" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2기계A</text>
                    </g>
                    <g>
                      <rect x="880" y="120" width="100" height="100" className="map__space" />
                      <text x="900" y="180" fontFamily="Spoqa Han Sans" fontSize="24">방송실</text>
                    </g>
                    <g>
                      <rect x="990" y="10" width="100" height="100" className="map__space" />
                      <text x="1005" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2건축B</text>
                    </g>
                    <g>
                      <rect x="990" y="120" width="100" height="100" className="map__space" />
                      <text x="1005" y="180" fontFamily="Spoqa Han Sans" fontSize="24">2건축A</text>
                    </g>
                    <g>
                      <rect x="1100" y="10" width="90" height="100" className="map__space" />
                      <text x="1110" y="70" fontFamily="Spoqa Han Sans" fontSize="24">2건설B</text>
                    </g>
                    <g>
                      <rect x="1100" y="120" width="90" height="100" className="map__space" />
                      <text x="1110" y="180" fontFamily="Spoqa Han Sans" fontSize="24">2건설A</text>
                    </g>
                  </svg>
                </div>
                <div className={`level level--3 ${currentLevel === 3 ? 'level--current' : ''}`} onClick={() => setLevel(3)}>
                  <svg className="map map--3" viewBox="0 0 1200 230" width="100%" height="230px" preserveAspectRatio="xMidYMid meet">
                    <rect width="1200" height="230" className="map__ground" />
                    <g>
                      <rect x="10" y="120" width="120" height="100" className="map__space" />
                      <text x="45" y="170" fontFamily="Spoqa Han Sans" fontSize="24">Wee</text>
                      <text x="35" y="200" fontFamily="Spoqa Han Sans" fontSize="24">클래스</text>
                    </g>
                    <g>
                      <rect x="140" y="10" width="300" height="100" className="map__space" />
                      <text x="250" y="70" fontFamily="Spoqa Han Sans" fontSize="24">중학교</text>
                    </g>
                    <g>
                      <rect x="140" y="120" width="190" height="100" className="map__space" />
                      <text x="210" y="180" fontFamily="Spoqa Han Sans" fontSize="24">중학교</text>
                    </g>
                    <g>
                      <rect x="340" y="120" width="100" height="100" className={getClassName('보건실')} />
                      <text x="360" y="180" fontFamily="Spoqa Han Sans" fontSize="24">보건실</text>
                    </g>
                    <g>
                      <rect x="450" y="120" width="60" height="100" className={getClassName('성적처리실')} />
                      <text x="465" y="160" fontFamily="Spoqa Han Sans" fontSize="18">성적</text>
                      <text x="455" y="190" fontFamily="Spoqa Han Sans" fontSize="18">처리실</text>
                    </g>
                    <g>
                      <rect x="520" y="10" width="100" height="100" className="map__space" />
                      <text x="525" y="70" fontFamily="Spoqa Han Sans" fontSize="24">3자동차B</text>
                    </g>
                    <g>
                      <rect x="520" y="120" width="100" height="100" className={getClassName('도제운영부')} />
                      <text x="530" y="180" fontFamily="Spoqa Han Sans" fontSize="18">도제운영부</text>
                    </g>
                    <g>
                      <rect x="630" y="10" width="100" height="100" className="map__space" />
                      <text x="635" y="70" fontFamily="Spoqa Han Sans" fontSize="24">3자동차A</text>
                    </g>
                    <g>
                      <rect x="740" y="10" width="100" height="100" className="map__space" />
                      <text x="755" y="70" fontFamily="Spoqa Han Sans" fontSize="24">3전자B</text>
                    </g>
                    <g>
                      <rect x="630" y="120" width="210" height="100" className="map__space" />
                      <text x="670" y="180" fontFamily="Spoqa Han Sans" fontSize="24">영어교과교실</text>
                    </g>
                    <g>
                      <rect x="850" y="120" width="50" height="100" className="map__space" />
                      <text x="855" y="180" fontFamily="Spoqa Han Sans" fontSize="12">학생회실</text>
                    </g>
                    <g>
                      <rect x="910" y="10" width="90" height="100" className={getClassName('취업교육실')} />
                      <text x="915" y="70" fontFamily="Spoqa Han Sans" fontSize="18">취업교육실</text>
                    </g>
                    <g>
                      <rect x="910" y="120" width="90" height="100" className={getClassName('취업실과부')} />
                      <text x="915" y="180" fontFamily="Spoqa Han Sans" fontSize="18">취업실과부</text>
                    </g>
                    <g>
                      <rect x="1010" y="10" width="85" height="100" className="map__space" />
                      <text x="1025" y="70" fontFamily="Spoqa Han Sans" fontSize="18">3전자A</text>
                    </g>
                    <g>
                      <rect x="1010" y="120" width="85" height="100" className="map__space" />
                      <text x="1025" y="180" fontFamily="Spoqa Han Sans" fontSize="18">3기계A</text>
                    </g>
                    <g>
                      <rect x="1105" y="10" width="85" height="100" className="map__space" />
                      <text x="1120" y="70" fontFamily="Spoqa Han Sans" fontSize="18">3건축B</text>
                    </g>
                    <g>
                      <rect x="1105" y="120" width="85" height="100" className="map__space" />
                      <text x="1120" y="180" fontFamily="Spoqa Han Sans" fontSize="18">3건축A</text>
                    </g>
                  </svg>
                </div>
                <div className={`level level--2 ${currentLevel === 2 ? 'level--current' : ''}`} onClick={() => setLevel(2)}>
                  <svg className="map map--2" viewBox="0 0 1200 230" width="100%" height="230px" preserveAspectRatio="xMidYMid meet">
                    <rect width="1200" height="230" className="map__ground" />
                    <g>
                      <rect x="10" y="120" width="100" height="100" className={getClassName('인쇄실')} />
                      <text x="25" y="180" fontFamily="Spoqa Han Sans" fontSize="24">인쇄실</text>
                    </g>
                    <g>
                      <rect x="120" y="10" width="100" height="100" className="map__space" />
                      <text x="135" y="70" fontFamily="Spoqa Han Sans" fontSize="24">중학교</text>
                    </g>
                    <g>
                      <rect x="120" y="120" width="310" height="100" className="map__space" />
                      <text x="235" y="180" fontFamily="Spoqa Han Sans" fontSize="24">중학교</text>
                    </g>
                    <g>
                      <rect x="230" y="10" width="200" height="100" className="map__space" />
                      <text x="290" y="70" fontFamily="Spoqa Han Sans" fontSize="24">시청각실</text>
                    </g>
                    <g>
                      <rect x="500" y="10" width="100" height="100" className="map__space" />
                      <text x="515" y="70" fontFamily="Spoqa Han Sans" fontSize="24">회의실</text>
                    </g>
                    <g>
                      <rect x="500" y="120" width="100" height="100" className={getClassName('교장실')} />
                      <text x="515" y="180" fontFamily="Spoqa Han Sans" fontSize="24">교장실</text>
                    </g>
                    <g>
                      <rect x="610" y="10" width="180" height="100" className={getClassName('제2교무실')} />
                      <text x="650" y="70" fontFamily="Spoqa Han Sans" fontSize="24">제2교무실</text>
                    </g>
                    <g>
                      <rect x="610" y="120" width="200" height="100" className={getClassName('제1교무실')} />
                      <text x="660" y="180" fontFamily="Spoqa Han Sans" fontSize="24">제1교무실</text>
                    </g>
                    <g>
                      <rect x="820" y="10" width="115" height="100" className="map__space" />
                      <text x="830" y="70" fontFamily="Spoqa Han Sans" fontSize="18">영어교과교실</text>
                    </g>
                    <g>
                      <rect x="820" y="120" width="115" height="100" className="map__space" />
                      <text x="825" y="180" fontFamily="Spoqa Han Sans" fontSize="24">교사휴게실</text>
                    </g>
                    <g>
                      <rect x="945" y="10" width="115" height="100" className="map__space" />
                      <text x="955" y="70" fontFamily="Spoqa Han Sans" fontSize="24">VR실습실</text>
                    </g>
                    <g>
                      <rect x="945" y="120" width="115" height="100" className="map__space" />
                      <text x="965" y="180" fontFamily="Spoqa Han Sans" fontSize="24">3건설B</text>
                    </g>
                    <g>
                      <rect x="1070" y="10" width="115" height="100" className="map__space" />
                      <text x="1090" y="70" fontFamily="Spoqa Han Sans" fontSize="24">3기계B</text>
                    </g>
                    <g>
                      <rect x="1070" y="120" width="115" height="100" className="map__space" />
                      <text x="1090" y="180" fontFamily="Spoqa Han Sans" fontSize="24">3건설A</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MuiThemeProvider>
  );
};

Map.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default Map;
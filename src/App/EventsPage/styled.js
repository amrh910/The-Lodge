import styled from 'styled-components';

const AppView = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const DateBox = styled.div`
  width:50px;
  height:50px;
  background:#9966ff;
  border-radius: 10px;
  float:left;
`

const DateWord = styled.p`
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 50px; 
`
const TitleText = styled.h1`
  color: black;
  font-weight: bold;
  float:left;
  padding-left: 50px;
  vertical-align: middle;
  line-height: 50px; 

`



export {
  AppView,
  MainView,
  DateBox,
  DateWord,
  TitleText,
};
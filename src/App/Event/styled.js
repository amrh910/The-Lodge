import styled from 'styled-components';

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
  DateBox,
  DateWord,
  TitleText,
};
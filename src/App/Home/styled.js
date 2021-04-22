import styled from 'styled-components';

const AppView = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "Roboto";
`;

const Container = styled.div`
  background-color: #49256B;
  color: white;
  text-align: center;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 20px;
`

const MainView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  width: 12rem;
  text-align: center;
`

const Column = styled.div`
  float: left;
  width: 33.33%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
`
const Clickable = styled.div`
  cursor: pointer;
`
const Row = styled.div`
  background-color: #fff;
  color: black;
  padding-top: 50px;
  padding-bottom: 50px;
`


export {
  Container,
  Clickable,
  MainView,
  AppView,
  Column,
  Image,
  Row,
};
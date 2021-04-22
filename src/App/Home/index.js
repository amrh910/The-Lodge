import React from 'react';

import {
  Container,
  Clickable,
  Column,
  Image,
  Row,
} from './styled';

class Home extends React.Component { 
   render(){
   		return (
          <Container>
            <img alt=""src = "thelodge.png" />
            <br />
            <br/> 
            <h1> How It Works </h1>
            <br />

            <Row>
            <div className="row">
              <Column>
                <Clickable onClick={() => this.props.history.push('/events')}>
                  <Image src="attend.png" alt="Card image cap" />
                  <div className="card-body">
                    <h1 className="card-text">Attend a cool event</h1>
                  </div>
                </Clickable>
              </Column>
              <Column>
                <Clickable onClick={() => this.props.history.push('/create')}>
                  <Image src="create.png" alt="Card image cap" />
                  <div className="card-body">
                    <h1 className="card-text">Or create your own!</h1>
                  </div>
                </Clickable>
              </Column>
              <Column>
                <Clickable onClick={() => this.props.history.push('/signup')}>
                  <Image src="join.png" alt="Card image cap" />
                  <div className="card-body">
                    <h1 className="card-text">And be apart of your community</h1>
                  </div>
                </Clickable>
              </Column>
            </div>
            <br />
            <h1> Find your passions, make new friends, and help make CCNY a better place! </h1>
            </Row>

          </Container>

   		);
   }
}

export default Home;
import React from "react"
import DatePicker from "react-datepicker"
import styled from 'styled-components'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// import './App.css';

const Container = styled.div`
  margin: 5rem 1rem;
`

const HeaderWrapper = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  justify-content: center;
  padding: 21px 0;
  border-radius: 8px 8px 0 0;
  color: white;
  font-weight: bold;
`

const ContentWrapper = styled(HeaderWrapper)`
  background-color: white;
  border-radius: unset;
  color:black;
  border-bottom: 1px solid grey;
  flex-direction: column;
  align-items: center; 
`

const StyledButton = styled.button`
  margin: 10px;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  transition: all 0.25s;
  font-weight: bold;
  height: fit-content;
  border: 2px solid black;
  color: black;
  background: transparent;

  &:hover {
      background-color: black;
      color: #ffffff;
  }
`

const BookingCard = styled.div`
  display: flex;
  box-sizing: border-box;
  box-shadow: 0 16px 20px 0 rgba(0, 0, 0, 0.05), 0 0 20px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 5rem auto;
  flex-direction: column;
`

const DateTimeWrapper = styled.div`
  display: flex;
  margin: 0 15px;
  flex-wrap: wrap;
  justify-content: center;
`

const DateWrapper = styled.div`
  display: flex;
  margin: 0 15px;
`

function App() {
  const [startDate, setStartDate] = React.useState(new Date().setHours( 9, '00'));
  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6;
  };

  const handleBook = async () => {
      const response = await fetch('http://localhost:8080/appointments/', {
        method: 'POST',
        body: JSON.stringify({
          date: startDate,
          time: startDate.getHours()
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "Access-Control-Request-Method": "*"
        }
      });
      const myJson = await response.json(); //extract JSON from the http response
      alert(myJson.message)
  }

  return (
    <div className="App">
      <Container>
      <BookingCard>
        <HeaderWrapper>
          Appointment Booking Form
        </HeaderWrapper>
        <ContentWrapper>
          <span style={{margin: "0 15px 15px"}}>Please choose your preferred booking date and time below</span>
          <DateTimeWrapper style={{display: "flex", margin: "0 15px"}}>
            <span>Booking Date & Time: </span>
            <DateWrapper>
              <DatePicker 
                selected={startDate} 
                filterDate={isWeekday} 
                showTimeSelect
                includeTimes={[
                  new Date().setHours( 9, '00'),
                  new Date().setHours( 10, '00'),
                  new Date().setHours( 11, '00'),
                  new Date().setHours( 12, '00'),
                  new Date().setHours( 13, '00'),
                  new Date().setHours( 14, '00'),
                  new Date().setHours( 15, '00'),
                  new Date().setHours( 16, '00'),
                  new Date().setHours( 17, '00'),
                ]} 
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy h:mm aa"
              />
            </DateWrapper>
          </DateTimeWrapper>
          </ContentWrapper>
        <StyledButton onClick={handleBook}>
          Book
        </StyledButton>
      </BookingCard>
      </Container>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

const SlotBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [day, setday] = useState(new Date().getDay());

  console.log(day);
  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dayOfWeek = date.getDay();

    setday(dayOfWeek);
  };

  const arr = [
    "8.00 AM",
    "8.30 AM",
    "9.00 AM",
    "9.30 AM",
    "10.00 AM",
    "10.30 AM",
    "11.00 AM",
    "11.30 AM",
    "12.00 PM",
    "12.30 PM",
    "Break Time",
    "1.00 PM",
    "1.30 PM",
    "2.00 PM",
    "2.30 PM",
    "3.00 PM",
    "3.30 PM",
    "4.00 PM",
    "4.30 PM",
    "5.00 PM",
  ];
  const arr2 = [
    "8.00 AM",
    "8.30 AM",
    "9.00 AM",
    "9.30 AM",
    "10.00 AM",
    "10.30 AM",
    "11.00 AM",
    "11.30 AM",
    "12.00 PM",
    
  ];
  return (
    <>
      <Heading mb={4} mt={5}>
        Slot Booking
      </Heading>
      <Flex m="auto" alignItems="center" justifyContent="center">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </Flex>
      <Box p={8}>
        {selectedDate && (
          <>
            <Text mb={2}>Select a time slot:</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4} w="400px" m="auto">
             {day>0&&day<=5&&arr.map((el,index)=>{
              return <Button key={index} bg={el=="Break Time"?"gray":"green"} color={el=="Break Time"?"black":"white"}>{el}</Button>
             })}
              {day===6&&arr2.map((el,index)=>{
              return <Button key={index} bg={el=="Break Time"?"gray":"green"} color={el=="Break Time"?"black":"white"}>{el}</Button>
             })}
             
             {day===0&&<Text fontSize='22px' color='red' as="b" textAlign="center">Holiday</Text>}
            </Grid>
          </>
        )}

        
      </Box>
    </>
  );
};

export default SlotBooking;

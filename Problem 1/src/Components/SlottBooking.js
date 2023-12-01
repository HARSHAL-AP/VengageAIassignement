// src/SlotBooking.js
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

const generateTimeSlots = (date, numberOfSlots) => {
  const timeSlots = [];
  const startHour = 8; // Starting hour
  const slotDuration = 1; // Duration of each slot in hours

  for (let i = 0; i < numberOfSlots; i++) {
    const slotTime = new Date(date);
    slotTime.setHours(startHour + i * slotDuration);
    timeSlots.push(slotTime);
  }

  return timeSlots;
};

const SlotBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    // Simulating booked slots, replace this with actual data from your backend
    const bookedSlotsData = [
      new Date(new Date().setHours(11, 0, 0)),
      new Date(new Date().setHours(14, 0, 0)),
      // Add more booked slots as needed
    ];
    setBookedSlots(bookedSlotsData);
  }, []);

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate, 8) : [];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

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
              {timeSlots.map((time) => (
                <GridItem key={time.toISOString()}>
                  <Button
                    colorScheme={
                      selectedTime === time
                        ? "teal"
                        : bookedSlots.some(
                            (bookedTime) =>
                              bookedTime.getTime() === time.getTime()
                          )
                        ? "red"
                        : "gray"
                    }
                    onClick={() => handleTimeClick(time)}
                    w="100%"
                    isDisabled={bookedSlots.some(
                      (bookedTime) => bookedTime.getTime() === time.getTime()
                    )}
                  >
                    {time.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </>
        )}
        <Center mt={8}>
          <Text>
            Selected Date:{" "}
            {selectedDate ? selectedDate.toLocaleDateString("en-US") : "None"}
          </Text>
          <Text>
            Selected Time:{" "}
            {selectedTime ? selectedTime.toLocaleString() : "None"}
          </Text>
        </Center>
     <Button bg="green" mt={10} color="white" onClick={()=>alert("Your Slot Booking Confirmed")}>Select</Button>
      </Box>
    </>
  );
};

export default SlotBooking;

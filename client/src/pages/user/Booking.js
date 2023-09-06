import React, { useState, useEffect } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import NavBar from "../../components/user/Navbar";
import { useParams } from "react-router-dom";
import Product from "../../components/user/Product";
import axios from "../../axios/instance";
import { styled } from "styled-components";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import {loadStripe} from '@stripe/stripe-js';


const BookingStyle = styled.div`
  padding: 20px 50px;
  display: flex;
  gap: 50px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Image = styled.img`
  margin-top: 10%;
  align-items: center;
  max-height: 800px;
  width: 100%;
  object-fit: cover;
`;
const Right = styled.div`
  flex: 1;
  margin-top: 10px;
  margin-left: 30px;
`;
const DateComponents = styled.div`
  display: "flex";
  gap: 5px;
  border: 1px solid red;
`;

const Booking = () => {
  const { id } = useParams();
  const [carDetail, setCarData] = useState({});
  const [success, setSuccess] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const diffDate = dayjs(toDate).diff(dayjs(fromDate), "hours");
  const total = diffDate * carDetail.Rate
  

  async function getcar() {
    try {
      
      const response = await axios({
        method: "get",
        url: `/api/user/booking/${id}`,
      });

      setCarData(response.data.data);
      console.log("data of car to be booked", response);

      console.log(carDetail);
    } catch (error) {
      console.log("error is", error);
    }
  }

  const handleCheckOut = async(e) => {
    e.preventDefault();
    const stripe = loadStripe('pk_test_51NhaWCSBoLQ3zFT8PDDMPqmkJhvLMl5YdYkzXiJqZ3rWa7v6JIDtYXTS4rklMZJcVO19T3qZqj3UWEjWr6cA6Ueh00nvUbyTF1');
    const response = await axios({
      method:'post',
      url:'/api/user/checkout',
      data:{
        fromDate:fromDate,
        toDate:toDate,
        total:total,
        carId:carDetail._id,
        totalTime:diffDate
      }
    })
    console.log("response from stripe is",response)
    const session = response.data
   console.log("url",session)
   window.location.href=session
   
   
  };

  function book() {
    console.log("from date", fromDate);
    console.log("diff", diffDate);
    console.log("todate", toDate);
  }

  useEffect(() => {
    getcar();
    book();
  }, [fromDate, toDate]);

  useEffect(() => {
    console.log("dd", carDetail);
  }, [carDetail]);

  if (!carDetail || Object.keys(carDetail).length === 0) {
    return (
      <>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </>
    );
  }

  return (
    <>
      <Box>
        <NavBar />

        <BookingStyle>
          <Left>
            <Image src={carDetail.image.secure_url} />
          </Left>
          <Right>
            <h1>
              {carDetail.brand} {carDetail.model}{" "}
            </h1>
            <h1>{carDetail.Rate} per hour</h1>
            <h1>{carDetail._id} r</h1>
            <h1>Fuel :{carDetail.fuelType}</h1>
            <h1>Seats :{carDetail.SeatingCapacity}</h1>
            <Typography>Transmission :{carDetail.transmissionType}</Typography>
            <DateComponents>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="From"
                  sx={{ width: "40px" }}
                  onChange={(newDate) => setFromDate(dayjs(newDate.toDate()))}
                  value={dayjs(fromDate)}
                />
              </DemoContainer>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="To"
                  sx={{ width: "40px" }}
                  onChange={(newDate) => setToDate(dayjs(newDate.toDate()))}
                  value={dayjs(toDate)}
                />
              </DemoContainer>
              {/* {fromDate!=null?fromDate.$:"null"} */}
            </DateComponents>
            <h2>total : {total}</h2>
            <button onClick={handleCheckOut}>Checkout</button>
          </Right>
        </BookingStyle>

        <Box display="flex" flexWrap="wrap" justifyContent="center"></Box>
      </Box>
    </>
  );
};

export default Booking;

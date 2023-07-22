import React from "react";
import { styled } from "styled-components";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const Container = styled.div`
width:100%;
height:100vh;
display:flex;
overflow:hidden;
position:relative;
margin-top:20px;`

const Arrow = styled.div`
width:50px;
height:50px;
background-color:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
bottom:0;
margin:auto;
left:${props=>props.direction==='left' && '10px'};
right:${props=>props.direction==='right' && '10px'};
cursor:pointer;
opacity:0.5;`

const Wrapper= styled.div`
height:100%;`

const Slide= styled.div`
display:flex;
align-items:center;
width:100vw;
height:100vh;
`
const Image = styled.img`
height:80%;
`;
const Imgcontainer= styled.div`
flex:1;
height:100%;`
const InfoContainer= styled.div`
flex:1;
padding:20px;`

const Title = styled.h1`
font-size:70px;`
const Desc = styled.p`
margin:50px 0px;
font-size:20px
font-weight:500;
letter-spacing:1.2px;
`;

const Button = styled.button``

const Slider=()=>{
    return(<Container>
        <Arrow direction='left'>
        <ArrowLeftOutlinedIcon/>
        </Arrow>
        <Wrapper>
            <Slide>
        <Imgcontainer>
        <Image src='https://zoomcar-assets.zoomcar.com/images/original/1a66b1dffc1c18e0b598ee3bf564e35a5e462a53.jpg?1680853225'/>
        </Imgcontainer>
        <InfoContainer>
            <Title>Largest Car Sharing Marketplace</Title>
            <Desc>Sedans for short distances, SUVs for tough terrains, luxury cars for surprises</Desc>
            <Button></Button>
        </InfoContainer>
        </Slide>
        </Wrapper>
        <Arrow direction='right'>
        <ArrowRightOutlinedIcon/>
        </Arrow>
    </Container>)
}

export default Slider
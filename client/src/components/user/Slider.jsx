// import React from "react";
// import { styled } from "styled-components";
// import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
// import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
// import { mobile } from "../Responsive";

// const Container = styled.div`
// width:100%;
// height:100vh;
// display:flex;
// overflow:hidden;
// position:relative;
// ${mobile({display:"none"})}`;

// const Arrow = styled.div`
// width:50px;
// height:50px;
// background-color:white;
// border-radius:50%;
// display:flex;
// align-items:center;
// justify-content:center;
// position:absolute;
// top:0;
// bottom:0;
// margin:auto;
// left:${props=>props.direction==='left' && '10px'};
// right:${props=>props.direction==='right' && '10px'};
// cursor:pointer;
// opacity:0.5;
// z-index: 2;`;

// const Wrapper= styled.div`
// height:100%;
// display:flex;
// width:200%
// grid-template-columns: 1fr 1fr;
// transition: all 1.5s ease;
// transform: translateX(${(props) => props.slideIndex * -100}%);`;

// const Slide= styled.div`
// display:flex;
// align-items:center;
// width:100vw;
// height:100vh;
// background-color: #${(props) => props.bg};

// `;
// const Image = styled.img`
// height:80%;
// width:100vw;
// `;

// const Imgcontainer= styled.div`
// flex:1;
// height:100%;
// display:flex;
// background-color:green`;
// const InfoContainer= styled.div`
// flex:1;
// // padding:20px;
// display:flex;
// flex-direction: column;
//   justify-content: center;
// background-color:red`
// ;

// const Title = styled.h1`
// font-size:70px;`;
// const Desc = styled.p`
// margin:50px 0px;
// font-size:20px;
// font-weight:500;
// letter-spacing:3px;
// `;

// const Button = styled.button`
// padding: 10px;
// font-size: 20px;
// background-color: transparent;
// cursor: pointer;`

// const Slider=()=>{
//     return(<Container>
//         <Arrow direction='left'>
//         <ArrowLeftOutlinedIcon/>
//         </Arrow>
//         <Wrapper>
//             <Slide>
//         <Imgcontainer>
//         <Image src='https://zoomcar-assets.zoomcar.com/images/original/1a66b1dffc1c18e0b598ee3bf564e35a5e462a53.jpg?1680853225' />
//         </Imgcontainer>
//         <InfoContainer>
//             <Title>Car Marketplace</Title>
//             <Desc>Sedans for short distances, SUVs for tough terrains, luxury cars for surprises</Desc>
//             <Button></Button>
//         </InfoContainer>
//         </Slide>
//         </Wrapper>
//         <Arrow direction='right'>
//         <ArrowRightOutlinedIcon/>
//         </Arrow>
//     </Container>)
// }

// export default Slider

//  import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
//  import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import styled from "styled-components";
// import { sliderItems } from "../data";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

// const Arrow = styled.div`
//   width: 50px;
//   height: 50px;
//   background-color: #fff7f7;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: ${(props) => props.direction === "left" && "10px"};
//   right: ${(props) => props.direction === "right" && "10px"};
//   margin: auto;
//   cursor: pointer;
//   opacity: 0.5;
//   z-index: 2;
// `;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 25px;
`;

const Title = styled.h1`
  font-size: 60px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const handleClick = (direction) => {
//     if (direction === "left") {
//       setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
//     } else {
//       setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
//     }
//   };

  return (
    <Container >
      {/* <Arrow direction="left" >
        <ArrowLeftOutlinedIcon />
      </Arrow> */}
      <Wrapper >
        
          <Slide >
            <ImgContainer>
              <Image  src='https://zoomcar-assets.zoomcar.com/images/original/1a66b1dffc1c18e0b598ee3bf564e35a5e462a53.jpg?1680853225'/>
            </ImgContainer>
            <InfoContainer>
              <Title>Car Marketplace</Title>
              <Desc>Sedans for short distances, SUVs for tough terrains, luxury cars for surprises</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        
      </Wrapper>
      {/* <Arrow direction="right" >
        <ArrowRightOutlinedIcon />
      </Arrow> */}
    </Container>
  );
};

export default Slider;
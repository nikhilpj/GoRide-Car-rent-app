// import styled from "styled-components";

// const Info = styled.div`
// opacity: 0;
// width: 100%;
// height: 100%;
// position: absolute;
// top: 0;
// left: 0;
// background-color: rgba(0, 0, 0, 0.2);
// z-index: 3;
// display: flex;
// align-items: center;
// justify-content: center;
// transition: all 0.5s ease;
// cursor: pointer;
// `;


// const Container = styled.div`
//   flex: 1;
//   margin: 5px;
//   min-width: 280px;
//   height: 350px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f5fbfd;
//   position: relative;

//   &:hover ${Info}{
//     opacity: 1;
//   }
// `;

// const Circle = styled.div`
// width: 200px;
// height: 200px;
// border-radius: 50%;
// background-color: white;
// position: absolute;

// `;
// const Image = styled.img`
//   height: 75%;
//   z-index: 2;
// `;

// const Product = ({ item }) => {
//   return (
//     <Container>
//       <Circle />

//       <Image src={item.image.secure_url} alt="product image" />
//       <Info>
//         <h3>
//           {item.brand} {item.model}
//         </h3>
//         <p>Fuel Type: {item.fuelType} </p>
//         <p>Rate: {item.Rate}/hr</p>
//       </Info>
//     </Container>
//   );
// };

// export default Product;

import { Box,Card, CardActionArea ,CardMedia,CardContent,Typography} from "@mui/material";


const Product = ({item})=>{
  return (
    <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',margin:'10px'}}>
      <Card sx={{maxWidth:'355px',display:'flex',m:2}}>
        <CardActionArea>
          <CardMedia sx={{minHeight:'200px'}} component={'img'} src={item.image.secure_url} />
          <CardContent >
            <Typography variant="h6"  >
            {item.brand} {item.model}
            </Typography>
            <Typography variant="body2">
            Rate: {item.Rate}/hr
            </Typography>
          </CardContent>
          </CardActionArea>
      </Card>
    </Box>
  )
}

export default Product

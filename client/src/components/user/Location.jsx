import { Box,Card, CardActionArea ,CardMedia,CardContent,Typography} from "@mui/material";
import { Link } from "react-router-dom";


const Location = ({item})=>{
  return (
    <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',margin:'10px'}}>
     <Link to={`/location/${item._id}`} ><Card sx={{maxWidth:'355px',display:'flex',m:2}}>
        <CardActionArea>
          <CardMedia sx={{minHeight:'200px'}} component={'img'} src={item.image.secure_url}/>
          <CardContent >
            <Typography variant="h6"  >
            {item.locationName}
            </Typography>
            
          </CardContent>
          </CardActionArea>
      </Card></Link>
    </Box>
  )
}

export default Location
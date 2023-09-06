import React from "react";
import { Box ,Typography} from "@mui/material";
import Lists from "../scenes/Locations/Lists";

const StoreManage = ()=>{
    return (<>
    <Box>
    <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Store management
      </Typography>
      <Lists/>
    </Box>
    </>)
}

export default StoreManage
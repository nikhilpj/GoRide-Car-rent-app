import styled from "styled-components";
import axios  from "../../axios/instance";
import { useEffect, useState } from "react";
import Location from "./Location";

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

`;

const Locations = () => {
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    async function getlocations() {
        try {
            console.log("locatiion fetcjing on the way")
            const response = await axios({
              method: "get",
              url: "api/user/getlocations",
            })
              
             console.log("data of location is ",response)
             setLocationsData(response.data.data)
        } catch (e) {
            console.log("error in fetching location details", e);
        }
       
    }
    getlocations();
  }, []);
  return (
    <Container >
      {locationsData.map((item) => (
        <Location key={item._id} item={item} />
      ))}
    </Container>
  );
};

export default Locations;

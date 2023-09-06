import styled from "styled-components";
import axios from "../../axios/instance";
import { useEffect, useState } from "react";
import Product from "./Product";

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;

`;

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: "get",
        url: "/api/user/getProdctDetails",
      })
        .then((req, res) => {
          console.log("data of products", req.data);
          setProductsData(req.data.ProductData);
        })
        .catch((e) => {
          console.log("error in fetching product details is ", e);
        });
    }
    getProducts();
  }, []);
  return (
    <Container >
      {productsData.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </Container>
  );
};

export default Products;

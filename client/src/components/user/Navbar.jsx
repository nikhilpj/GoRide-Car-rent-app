import styled from "styled-components";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  flex: 1;
  display:flex;
  align-items:center;
  justify-content:flex-end;
`;
const Center = styled.div`
  flex: 1;
  text-align:center;
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const MenuItem = styled.div`
  font-size:14px;
  cursor:pointer;
  margin-left:25px;
`;

const NavBar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>En</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{color:'gray',fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Goride</Logo>
        </Center>
        <Right><MenuItem>Register</MenuItem>
        <MenuItem>SignIn</MenuItem></Right>
        <MenuItem>  <Badge badgeContent={4} color="primary">
        <MailIcon  />
      </Badge></MenuItem>
      </Wrapper>
    </Container>
  );
};

export default NavBar;

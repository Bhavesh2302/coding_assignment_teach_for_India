import { Avatar, Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user_token = localStorage.getItem("user_token");
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  console.log(user_token);
  console.log(user_data);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    navigate("/login");
  };

  return (
    <Flex w="100%" p="15px" bg="#0274b3" justifyContent="space-between">
      <Box w="20%" height="56x" m="auto">
        <Image
          src="https://www.teachforindia.org/static/logo.f2952a75.png"
          width="80%"
          height="56px"
          alt="teachForIndia_Logo"
        />
      </Box>
      <Flex
        justifyContent={"space-around"}
        color="white"
        w="75%"
        alignItems={"center"}
      >
        {" "}
        <Box
          w="20%"
          fontSize="20px"
          fontWeight="bold"
          display={"flex"}
          gap="10px"
          alignItems={"center"}
        >
          <Box>
            <Avatar
              src="https://bit.ly/broken-link"
              h="40px"
              w="40px"
              fontSize={"20px"}
            />
          </Box>
          {user_token && user_data ? (
            <Box>{user_data.name}</Box>
          ) : (
            <Box>
              <Link to="/login">Login</Link>
            </Box>
          )}
        </Box>
        <Box fontSize="20px" fontWeight="bold">
          <Link to="/signup">Signup</Link>
        </Box>
        <Box>
          {user_data && user_data.role === "volunteer" ? (
            <Button
              color="white"
              bg="#0971f1"
              _hover={{
                color: "white.100",
              }}
              onClick={() => {
                navigate("/volunteer");
              }}
            >
              Wanna Be A Volunteer Just Click
            </Button>
          ) : (
            <Button
              color="white"
              bg="#0971f1"
              _hover={{
                color: "white.100",
              }}
              onClick={() => {
                navigate("/list");
              }}
            >
              List Of Volunteers
            </Button>
          )}
        </Box>
        {user_token ? (
          <Box>
            <Button
              onClick={handleLogout}
              color="white"
              bg="#0971f1"
              _hover={{
                color: "white.100",
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;

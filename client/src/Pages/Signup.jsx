import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupToast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSignup = () => {
    const payload = {
      name,
      email,
      password,
    };

    fetch("https://teachforindiaserver-production.up.railway.app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        signupToast({
          title: "signup Success",
          position: "top",
          description: "you are successfully Signed up",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box width={"100%"}>
      <Box
        width={{ base: "80%", sm: "80%", md: "60%", lg: "40%" }}
        m="auto"
        mt="50px"
        padding="20px"
        h="440px"
        borderRadius="10px"
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
        }
      >
        <Text fontWeight={"bold"} mt="10px" mb="20px" fontSize={"22px"}>
          Register Here
        </Text>
        <Box w="80%" m="auto">
          <FormControl isRequired mb="10px">
            <FormLabel>Name</FormLabel>
            <Input
              borderRadius={"0"}
              type="text"
              placeholder="enter your name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mb="10px">
            <FormLabel>Email</FormLabel>
            <Input
              borderRadius={"0"}
              type="email"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mb="10px">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                borderRadius={0}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant={"solid"}
                borderRadius={"0px"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputGroup>
          </FormControl>
          <Box>
            <Button
              variant={"solid"}
              w="100%"
              bg="#0274b3"
              color={"white"}
              mt="5px"
              onClick={handleSignup}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mb={"20px"}>
        <Button
          variant={"unstyled"}
          onClick={() => {
            navigate("/login");
          }}
        >
          {" "}
          Already a user? Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;

import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginToast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };

    fetch("http://localhost:7500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg === "login successfull" && res.token) {
          localStorage.setItem("user_token", res.token);
          loginToast({
            title: "Login Success",
            position: "top",
            description: "you are successfully logged in",
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          navigate("/");
        }
        if (res.user) {
          localStorage.setItem("user_data", JSON.stringify(res.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box w="100%">
      <Box
        width={{ base: "80%", sm: "80%", md: "60%", lg: "40%" }}
        m="auto"
        padding="20px"
        borderRadius="10px"
        mt="50px"
        h="380px"
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
        }
      >
        <Text fontWeight={"bold"} mt="10px" mb="10px" fontSize={"22px"}>
          Sign in
        </Text>
        <Box w="80%" m="auto">
          <FormControl isRequired mt="20px">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email here"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormControl>

          <FormControl isRequired mt="20px">
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
          <Button
            w="100%"
            variant={"solid"}
            mt="30px"
            bg={"#0274b3"}
            color={"white"}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Box mb={"20px"}>
        <Button
          variant={"unstyled"}
          onClick={() => {
            navigate("/signup");
          }}
        >
          {" "}
          Not registered yet? Register
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Checkbox,
  CheckboxGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const VolunteerForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    location: "",
  });

  const token = localStorage.getItem("user_token");

  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [availability, setAvailability] = useState([]);

  const addVolunteerToast = useToast();

  const handleAddVolunteer = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleLanguageChange = (e) => {
    let language = [...spokenLanguages];
    const option = e.target.value;

    if (spokenLanguages.includes(option)) {
      language.splice(language.indexOf(option), 1);
    } else {
      language.push(option);
    }
    console.log(language);
    setSpokenLanguages(language);
  };

  const handleAvailability = (e) => {
    let availableAt = [...availability];
    const option = e.target.value;

    if (availability.includes(option)) {
      availableAt.splice(availableAt.indexOf(option), 1);
    } else {
      availableAt.push(option);
    }
    console.log(availableAt);
    setAvailability(availableAt);
  };

  const handleSubmit = (e) => {
    console.log("hello");
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      mobileNumber: form.mobileNumber,
      address: form.address,
      location: form.location,
      spokenLanguages: spokenLanguages,
      availability: availability,
    };

    fetch("https://teachforindiaserver-production.up.railway.app/volunteer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "volunteer added successfully") {
          addVolunteerToast({
            title: "volunteer added successfull",
            position: "top",
            description: "you are successfully added as volunteer",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
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
        mt="20px"
        padding="20px"
        borderRadius="10px"
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
        }
      >
        <form onSubmit={handleSubmit}>
          <Text fontWeight={"bold"} mt="10px" mb="20px" fontSize={"22px"}>
            {" "}
            Wanna Be A Volunteer
          </Text>
          <Text fontWeight={"bold"} mb="20px" fontSize={"22px"}>
            Register Here
          </Text>
          <Box w="80%" m="auto">
            <FormControl isRequired mb="10px">
              <FormLabel>Name</FormLabel>
              <Input
                borderRadius={"0"}
                type="text"
                name="name"
                value={form.name}
                placeholder="enter your name"
                onChange={handleAddVolunteer}
              />
            </FormControl>

            <FormControl isRequired mb="10px">
              <FormLabel>Email</FormLabel>
              <Input
                borderRadius={"0"}
                type="email"
                name="email"
                value={form.email}
                placeholder="enter your email"
                onChange={handleAddVolunteer}
              />
            </FormControl>

            <FormControl isRequired mb="10px">
              <FormLabel>Mobile Number</FormLabel>
              <Input
                borderRadius={"0"}
                type="number"
                name="mobileNumber"
                value={form.mobileNumber}
                placeholder="enter your mobile number"
                onChange={handleAddVolunteer}
              />
            </FormControl>

            <FormControl isRequired mb="10px">
              <FormLabel>Address</FormLabel>
              <Input
                borderRadius={"0"}
                type="text"
                name="address"
                value={form.address}
                placeholder="enter your address"
                onChange={handleAddVolunteer}
              />
            </FormControl>

            <FormControl isRequired mb="10px">
              <FormLabel>Location</FormLabel>
              <Input
                borderRadius={"0"}
                type="text"
                name="location"
                value={form.location}
                placeholder="enter your location"
                onChange={handleAddVolunteer}
              />
            </FormControl>

            <FormControl mb="10px">
              <FormLabel>Spoken Languages</FormLabel>
              <Stack
                spacing={[1, 3]}
                direction={{ base: "column", sm: "column", md: "row" }}
              >
                <Checkbox
                  onChange={handleLanguageChange}
                  value="Gujarati"
                  defaultChecked={spokenLanguages.includes("Gujarati")}
                >
                  Gujarati
                </Checkbox>
                <Checkbox
                  onChange={handleLanguageChange}
                  value="Hindi"
                  defaultChecked={spokenLanguages.includes("Hindi")}
                >
                  Hindi
                </Checkbox>
                <Checkbox
                  onChange={handleLanguageChange}
                  value="Tamil"
                  defaultChecked={spokenLanguages.includes("Tamil")}
                >
                  Tamil
                </Checkbox>
                <Checkbox
                  onChange={handleLanguageChange}
                  value="Marathi"
                  defaultChecked={spokenLanguages.includes("Marathi")}
                >
                  Marathi
                </Checkbox>
              </Stack>
            </FormControl>

            <FormControl mb="10px">
              <FormLabel>Availability</FormLabel>
              <Stack spacing={[1, 3]} direction={"row"} w="80%">
                <Checkbox
                  onChange={handleAvailability}
                  value="Monday"
                  defaultChecked={availability.includes("Monday")}
                >
                  Monday
                </Checkbox>
                <Checkbox
                  onChange={handleAvailability}
                  value="Tuesday"
                  defaultChecked={availability.includes("Tuesday")}
                >
                  Tuesday
                </Checkbox>
                <Checkbox
                  onChange={handleAvailability}
                  value="Wednesday"
                  defaultChecked={availability.includes("Wednesday")}
                >
                  Wednesday
                </Checkbox>
                <Checkbox
                  onChange={handleAvailability}
                  value="Thursday"
                  defaultChecked={availability.includes("Thursday")}
                >
                  Thursday
                </Checkbox>
              </Stack>
              <Stack spacing={[1, 3]} direction={"row"} mt="10px">
                <Checkbox
                  onChange={handleAvailability}
                  value="Friday"
                  defaultChecked={availability.includes("Friday")}
                >
                  Friday
                </Checkbox>
                <Checkbox
                  onChange={handleAvailability}
                  value="Saturday"
                  defaultChecked={availability.includes("Saturday")}
                >
                  Saturday
                </Checkbox>
                <Checkbox
                  onChange={handleAvailability}
                  value="Sunday"
                  defaultChecked={availability.includes("Sunday")}
                >
                  Sunday
                </Checkbox>
              </Stack>
            </FormControl>
            <Box>
              <Button
                variant={"solid"}
                w="100%"
                bg="#0274b3"
                color={"white"}
                mt="5px"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default VolunteerForm;

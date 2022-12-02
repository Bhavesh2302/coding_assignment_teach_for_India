import { Box, Button } from "@chakra-ui/react";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

const VolunteerList = () => {
  const token = localStorage.getItem("user_token");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://teachforindiaserver-production.up.railway.app/volunteer/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.allVolunteers);
      });
  }, []);

  return (
    <Box w="100%">
      <TableContainer w="100%" m="auto" mt="30px">
        <Table variant="striped" colorScheme="teal">
          <TableCaption>List Of Volunteers</TableCaption>
          <Thead>
            <Tr>
              <Th fontWeight={"bold"} fontSize="16px">
                Sr.No.
              </Th>
              <Th fontWeight={"bold"} fontSize="16px">
                Name
              </Th>
              <Th fontWeight={"bold"} fontSize="16px">
                Email
              </Th>
              <Th fontWeight={"bold"} fontSize="16px">
                Contact
              </Th>
              <Th fontWeight={"bold"} fontSize="16px">
                Location
              </Th>
              <Th fontWeight={"bold"} fontSize="16px">
                Spoken Languages
              </Th>
              <Th fontWeight={"bold"} fontSize="16px">
                Availability
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((item, index) => (
                <Tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.mobileNumber}</Td>
                  <Td>{item.location}</Td>
                  <Td>{item.spokenLanguages?.join(", ")}</Td>
                  <Td>{item.availability?.join(", ")}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box>
        <Button>Allocate Volunteers</Button>
      </Box>
    </Box>
  );
};

export default VolunteerList;

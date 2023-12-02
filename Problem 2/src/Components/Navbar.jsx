import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,useBreakpointValue
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { add,search } from "../features/contactSlice";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector((state) => state.auth.token);

  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    setFormData({
      name: "",
      contactNumber: "",
      email: "",
      address: "",
    });
  };

  const handleSearch = () => {
    axios
    .get(`https://tired-mite-tights.cyclic.app/contactinfo/search?name=${searchTerm}`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      dispatch(search(response.data.data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddContact = () => {
    axios
      .post("https://tired-mite-tights.cyclic.app/contactinfo/create", formData, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        dispatch(add(response.data.data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="blue.800" p={4} color="white">
      <Flex align="center">
        {!isSmallScreen && (
          <Heading as="h1" size="lg">
            Phonebook
          </Heading>
        )}

        <Spacer />

        <Input
          w={200}
          m={3}
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button colorScheme="purple" mr={2} onClick={handleSearch}>
          Search
        </Button>

        <Button colorScheme="green" mr={2} onClick={onOpen}>
          Add
        </Button>

        {!isSmallScreen && (
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;

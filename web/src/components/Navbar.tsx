import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = ({}) => {
  let body = null;

  body = <Flex></Flex>;

  return (
    <Flex zIndex={1} position="sticky" top="0" bg="tomato" p={4}>
      <Heading>DoiT assignment</Heading>
      <Box ml={"auto"}>{body}</Box>
      Yoni Ender
    </Flex>
  );
};

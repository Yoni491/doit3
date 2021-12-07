import { Box, Flex, Heading, SlideFade } from "@chakra-ui/react";
import React from "react";
interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = ({}) => {
  let body = null;
  body = <Flex></Flex>;

  return (
    <Flex zIndex={1} position="sticky" top="0" bg="tomato" p={4}>
      <SlideFade reverse={true} in={true} offsetY="40px">
        <Heading>DoiT assignment</Heading>
      </SlideFade>
      <Box ml={"auto"}>{body}</Box>
      Yoni Ender
    </Flex>
  );
};

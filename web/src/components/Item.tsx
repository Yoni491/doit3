import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { DeleteItemButton } from "./DeleteItemButton";

interface ItemProps {
  id: string;
  name: string;
}
export const Item: React.FC<ItemProps> = ({ id, name }) => {
  const MotionFlex = motion(Flex);
  return (
    <Box
      py={3}
      px={3}
      borderRadius="md"
      bg="teal.50"
      borderLeft="2px"
      borderColor="teal.500"
    >
      <MotionFlex
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Box>
          <Heading fontSize="s"> {id}</Heading>
          <Text fontSize="xl">{name}</Text>
        </Box>
        <Box ml={"auto"}>
          <DeleteItemButton deleteItemId={id} />
        </Box>
      </MotionFlex>
    </Box>
  );
};

import React from "react";
import { useDeleteItemMutation } from "../generated/graphql";
import { Box, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface DeleteItemButtonProps {
  deleteItemId: string;
}

export const DeleteItemButton: React.FC<DeleteItemButtonProps> = ({
  deleteItemId,
}) => {
  const [, deleteItem] = useDeleteItemMutation();

  return (
    <Box>
      <IconButton
        aria-label="Delete Post"
        icon={<DeleteIcon />}
        onClick={async () => {
          deleteItem({
            deleteItemId,
          });
        }}
      />
    </Box>
  );
};

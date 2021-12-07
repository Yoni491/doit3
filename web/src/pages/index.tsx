import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button, ScaleFade } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DeleteItemButton } from "../components/DeleteItemButton";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateItemMutation, useItemsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/creatUrqlClient";

const createItem: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createItem] = useCreateItemMutation();
  const [{ data, fetching }] = useItemsQuery();
  const MotionFlex = motion(Flex);

  if (!fetching && !data) {
    return <div>loading data failed</div>;
  }
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          const { error } = await createItem(values);
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="name"
                placeholder="text..."
                label="Enter text:"
                textarea
              ></InputField>
            </Box>
            <Button
              mt={2}
              mb={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              add item
            </Button>
          </Form>
        )}
      </Formik>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} wordBreak={"break-word"}>
          {data!.items.map((p) =>
            !p ? null : (
              <MotionFlex
                py={3}
                px={3}
                borderRadius="md"
                bg="teal.50"
                w="full"
                borderLeft="2px"
                borderColor="teal.500"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                layout
              >
                <Box>
                  <Flex>
                    <Heading fontSize="s"> {p.id}</Heading>
                  </Flex>
                  <Text fontSize="xl">{p.name}</Text>
                </Box>
                <Box ml={"auto"}>
                  <DeleteItemButton deleteItemId={p.id} />
                </Box>
              </MotionFlex>
            )
          )}
        </Stack>
      )}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(createItem);

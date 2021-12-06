import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateItemMutation, useItemsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/creatUrqlClient";

const createItem: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createItem] = useCreateItemMutation();
  const [{ data, fetching }] = useItemsQuery();
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
          {data!.items.map((p) => (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <Box>
                <Flex>
                  <Heading fontSize="s"> {p.id}</Heading>
                </Flex>
                <Text fontSize="xl">{p.name}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(createItem);

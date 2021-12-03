import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateItemMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/creatUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const createItem: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createItem] = useCreateItemMutation();
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
                name="text"
                placeholder="text..."
                label="Enter text:"
                textarea
              ></InputField>
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              add item
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(createItem);

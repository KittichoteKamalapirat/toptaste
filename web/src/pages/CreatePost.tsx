import React from "react";
import { XYCenter } from "../components/layouts/XYCenter";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XCenter } from "../components/layouts/XCenter";
import { ValuesOfCorrectTypeRule } from "graphql";
import { useCreatePostMutation } from "../generated/graphql";
import { Box, Typography, Button } from "@mui/material";

interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  return (
    <XYCenter>
      <Box>
        <Box textAlign="center">
          <Typography variant="h5" component="h2">
            Add a new restaurant
          </Typography>
        </Box>
        <Formik
          initialValues={{
            title: "",
            text: "",
            url: "",
          }}
          onSubmit={async (values) => {
            try {
              const { data, errors } = await createPost({
                variables: {
                  input: {
                    ...values,
                  },
                },
                update: (cache) => {
                  cache.evict({ fieldName: "posts:{}" });
                },
              });

              if (!errors) {
                navigate("/");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {() => (
            <Form>
              <Box m={4}>
                <Field
                  name="title"
                  placeholder="Restaurant Name"
                  component={InputField}
                  type="title"
                  required
                />
              </Box>

              <Box m={4}>
                <Field
                  name="text"
                  placeholder="Description"
                  component={InputField}
                  type="text"
                  multiline
                  maxRows={4}
                  required
                />
              </Box>

              <Box m={4}>
                <Field
                  name="url"
                  placeholder="url image "
                  component={InputField}
                  type="url"
                />
              </Box>

              <XCenter>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create
                </Button>
              </XCenter>
            </Form>
          )}
        </Formik>
      </Box>
    </XYCenter>
  );
};

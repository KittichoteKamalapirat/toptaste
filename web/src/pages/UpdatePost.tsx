import { Box, Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XCenter } from "../components/layouts/XCenter";
import { XYCenter } from "../components/layouts/XYCenter";
import Loading from "../components/Loading";
import { usePostQuery, useUpdatePostMutation } from "../generated/graphql";

interface UpdatePostProps {}

export const UpdatePost: React.FC<UpdatePostProps> = ({}) => {
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: post,
    loading,
    error,
  } = usePostQuery({
    variables: {
      id: parseInt(params.id!),
    },
  });

  if (!params.id) {
    navigate("/");
  }

  if (loading || !post?.post) {
    return <Loading />;
  } else if (error || post?.post === null) {
    navigate(-1);
  }

  return (
    <XYCenter>
      <Box>
        <Box textAlign="center">
          <Typography variant="h5" component="h2">
            Update the restaurant info
          </Typography>
        </Box>

        <Formik
          initialValues={{
            title: post.post.title,
            text: post.post.text,
            url: post.post.url as string,
          }}
          onSubmit={async (values) => {
            try {
              const { data, errors } = await updatePost({
                variables: {
                  id: parseInt(params.id!),
                  input: {
                    ...values,
                  },
                },
              });

              if (!errors) {
                navigate(-1);
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

              <Box
                sx={{
                  height: 0,
                  pb: "100%",
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={post.post?.url ? post.post.url : undefined}
                  alt="restaurant"
                />
              </Box>

              <XCenter>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 6 }}
                >
                  Update
                </Button>
              </XCenter>
            </Form>
          )}
        </Formik>
      </Box>
    </XYCenter>
  );
};

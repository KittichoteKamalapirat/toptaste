import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React from "react";
import { XCenter } from "../components/layouts/XCenter";
import { XContainer } from "../components/layouts/XContainer";
import { Field, Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import {
  Post as PostType,
  useCreateReviewMutation,
  usePostQuery,
} from "../generated/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import Loading from "../components/Loading";

interface CreateReviewProps {}

export const CreateReview: React.FC<CreateReviewProps> = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const [createReview] = useCreateReviewMutation();
  const [date, setDate] = React.useState(new Date("2020-08-18T21:11:54"));
  const [score, setScore] = React.useState(0);

  const {
    data: post,
    loading,
    error,
  } = usePostQuery({
    variables: {
      id: parseInt(params.id!),
    },
  });

  const handleChange = (newDate: any) => {
    console.log({ newDate });
    setDate(newDate);
  };

  if (loading) {
    return <Loading />;
  } else if (error || post?.post === null) {
    navigate(-1);
  }
  return (
    <XContainer>
      <XCenter>
        <Box>
          <PostCard post={post?.post as PostType} />
          <Typography variant="h4" component="h2">
            Create a review
          </Typography>

          <Formik
            initialValues={{ comment: "" }}
            onSubmit={async (values) => {
              try {
                const { data, errors } = await createReview({
                  variables: {
                    postId: parseInt(params.id as string),
                    input: {
                      score: score,
                      comment: values.comment,
                      visitedDate: date.toISOString(),
                    },
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "bestReview" });
                    cache.evict({ fieldName: "worstReview" });
                    cache.evict({ fieldName: "latestReview" });
                    cache.evict({ fieldName: "post" });
                  },
                });

                if (!errors) {
                  navigate(`/restaurant/${params.id}`);
                }
              } catch (error) {}
            }}
          >
            {() => (
              <Form>
                <Box>
                  {" "}
                  <Rating
                    name="simple-controlled"
                    style={{ fontSize: "50px" }}
                    value={score}
                    onChange={(event, newValue) => {
                      setScore(newValue!);
                    }}
                  />
                </Box>

                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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
      </XCenter>
    </XContainer>
  );
};

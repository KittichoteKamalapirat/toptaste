import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XCenter } from "../components/layouts/XCenter";
import { XContainer } from "../components/layouts/XContainer";
import Loading from "../components/Loading";
import { PostCard } from "../components/PostCard";
import {
  Post as PostType,
  usePostQuery,
  useReviewQuery,
  useUpdateReviewMutation,
} from "../generated/graphql";

interface UpdateReviewProps {}

export const UpdateReview: React.FC<UpdateReviewProps> = ({}) => {
  const params = useParams();
  const navigate = useNavigate();

  // api call to server
  const [updateReview] = useUpdateReviewMutation();
  const {
    data: reviewData,
    loading: reviewLoading,
    error: reviewError,
  } = useReviewQuery({
    variables: { id: parseInt(params.reviewId as string) },
  });
  const [score, setScore] = React.useState(reviewData?.review.score);

  const [date, setDate] = React.useState<Date>(); //initial value from db
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = usePostQuery({
    variables: {
      id: parseInt(params.postId as string),
    },
  });

  const handleChange = (newDate: any) => {
    setDate(newDate);
  };

  useEffect(() => {
    console.log("review Data");
    console.log(reviewData?.review.visitedDate);
    const jsDate = new Date(parseInt(reviewData?.review.visitedDate as string));
    console.log({ jsDate });
    // const formatted = moment(jsDate); //Datez
    setDate(jsDate);
    setScore(reviewData?.review.score);
  }, [reviewData]);

  if (postLoading || reviewLoading) {
    return <Loading />;
  } else if (postError || reviewError || postData?.post === null) {
    console.log("here");
    console.log({ postError });
    console.log({ reviewError });
    navigate(-1);

    return <div>Error</div>;
  }

  return (
    <XContainer>
      <Box>
        <PostCard post={postData?.post as PostType} />

        <Box marginY={4}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            component="h2"
            textAlign={"center"}
          >
            Update a review
          </Typography>
        </Box>

        <Formik
          initialValues={{
            comment: reviewData?.review.comment,
          }}
          onSubmit={async (values) => {
            try {
              const { data, errors } = await updateReview({
                variables: {
                  id: parseInt(params.reviewId as string),
                  postId: parseInt(params.postId as string),
                  input: {
                    score: score as number,
                    comment: values.comment as string,
                    visitedDate: date?.toISOString(),
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
                // navigate(`/restaurant/${params.id}`);
                navigate("/admin");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {() => (
            <Form>
              <Box>
                <XCenter>
                  <Rating
                    name="simple-controlled"
                    sx={{
                      marginTop: 2,
                      fontSize: 50,
                    }}
                    value={score}
                    onChange={(event, newValue) => {
                      setScore(newValue!);
                    }}
                    data-test="rating"
                  />
                </XCenter>
              </Box>

              <Box sx={{ marginTop: 2 }}>
                <Typography marginBottom={2}>Visited Date</Typography>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        placeholder="Visited Date"
                        required
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>

              <Box marginY={4}>
                <Field
                  name="comment"
                  placeholder="Leave a comment?"
                  component={InputField}
                  type="comment"
                  multiline
                  maxRows={4}
                  rows={4}
                  fullWidth
                />
              </Box>

              <XCenter>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update
                </Button>
              </XCenter>
            </Form>
          )}
        </Formik>
      </Box>
    </XContainer>
  );
};

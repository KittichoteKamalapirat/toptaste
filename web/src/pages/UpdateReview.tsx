import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XCenter } from "../components/layouts/XCenter";
import { XContainer } from "../components/layouts/XContainer";
import Loading from "../components/Loading";
import { PostCard } from "../components/PostCard";
import DateAdapter from "@mui/lab/AdapterMoment";
import {
  useCreateReviewMutation,
  usePostQuery,
  Post as PostType,
  useUpdateReviewMutation,
  useReviewQuery,
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
      <XCenter>
        <Box>
          <PostCard post={postData?.post as PostType} />
          <Typography variant="h4" component="h2">
            Update a review
          </Typography>

          <Formik
            initialValues={{
              comment: reviewData?.review.comment,
            }}
            onSubmit={async (values) => {
              try {
                console.log("score", score);
                console.log("comment", values.comment);
                console.log("date", date?.toISOString());
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
                    name="comment"
                    placeholder="Leave a comment"
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
                    Update
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

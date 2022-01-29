import { Box, Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XYCenter } from "../components/layouts/XYCenter";
import Loading from "../components/Loading";
import { useUpdateUserMutation, useUserQuery } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

interface updateUserProps {}

export const UpdateUser: React.FC<updateUserProps> = ({}) => {
  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();
  const params = useParams();
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { id: parseInt(params.id as string) },
  });

  if (userLoading) {
    return <Loading />;
  }
  return (
    <XYCenter>
      <Box>
        <Box textAlign="center">
          <Typography variant="h5" component="h2">
            Update User Account
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: userData?.user.email as string,
            username: userData?.user.username as string,
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await updateUser({
              variables: {
                id: parseInt(params.id as string),
                data: { ...values },
              },
            });

            const result = response.data?.updateUser;
            if (result?.errors) {
              setErrors(toErrorMap(result.errors));
            } else if (result?.user) {
              navigate(`/admin`);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="username"
                placeholder="username"
                component={InputField}
                type="username"
              />

              <Box mt={4}>
                <Field
                  name="email"
                  placeholder="Email"
                  component={InputField}
                  type="email"
                />
              </Box>

              <Box mt={4}>
                {/* {" "} */}
                <Field
                  name="password"
                  placeholder="password"
                  component={InputField}
                  type="password"
                />
              </Box>

              <Box textAlign="center" mt={5}>
                Already have an account? <Link to="/login">Log in</Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                //   isLoading={isSubmitting}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </XYCenter>
  );
};

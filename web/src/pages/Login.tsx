import { Box, Typography, Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XYCenter } from "../components/layouts/XYCenter";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  return (
    <XYCenter>
      <Box>
        <Box textAlign="center">
          <Typography variant="h5" component="h2">
            Log in
          </Typography>
        </Box>

        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: {
                usernameOrEmail: values.usernameOrEmail,
                password: values.password,
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login.user,
                  },
                });
              },
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              navigate("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="usernameOrEmail"
                placeholder="username or email"
                component={InputField}
                type="usernameOrEmail"
              />
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
                Don't have account? <Link to="/register">Sign up</Link>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </XYCenter>
  );
};

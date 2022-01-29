import { Box, Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XYCenter } from "../components/layouts/XYCenter";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";
import { UserContext } from "../util/UserContext";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  return (
    <XYCenter>
      <Box minWidth={"30%"}>
        <Box marginBottom={4} textAlign="center">
          <Typography variant="h5" component="h2">
            Create Account
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: {
                data: { ...values },
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              navigate("/");
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
                fullWidth
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </XYCenter>
  );
};

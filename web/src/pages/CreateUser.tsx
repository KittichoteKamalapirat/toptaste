import { Box, Button, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { XYCenter } from "../components/layouts/XYCenter";
import { useCreateUserMutation } from "../generated/graphql";
import { toErrorMap } from "../util/toErrorMap";

interface createUserProps {}

export const CreateUser: React.FC<createUserProps> = ({}) => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  return (
    <XYCenter>
      <Box>
        <Box textAlign="center">
          <Typography variant="h5" component="h2">
            Create a new user
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createUser({
              variables: {
                data: { ...values },
              },
              update: (cache, { data }) => {
                cache.evict({ fieldName: "users" });
              },
            });
            if (response.data?.createUser.errors) {
              setErrors(toErrorMap(response.data.createUser.errors));
            } else if (response.data?.createUser.user) {
              navigate("/admin");
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

              <Box mt={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </XYCenter>
  );
};

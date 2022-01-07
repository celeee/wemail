import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  Checkbox,
  FormControl,
  FormLabel,
  Link as ChakraLink,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import * as yup from "yup";

import loginImg from "../../assets/loginImg.png";
import { useLoginMutation } from "../../api/firebaseAuth";
import { setCredentials } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  let schema = yup.object().shape({
    email: yup.string().email().required("Enter valid email"),
    password: yup.string().required(),
    rememberMe: yup.boolean(),
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignIn = async (
    values: ILoginForm,
    actions: FormikHelpers<{
      email: string;
      password: string;
      rememberMe: boolean;
    }>
  ) => {
    const authData = {
      email: values.email,
      password: values.password,
      returnSecureToken: true,
    };

    try {
      const user = await login(authData).unwrap();

      const expirationTime = new Date(
        new Date().getTime() + +user.expiresIn * 1000
      ).getTime();

      const credentials = {
        token: user.idToken,
        refreshToken: user.refreshToken,
        expTime: expirationTime,
      };

      dispatch(setCredentials(credentials));

      actions.setSubmitting(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...credentials, numberOfReAuthCall: 0 })
      );
      navigate("/");
    } catch (error) {
      setFormError("Wrong username or password");
      actions.setSubmitting(false);
    }
  };

  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem>
          <Box
            backgroundImage={loginImg}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            width={"100%"}
            height={"100vh"}
          />
        </GridItem>
        <GridItem>
          <Flex
            minHeight="100vh"
            width="full"
            align="center"
            justifyContent="center"
            bg={"#213150"}
            p={{ base: 4 }}
          >
            <Box
              width="full"
              maxWidth="450px"
              textAlign="center"
              boxShadow="lg"
            >
              <Box
                p={4}
                py={6}
                bgGradient="linear-gradient(135deg, rgba(35,50,79,1) 0%, rgba(54,72,102,1) 100%);"
                border={"5px solid #526182"}
                rounded={"lg"}
              >
                <Box textAlign="left" color="white">
                  <Heading>Welcome back !</Heading>
                  <Text fontSize={{ base: "sm", sm: "md" }}>
                    Sign in with your credentials below
                  </Text>
                </Box>
                <Box my={8} textAlign="left" color="white">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      rememberMe: false,
                    }}
                    validationSchema={schema}
                    onSubmit={handleSignIn}
                  >
                    {(props: FormikProps<ILoginForm>) => {
                      const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                      } = props;
                      return (
                        <Form>
                          <FormControl
                            isInvalid={touched.email && !!errors.email}
                          >
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <Input
                              type="email"
                              id="email"
                              placeholder="Enter your email address"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>

                          <FormControl
                            mt={4}
                            isInvalid={touched.password && !!errors.password}
                          >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                              type="password"
                              id="password"
                              placeholder="Enter your password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <FormErrorMessage>
                              {errors.password}
                            </FormErrorMessage>
                          </FormControl>

                          {formError && (
                            <Text color="red" mt={4}>
                              {formError}
                            </Text>
                          )}

                          <Stack isInline justifyContent="space-between" mt={4}>
                            <Box>
                              <Checkbox
                                id="rememberMe"
                                checked={values.rememberMe}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                Remember Me
                              </Checkbox>
                            </Box>
                            <Box>
                              <ChakraLink as={Link} to="/login">
                                Forgot your password?
                              </ChakraLink>
                            </Box>
                          </Stack>

                          <Button
                            width="full"
                            mt={4}
                            bg="#5AC4D7"
                            py={6}
                            _hover={{ bg: "#1bc5e3" }}
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            Sign In
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </Box>
                <Box textAlign="center" color="white">
                  <Heading lineHeight={1.1} fontSize="lg" fontWeight={"normal"}>
                    Don't have an account?
                  </Heading>
                  <ChakraLink as={Link} to="/signup" fontWeight={"bold"}>
                    Create an account
                  </ChakraLink>
                </Box>
              </Box>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}

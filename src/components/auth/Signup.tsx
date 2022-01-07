import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  GridItem,
  FormControl,
  FormLabel,
  Link as ChakraLink,
  FormErrorMessage,
  SimpleGrid,
} from "@chakra-ui/react";

import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import * as yup from "yup";

import loginImg from "../../assets/loginImg.png";
import { useSignupMutation } from "../../api/firebaseAuth";
import { setCredentials } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { firebaseApi } from "../../api/firebase";

interface ISignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  let schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required("Enter valid email"),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const [signUp] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignUp = async (
    values: ISignUpForm,
    actions: FormikHelpers<{
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    const authData = {
      email: values.email,
      password: values.password,
      returnSecureToken: true,
    };

    try {
      const user = await signUp(authData).unwrap();

      const userFields = {
        fields: {
          email: { stringValue: values.email },
          userId: { stringValue: user.localId },
          fullName: { stringValue: values.fullName },
          photoURL: { stringValue: "" },
        },
      };

      const expirationTime = new Date(
        new Date().getTime() + +user.expiresIn * 1000
      ).getTime();

      const credentials = {
        token: user.idToken,
        refreshToken: user.refreshToken,
        expTime: expirationTime,
      };

      dispatch(setCredentials(credentials));

      dispatch(firebaseApi.endpoints.storeUser.initiate(userFields));

      actions.setSubmitting(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...credentials, numberOfReAuthCall: 0 })
      );
      navigate("/");
    } catch (error: any) {
      if (error.data.error.message === "EMAIL_EXISTS") {
        setFormError("Email already exist. Please use different email");
      } else {
        setFormError("Something went wrong, please try again");
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <GridItem display={{ base: "none", md: "block" }}>
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
                  <Heading>Sign Up</Heading>
                  <Text fontSize={{ base: "sm", sm: "md" }}>
                    Create your Account
                  </Text>
                </Box>
                <Box my={8} textAlign="left" color="white">
                  <Formik
                    initialValues={{
                      fullName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={schema}
                    onSubmit={handleSignUp}
                  >
                    {(props: FormikProps<ISignUpForm>) => {
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
                            isInvalid={touched.fullName && !!errors.fullName}
                          >
                            <FormLabel htmlFor="fullName">Full Name</FormLabel>
                            <Input
                              type="text"
                              id="fullName"
                              placeholder="Enter your Full Name"
                              value={values.fullName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <FormErrorMessage>
                              {errors.fullName}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            mt={4}
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

                          <FormControl
                            mt={4}
                            isInvalid={
                              touched.confirmPassword &&
                              !!errors.confirmPassword
                            }
                          >
                            <FormLabel htmlFor="confirmPassword">
                              Confirm Password
                            </FormLabel>
                            <Input
                              type="password"
                              id="confirmPassword"
                              placeholder="Confirm"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <FormErrorMessage>
                              {errors.confirmPassword}
                            </FormErrorMessage>
                          </FormControl>

                          {formError && (
                            <Text color="red" mt={4}>
                              {formError}
                            </Text>
                          )}

                          <Button
                            width="full"
                            mt={4}
                            bg="#5AC4D7"
                            py={6}
                            _hover={{ bg: "#1bc5e3" }}
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            Sign Up
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </Box>
                <Box textAlign="center" color="white">
                  <Heading lineHeight={1.1} fontSize="lg" fontWeight={"normal"}>
                    Already have an account?{" "}
                    <ChakraLink as={Link} to="/login" fontWeight={"bold"}>
                      Log in
                    </ChakraLink>
                  </Heading>
                </Box>
              </Box>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

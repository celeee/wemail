import {
  Box,
  Input,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  FormErrorMessage,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiFile } from "react-icons/fi";
import { useRef } from "react";
import Thumb from "../Thumb";
import { firebaseApi } from "../../api/firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import { InfoIcon } from "@chakra-ui/icons";
import { selectCurrentUser } from "../../store/auth/authSlice";

interface IMessageForm {
  recipients: string;
  subject: string;
  message: string;
  file: any;
}

export default function NewEmail() {
  const inputRef = useRef<any>();
  const navigate = useNavigate();
  const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  let schema = yup.object().shape({
    // recipients: yup
    //   .mixed()
    //   .when("isArray", {
    //     is: Array.isArray,
    //     then: yup.array().of(yup.string()),
    //     otherwise: yup.string(),
    //   })
    //   .required("Please specify at least one recipient."),
    recipients: yup
      .array()
      .transform(function (value, originalValue) {
        if (this.isType(value) && value !== null) {
          return value;
        }
        return originalValue ? originalValue.split(/[\s,]+/) : [];
      })
      .of(yup.string().email(({ value }) => `${value} is not a valid email`))
      .required("Please specify at least one recipient."),
    subject: yup.string().required("Please insert subject for the message"),
    message: yup.string(),
    file: yup.mixed(),
  });

  const handleSubmitMessage = async (
    values: IMessageForm,
    actions: FormikHelpers<{
      recipients: string;
      subject: string;
      message: string;
      file: any;
    }>
  ) => {
    try {
      const newEmail = {
        fields: {
          from: { stringValue: currentUser.email },
          isImportant: { booleanValue: false },
          message: { stringValue: values.message },
          recipients: {
            arrayValue: {
              values: values.recipients
                .split(/[\s,]+/)
                .map(mail => ({ stringValue: mail })),
            },
          },
          subject: { stringValue: values.subject },
          type: {
            stringValue: "received",
          },
          userId: { stringValue: currentUser.userId },
          timestamp: { timestampValue: new Date() },
        },
      };

      console.log(newEmail);

      const result = await dispatch(
        firebaseApi.endpoints.sendEmail.initiate(newEmail)
      );

      toast.info("Message was successfuly sent");

      actions.setSubmitting(false);
    } catch (error) {
      console.log(error);
      actions.setSubmitting(false);
    }
  };

  return (
    <Box w={"full"} p={5} overflow={"hidden"}>
      <Box color="white">
        <Formik
          initialValues={{
            recipients: "",
            subject: "",
            message: "",
            file: null,
          }}
          validationSchema={schema}
          onSubmit={handleSubmitMessage}
        >
          {(props: FormikProps<IMessageForm>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              setFieldValue,
            } = props;
            return (
              <>
                <Flex
                  my={1}
                  align="center"
                  justifyContent="space-between"
                  color="white"
                >
                  <Heading>
                    {values.subject ? values.subject : "New Message"}
                  </Heading>

                  <Button
                    size="md"
                    colorScheme="blue"
                    onClick={() => navigate(-1)}
                  >
                    <CloseIcon />
                  </Button>
                </Flex>
                <Form>
                  <VStack spacing={5}>
                    <FormControl
                      isInvalid={touched.recipients && !!errors.recipients}
                    >
                      <FormLabel htmlFor="recipients">To</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BsPerson color="gray.800" />}
                        />
                        <Input
                          autoComplete="off"
                          type="text"
                          id="recipients"
                          variant="outline"
                          size="md"
                          value={values.recipients}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors.recipients}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={touched.subject && !!errors.subject}
                    >
                      <FormLabel htmlFor="subject">Subject</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<MdOutlineEmail color="gray.800" />}
                        />
                        <Input
                          type="text"
                          size="md"
                          id="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors.subject}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Message</FormLabel>
                      <ReactQuill
                        value={values.message}
                        onChange={v => setFieldValue("message", v)}
                      />
                    </FormControl>

                    <FormControl>
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        color="white"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Send Message
                      </Button>
                    </FormControl>

                    {/* <FormControl> */}
                    {/* <FormControl>
                      <Flex gap={4}>
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          color="white"
                          type="submit"
                          isLoading={isSubmitting}
                        >
                          Send Message
                        </Button>

                        <InputGroup width={"25%"}>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<Icon as={FiFile} />}
                          />
                          <input
                          type="file"
                          accept="image/png, image/jpeg"
                          // name={name}
                          ref={inputRef}
                          // {...inputProps}
                          // inputRef={ref}
                          id="file"
                          onChange={handleChange}
                          style={{ display: "none" }}
                        ></input>

                          <input
                            id="file"
                            name="file"
                            type="file"
                            ref={inputRef}
                            onChange={event => {
                              if (event.currentTarget.files) {
                                console.log(event.currentTarget.files);
                                setFieldValue(
                                  "file",
                                  event.currentTarget.files[0]
                                );
                              }
                            }}
                            style={{ display: "none" }}
                          />
                          <Input
                            placeholder={"Your file ..."}
                            onClick={() => inputRef.current.click()}
                            defaultValue={"Upload image"}
                          />
                        </InputGroup>
                      </Flex>
                    </FormControl>

                    <Box mt={2} float={"left"} alignSelf={"flex-start"}>
                      <Thumb file={values.file} />
                    </Box> */}
                    {/* </FormControl> */}

                    {/* <FormControl>
                      <label htmlFor="file">File upload</label>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={event => {
                          if (event.currentTarget.files) {
                            console.log(event.currentTarget.files);
                            setFieldValue("file", event.currentTarget.files[0]);
                          }
                        }}
                        className="form-control"
                      />
                      <Thumb file={values.file} />
                    </FormControl> */}
                  </VStack>
                </Form>
              </>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}

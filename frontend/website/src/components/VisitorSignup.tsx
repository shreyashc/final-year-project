import {
  Anchor,
  Button,
  Container,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

interface formData {
  email: string;
  password: string;
  displayName: string;
}

const VisitorSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginUser = async (values: formData) => {
    setLoading(true);

    form.clearErrors();

    try {
      const res = await axios.post(BASE_URL + "auth/signup", {
        ...values,
        role: "jobseeker",
      });
      console.log(res);
      showNotification({
        title: "Notification",
        message: "Signup Successful",
        autoClose: 1000,
        color: "green",
      });
      navigate("/login");
    } catch (error: any) {
      // console.log(error.response.data.error.field);

      form.setFieldError(
        error.response.data.error.field,
        error.response.data.error.message
      );
    } finally {
      setLoading(false);
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      displayName: "",
    },

    validate: {
      email: (value) =>
        value.length < 1
          ? "Email is Required"
          : /^\S+@\S+$/.test(value)
          ? null
          : "Invalid email",
      password: (value) => (value.length > 0 ? null : "Password is Required"),
      displayName: (value) => (value.length > 0 ? null : "Name is Required"),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Signup to StartEzy!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
          <TextInput
            label="Name"
            placeholder="Your Name"
            mt="md"
            {...form.getInputProps("displayName")}
          />
          <TextInput
            label="Email"
            placeholder="Your Email"
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" type="submit">
            {loading ? <Loader color="white" variant="dots" /> : "Sign Up"}
          </Button>
        </form>
      </Paper>
      <Text color="dimmed" size="sm" align="center" mt={15}>
        Already have an account ?{" "}
        <Anchor component={Link} to="/login">
          Login here.
        </Anchor>
      </Text>
    </Container>
  );
};

export default VisitorSignup;


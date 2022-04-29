import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
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
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { loginAction } from "../context/actionCreators";
import { AuthContext } from "../context/authContext";

interface formData {
  email: string;
  password: string;
}

function Login() {
  const [loading, setLoading] = useState(false);

  const { dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = async (values: formData) => {
    setLoading(true);

    form.clearErrors();

    try {
      const res = await axios.post(BASE_URL + "api/auth/login", values);
      console.log(res);

      showNotification({
        title: "Login Successful",
        message: "you will be redirected soon.",
        autoClose: 2000,
        color: "green",
      });
      authDispatch(
        loginAction({
          userId: res.data.userId,
          email: res.data.email,
          role: res.data.role,
          token: res.data.token,
        })
      );
      navigate("/");
    } catch (error: any) {
      form.setFieldError(
        error.response.data.field,
        error.response.data.message
      );
    } finally {
      setLoading(false);
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 0 ? null : "Password is Required"),
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
        Welcome back to StartEzy!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor component={Link} to="/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            {loading ? <Loader color="white" variant="dots" /> : "Sign in"}
          </Button>
        </form>
      </Paper>
      <Text color="dimmed" size="sm" align="center" mt={15}>
        Do not have an account yet?{" "}
        <Anchor component={Link} to="/signup">
          Create an account
        </Anchor>
      </Text>
    </Container>
  );
}

export default Login;

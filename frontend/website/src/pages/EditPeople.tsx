import {
  Button,
  Center,
  Container,
  Loader,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { startupDetails } from "./StartupDashboard";

const EditPeople = () => {
  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<startupDetails>("/startup/dashboard/")
      .then((res) => {
        setStartupDetails(res.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [sd, setStartupDetails] = useState<startupDetails>();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState(false);
  const updateDetails = (data: any) => {
    setUpdating(true);
    apiClient
      .put("/startup/update-people/", data)
      .then((res) => {
        showNotification({
          title: "Notification",
          message: "Successfully updated.",
          autoClose: 1000,
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Notification",
          message: "Failed to update details.",
          autoClose: 1000,
          color: "red",
        });
      })
      .finally(() => {
        setUpdating(false);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (sd) {
      const { p1, b1,r1, p2, b2,r2, p3, b3,r3 } = sd.startup;
      form.setValues({ p1, b1,r1, p2, b2,r2, p3, b3,r3 });
    }
  }, [sd]);

  const form = useForm({
    initialValues: {
      p1: "",
      b1: "",
      r1:"",
      p2: "",
      b2: "",
      r2:"",
      p3: "",
      b3: "",
      r3:"",
    },
  });
  if (loading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="dark" size="xl" />
      </Center>
    );
  if (error)
    return (
      <Center style={{ height: "100vh" }}>
        <Text size="xl"> Someting went wrong. </Text>
      </Center>
    );
  return (
    <Container size="md">
      <form onSubmit={form.onSubmit((values) => updateDetails(values))}>
        <TextInput
          required
          label="Person 1 Name"
          placeholder="Person 1 Name"
          {...form.getInputProps("p1")}
        />

        <Textarea
          required
          autosize
          label="Person 1 bio"
          placeholder="Person 1 bio"
          {...form.getInputProps("b1")}
          mt={15}
        />

        <Textarea
          required
          autosize
          label="Person 1 role"
          placeholder="Person 1 role"
          {...form.getInputProps("r1")}
          mt={15}
        />

        <TextInput
          required
          label="Person 2 Name"
          placeholder="Person 2 Name"
          {...form.getInputProps("p2")}
        />

        <Textarea
          required
          autosize
          label="Person 2 bio"
          placeholder="Person 2 bio"
          {...form.getInputProps("b2")}
          mt={15}
        />

<Textarea
          required
          autosize
          label="Person 2 role"
          placeholder="Person 2 role"
          {...form.getInputProps("r2")}
          mt={15}
        />
        <TextInput
          required
          label="Person 3 Name"
          placeholder="Person 3 Name"
          {...form.getInputProps("p3")}
        />

        <Textarea
          required
          autosize
          label="Person 3 bio"
          placeholder="Person 3 bio"
          {...form.getInputProps("b3")}
          mt={15}
        />

<Textarea
          required
          autosize
          label="Person 3 role"
          placeholder="Person 3 role"
          {...form.getInputProps("r3")}
          mt={15}
        />

        <Button
          type="submit"
          variant="light"
          color="indigo"
          size="lg"
          fullWidth
          mt={15}
        >
          {updating ? <Loader color="white" variant="dots" /> : "Update People"}
        </Button>
      </form>
    </Container>
  );
};

export default EditPeople;

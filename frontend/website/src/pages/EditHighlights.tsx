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

const EditHighlights = () => {
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
      .put("/startup/update-highlights/", data)
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
      const { h1, d1, h2, d2, h3, d3 } = sd.startup;
      form.setValues({ h1, d1, h2, d2, h3, d3 });
    }
  }, [sd]);

  const form = useForm({
    initialValues: {
      h1: "",
      d1: "",
      h2: "",
      d2: "",
      h3: "",
      d3: "",
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
          label="Highlight 1"
          placeholder="Highlight 1"
          {...form.getInputProps("h1")}
        />

        <Textarea
          required
          autosize
          label="Highlight 1 Description"
          placeholder="Highlight 1 Description"
          {...form.getInputProps("d1")}
          mt={15}
        />
        <TextInput
          required
          label="Highlight 2"
          placeholder="Highlight 2"
          {...form.getInputProps("h2")}
        />

        <Textarea
          required
          autosize
          label="Highlight 2 Description"
          placeholder="Highlight 2 Description"
          {...form.getInputProps("d2")}
          mt={15}
        />
        <TextInput
          required
          label="Highlight 3"
          placeholder="Highlight 3"
          {...form.getInputProps("h3")}
        />

        <Textarea
          required
          autosize
          label="Highlight 3 Description"
          placeholder="Highlight 3 Description"
          {...form.getInputProps("d3")}
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

export default EditHighlights;

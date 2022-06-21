import {
  Button,
  Center,
  Container,
  Loader,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { startupDetails } from "./StartupDashboard";

const AddJobs = () => {
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

  // useEffect(() => {
  //   if (sd) {
  //     const { h1, d1, h2, d2, h3, d3 } = sd.startup;
  //     form.setValues({ h1, d1, h2, d2, h3, d3 });
  //   }
  // }, [sd]);

  const form = useForm({
    initialValues: {
      Title: "",
      Description: "",
      Experience: "",
      Salary:"",
      Applyby: "",
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
          label="Job title"
          placeholder="Title"
          {...form.getInputProps("Title")}
        />

        <Textarea
          required
          autosize
          label="Description"
          placeholder="Description"
          {...form.getInputProps("Description")}
          mt={15}
        />
        <TextInput
          required
          label="Experience"
          placeholder="Experience"
          {...form.getInputProps("Experience")}
        />

    <Textarea
          required
          autosize
          label="Salary"
          placeholder="Salary"
          {...form.getInputProps("Salary")}
          mt={15}
        />
        <DatePicker placeholder="Select date" label="Apply by" required 
          {...form.getInputProps("Applyby")}
        />

        <Button
          type="submit"
          variant="light"
          color="indigo"
          size="lg"
          fullWidth
          mt={15}
        >
          {updating ? <Loader color="white" variant="dots" /> : "Add Job"}
        </Button>
      </form>
    </Container>
  );
};

export default AddJobs;

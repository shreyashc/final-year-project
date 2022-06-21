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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const addJobs = (data: any) => {
    setUpdating(true);
    apiClient
      .post("/jobs", data)
      .then((res) => {
        showNotification({
          title: "Notification",
          message: "Successfully added.",
          autoClose: 1000,
          color: "green",
        });
        navigate("/startup/dashboard");
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

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      experience: "",
      salary: "",
      applyby: "",
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
      <form onSubmit={form.onSubmit((values) => addJobs(values))}>
        <TextInput
          required
          label="Job title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          required
          autosize
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
          mt={15}
        />
        <TextInput
          required
          label="Experience"
          placeholder="Experience"
          {...form.getInputProps("experience")}
        />

        <Textarea
          required
          autosize
          label="Salary"
          placeholder="Salary"
          {...form.getInputProps("salary")}
          mt={15}
        />
        <DatePicker
          placeholder="Select date"
          label="Apply by"
          required
          {...form.getInputProps("applyby")}
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

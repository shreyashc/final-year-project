import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { apiClient } from "../api/client";
import { JobseekerDetails } from "./JobseekerDashboard";

const JobseekerEdit = () => {
  const [idt, setInvestorDetails] = useState<JobseekerDetails>();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingLogo, setUpdatingLogo] = useState(false);
  const [error, setError] = useState(false);
  const [updatingPitch, setUpdatingPitch] = useState(false);
  const fileInputRef2 = useRef<any>(null);

  const fileInputRef = useRef<any>(null);

  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<JobseekerDetails>("/seeker/dashboard/")
      .then((res) => {
        setInvestorDetails(res.data);
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

  const updateDetails = (data: any) => {
    setUpdating(true);
    apiClient
      .put("/seeker/update-details/", data)
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

  const uploadLogo = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) return;
    setUpdatingLogo(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    apiClient
      .post("/seeker/update-logo/", formData, config)
      .then((response) => {
        setInvestorDetails((p) => {
          if (p) {
            return {
              ...p,
              jobseeker: {
                ...p.jobseeker,
                pfpURL: response.data.newLogoUrl,
              },
            };
          }
        });
      })
      .finally(() => {
        setUpdatingLogo(false);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (idt) {
      const { pfpURL, id, userId, ...formValues } = idt.jobseeker;
      form.setValues(formValues);
    }
  }, [idt]);

  const uploadPitch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) return;
    setUpdatingPitch(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("pitch-pdf", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    apiClient
      .post("/seeker/update-resume/", formData, config)
      .then((response) => {
        console.log(response);
        showNotification({
          title: "Notification",
          message: "Successfully updated Resume.",
          autoClose: 1000,
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Notification",
          message: "Failed updated Resume.",
          autoClose: 1000,
          color: "red",
        });
      })
      .finally(() => {
        setUpdatingPitch(false);
      });
  };

  const form = useForm({
    initialValues: {
      displayName: "",
      about: "",
      skills: "",
      education: "",
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
      <Group mt={50} align="start" spacing="xl">
        <Group direction="column" align="center">
          <Paper shadow="md" style={{ position: "relative" }}>
            <Avatar
              src={idt?.jobseeker.pfpURL}
              size={200}
              alt="company logo"
              radius="sm"
              style={{ filter: updatingLogo ? "brightness(50%)" : "" }}
            />
            {updatingLogo && (
              <Loader
                color="yellow"
                variant="oval"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </Paper>

          <input
            className="input-file"
            type="file"
            max={1}
            accept="image/*"
            onChange={(e) => uploadLogo(e)}
            ref={fileInputRef}
          />

          <Button
            variant="outline"
            color="lime"
            size="lg"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            Change Profile Picture
          </Button>
          <input
            className="input-file"
            type="file"
            max={1}
            accept="application/pdf"
            onChange={(e) => uploadPitch(e)}
            ref={fileInputRef2}
          />
          <Button
            variant={updatingPitch ? "filled" : "subtle"}
            size="md"
            color="blue"
            onClick={() => {
              fileInputRef2.current.click();
            }}
          >
            {updatingPitch ? (
              <Loader color="white" variant="dots" />
            ) : (
              "Upload Resume"
            )}
          </Button>
        </Group>
        <Box style={{ flexGrow: 1 }}>
          <form onSubmit={form.onSubmit((values) => updateDetails(values))}>
            <TextInput
              required
              label="Display Name"
              placeholder="Your Name"
              {...form.getInputProps("displayName")}
            />
            <TextInput
              required
              label="About you"
              placeholder="About you"
              {...form.getInputProps("about")}
              mt={15}
            />
            <Textarea
              required
              autosize
              label="Your Education Details"
              placeholder="Education Details"
              {...form.getInputProps("education")}
              mt={15}
            />
            <TextInput
              required
              label="Your Skills"
              placeholder="your Skills"
              {...form.getInputProps("skills")}
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
              {updating ? (
                <Loader color="white" variant="dots" />
              ) : (
                "Update details"
              )}
            </Button>
          </form>
        </Box>
      </Group>
    </Container>
  );
};

export default JobseekerEdit;


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
import { startupDetails } from "./StartupDashboard";

const EditStrtupDetails = () => {
  const [sd, setStartupDetails] = useState<startupDetails>();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingLogo, setUpdatingLogo] = useState(false);
  const [error, setError] = useState(false);
  const fileInputRef = useRef<any>(null);

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

  const updateDetails = (data: any) => {
    setUpdating(true);
    apiClient
      .put("/startup/update-details/", data)
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
      .post("/startup/update-logo/", formData, config)
      .then((response) => {
        setStartupDetails((p) => {
          if (p) {
            return {
              ...p,
              startup: {
                ...p.startup,
                logoURL: response.data.newLogoUrl,
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
    if (sd) {
      const { logoURL, id, userId, ...formValues } = sd.startup;
      form.setValues(formValues);
    }
  }, [sd]);

  const form = useForm({
    initialValues: {
      displayName: "",
      contactEmail: "",
      shortDesc: "",
      website: "",
      amountRaised: "",
      ytURL: "",
      revenue: 0,
      profit: 0,
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
              src={sd?.startup.logoURL}
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
            Change logo
          </Button>
        </Group>
        <Box style={{ flexGrow: 1 }}>
          <form onSubmit={form.onSubmit((values) => updateDetails(values))}>
            <TextInput
              required
              label="Comapny Name"
              placeholder="Your Comapny Name"
              {...form.getInputProps("displayName")}
            />
            <TextInput
              required
              label="Contact Email"
              placeholder="Contact Email"
              {...form.getInputProps("contactEmail")}
              mt={15}
            />
            <Textarea
              required
              autosize
              label="Description"
              placeholder="Description"
              {...form.getInputProps("shortDesc")}
              mt={15}
            />
            <TextInput
              required
              label="Website URL"
              placeholder="Website URL"
              {...form.getInputProps("website")}
              mt={15}
            />
            <TextInput
              required
              label="Youtube video URL"
              placeholder="Youtube video URL"
              {...form.getInputProps("ytURL")}
              mt={15}
            />
            <TextInput
              required
              label="Amount Raised"
              placeholder="Amount Raised"
              {...form.getInputProps("amountRaised")}
              mt={15}
            />
            <TextInput
              required
              label="Revenue"
              placeholder="Revenue"
              {...form.getInputProps("revenue")}
              mt={15}
            />
            <TextInput
              required
              label="Profit"
              placeholder="Profit"
              {...form.getInputProps("profit")}
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

export default EditStrtupDetails;

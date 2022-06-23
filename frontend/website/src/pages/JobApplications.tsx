import {
  Accordion,
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Text,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";

const JobApplications = () => {
  const [appls, setAppls] = useState<aT[]>([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [error, setError] = useState(false);

  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<aT[]>("/startup/appls/")
      .then((res) => {
        console.log(res.data);
        setAppls(res.data);
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
  useEffect(() => {
    getDetails();
  }, []);
  if (loading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="dark" size="xl" />
      </Center>
    );
  if (error) return <div>Error (see console)</div>;
  return (
    <Container size="md">
      <Center mt={20}>
        <Text size="lg" weight={800} style={{ fontSize: "30px" }}>
          Job Applications
        </Text>
      </Center>
      <Accordion iconPosition="right" multiple>
        {appls.map((itm) => (
          <Accordion.Item
            label={`${itm.displayName} - ${itm.title}`}
            key={itm.id}
            my={10}
          >
            <Paper>
              <Text size="xl" weight={600}>
                Name:
              </Text>
              <Anchor
                to={`/jobseeker/${itm.appluserid}`}
                size="xl"
                component={Link}
              >
                {itm.displayName}
              </Anchor>
              <Text size="xl" weight={600}>
                Skills:
              </Text>
              <Text size="lg">{itm.skills}</Text>
            </Paper>
            <Group position="right">
              <Button
                variant="subtle"
                color="grape"
                onClick={() => {
                  nav("/jobseeker/" + itm.appluserid);
                }}
              >
                View Profile
              </Button>
            </Group>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default JobApplications;

interface aT {
  id: number;
  appluserid: number;
  sid: number;
  createdAt: Date;
  title: string;
  displayName: string;
  about: string;
  education: string;
  skills: string;
  pfpURL: string;
  userId: number;
  resumePdfURL: string;
}


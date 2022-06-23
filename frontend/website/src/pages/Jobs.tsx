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
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobT[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const applyJob = (sid: any, title: string, name: string) => {
    apiClient
      .post("/seeker/apply-job/", {
        sid,
        title,
      })
      .then(() => {
        showNotification({
          title: "Successfully Applied",
          message: `${name} will get back to you soon.`,
          autoClose: 2000,
          color: "green",
        });
      })
      .catch(() => {
        showNotification({
          title: "Something went wrong",
          message: `please try again later.`,
          autoClose: 1000,
          color: "red",
        });
      });
  };

  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<JobT[]>("/seeker/jobs/")
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
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
    <>
      <Container size="md">
        <Center mt={20}>
          <Text size="lg" weight={800} style={{ fontSize: "30px" }}>
            Latest Jobs
          </Text>
        </Center>
        <Accordion iconPosition="right" multiple>
          {jobs.map((itm) => (
            <Accordion.Item label={itm.title} key={itm.id} my={10}>
              <Paper>
                <Anchor to={`/startups/${itm.sid}`} size="xl" component={Link}>
                  {itm.displayName}
                </Anchor>
                <Text size="lg" weight={600}>
                  Description:
                </Text>
                <Text>{itm.description}</Text>
                <Text size="lg" weight={600} mt={15}>
                  Experience:
                </Text>
                <Text>{itm.experience}</Text>
                <Text size="lg" weight={600} mt={15}>
                  Salary:
                </Text>
                <Text>{itm.salary}</Text>
                <Text weight={600} mt={15}>
                  Apply before:
                </Text>
                <Text>{moment(itm.applyby).format("MMM Do YY")}</Text>
              </Paper>
              <Group position="right">
                <Button
                  variant="subtle"
                  color="grape"
                  onClick={() => {
                    applyJob(itm.sid, itm.title, itm.displayName);
                  }}
                >
                  Apply Now
                </Button>
              </Group>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </>
  );
};

export default Jobs;

interface JobT {
  id: number;
  description: string;
  title: string;
  experience: string;
  salary: string;
  applyby: Date;
  userid: number;
  createdAt: Date;
  updatedAt: Date;
  sid: number;
  displayName: string;
  suserid: number;
}


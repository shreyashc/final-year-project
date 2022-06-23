import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Group,
  List,
  Loader,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleDashed } from "tabler-icons-react";
import { apiClient } from "../api/client";

const SeekerProfile = () => {
  const [idt, setInvestorDetails] = useState<JobseekerDetails>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<JobseekerDetails>("/seeker/details/" + id)
      .then((res) => {
        console.log(res);

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
    <Container size="md" mt={20}>
      <div>
        <Group style={{ justifyContent: "space-between" }} align="flex-start">
          <Group spacing="md" align="flex-start">
            <Avatar
              size={150}
              src={idt?.jobseeker.pfpURL}
              radius="md"
              alt="logo"
            />
            <div>
              <Text style={{ fontSize: "50px" }} weight={900}>
                {idt?.jobseeker.displayName}
              </Text>
              <Text size="md" mb={25}>
                <a href={`mailto:${idt?.email}`}>{idt?.email}</a>
              </Text>
              {idt?.jobseeker.resumePdfURL && (
                <Button variant="light" size="md" color="orange">
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={idt.jobseeker.resumePdfURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                </Button>
              )}
            </div>
          </Group>
        </Group>
      </div>
      <SimpleGrid
        mt={15}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
        spacing={30}
      >
        <Group align="flex-start">
          <Text size="xl" weight={700}>
            About Me
          </Text>
          <Text>{idt?.jobseeker.about}</Text>
        </Group>
        <Box>
          <Text size="xl" weight={700} color="orange" mb={20}>
            My Skills
          </Text>
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <CircleDashed size={16} />
              </ThemeIcon>
            }
          >
            {idt?.jobseeker.skills &&
              idt?.jobseeker.skills
                .split(",")
                .map((itm, idx) => <List.Item key={idx}>{itm}</List.Item>)}
          </List>
        </Box>
      </SimpleGrid>
      <Text size="xl" weight={700} mt={25}>
        My Education Details
      </Text>
      <Text>{idt?.jobseeker.education}</Text>
    </Container>
  );
};

export default SeekerProfile;

export interface Jobseeker {
  id: number;
  displayName: string;
  about: string;
  education: string;
  skills: string;
  pfpURL: string;
  resumePdfURL: string;
  userId: number;
}

export interface JobseekerDetails {
  id: number;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  jobseeker: Jobseeker;
}


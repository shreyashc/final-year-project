import {
  Anchor,
  Avatar,
  Button,
  Center,
  Container,
  Group,
  Loader,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "tabler-icons-react";
import { apiClient } from "../api/client";
import StatsGrid from "../components/StatsGrid";

const StartupDashboard = () => {
  const [sd, setStartupDetails] = useState<startupDetails>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const nav = useNavigate();

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
        <Group style={{ justifyContent: "space-between" }}>
          <Group spacing="md">
            <Avatar src={sd?.startup.logoURL} radius="xl" alt="logo" />
            <Text style={{ fontSize: "50px" }} weight={900}>
              {sd?.startup.displayName}
            </Text>
          </Group>
          <Button
            variant="subtle"
            size="xl"
            onClick={() => {
              nav("/startup/edit-details");
            }}
          >
            Edit info
          </Button>
        </Group>
        <Text size="md">
          <Anchor href={sd?.startup.website} target="_blank">
            {sd?.startup.website} <ExternalLink size={15} />
          </Anchor>
        </Text>
        <Text size="md" mb={25}>
          <a href={`mailto:${sd?.startup.contactEmail}`}>
            {sd?.startup.contactEmail}
          </a>
        </Text>
      </div>
      <SimpleGrid
        mt={15}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Group align="flex-start">
          <Text>{sd?.startup.shortDesc}</Text>
        </Group>
        <Group>
          <iframe
            style={{ minHeight: "258px", width: "100%" }}
            src={
              sd &&
              sd?.startup?.ytURL &&
              `https://www.youtube.com/embed/${sd?.startup?.ytURL.slice(
                sd?.startup.ytURL.length - 11
              )}`
            }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </Group>
      </SimpleGrid>
      <StatsGrid
        data={stats}
        revenue={sd?.startup.revenue}
        profit={sd?.startup.profit}
        amountRaised={sd?.startup.amountRaised}
      />
    </Container>
  );
};

export default StartupDashboard;

export interface startupDetails {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  startup: Startup;
}

export interface Startup {
  id: number;
  displayName: string;
  website: string;
  userId: number;
  contactEmail: string;
  shortDesc: string;
  amountRaised: string;
  ytURL: string;
  logoURL: string;
  revenue: number;
  profit: number;
}

const stats = [
  {
    title: "Revenue",
    value: "$13,456",
    diff: 34,
  },
  {
    title: "Profit",
    value: "$4,145",
    diff: -13,
  },
  {
    title: "Amount Raised",
    value: "745",
    diff: 18,
  },
];

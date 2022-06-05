import {
  Accordion,
  Anchor,
  Avatar,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Tabs,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { useNavigate } from "react-router-dom";
import {
  Edit,
  ExternalLink,
  PresentationAnalytics,
  Building,
  InfoCircle,
} from "tabler-icons-react";
import { apiClient } from "../api/client";

import StatsGrid from "../components/StatsGrid";

const StartupDashboard = () => {
  const [sd, setStartupDetails] = useState<startupDetails>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
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
            <Edit />
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
      <Tabs color="cyan" tabPadding="xl">
        <Tabs.Tab
          label="Pitch"
          mr={15}
          icon={<PresentationAnalytics size={35} />}
        >
          <div className="pdf-wrap">
            <ScrollArea style={{ height: "80vh" }}>
              <Document
                file={sd?.startup.pithPdfURL}
                onLoadError={console.error}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {[...Array(numPages)].map((e, i) => {
                  return <Page pageNumber={i + 1} key={i} />;
                })}
              </Document>
            </ScrollArea>
          </div>
        </Tabs.Tab>
        <Tabs.Tab label="People" mr={15} icon={<Building size={35} />}>
          <SimpleGrid
            mt={15}
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 2 },
            ]}
          >
            <Paper style={{ cursor: "pointer" }} shadow="lg" m={20} p="lg">
              <Text size="xl" weight={700}>
                {sd?.startup.p1}
              </Text>
              <Text my={10}>Role</Text>
              <Text>{sd?.startup.b1}</Text>
            </Paper>
            <Paper style={{ cursor: "pointer" }} shadow="lg" m={20} p="lg">
              <Text size="xl" weight={700}>
                {sd?.startup.p2}
              </Text>
              <Text my={10}>Role</Text>
              <Text>{sd?.startup.b2}</Text>
            </Paper>
            <Paper style={{ cursor: "pointer" }} shadow="lg" m={20} p="lg">
              <Text size="xl" weight={700}>
                {sd?.startup.p3}
              </Text>
              <Text my={10}>Role</Text>
              <Text>{sd?.startup.b3}</Text>
            </Paper>
          </SimpleGrid>
        </Tabs.Tab>
        <Tabs.Tab label="Highlights" mr={15} icon={<InfoCircle size={35} />}>
          <Accordion iconPosition="right">
            <Accordion.Item label={sd?.startup.h1}>
              {sd?.startup.d1}
            </Accordion.Item>

            <Accordion.Item label={sd?.startup.h2}>
              {sd?.startup.d2}
            </Accordion.Item>

            <Accordion.Item label={sd?.startup.h3}>
              {sd?.startup.d3}
            </Accordion.Item>
          </Accordion>
        </Tabs.Tab>
      </Tabs>
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
  pithPdfURL: string;
  revenue: number;
  profit: number;
  p1: string;
  b1: string;
  p2: string;
  b2: string;
  p3: string;
  b3: string;
  h1: string;
  d1: string;
  h2: string;
  d2: string;
  h3: string;
  d3: string;
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

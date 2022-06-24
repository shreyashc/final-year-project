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
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Edit,
  ExternalLink,
  PresentationAnalytics,
  Building,
  InfoCircle,
  MessageDots,
  Briefcase,
} from "tabler-icons-react";
import { apiClient } from "../api/client";

import StatsGrid from "../components/StatsGrid";
import { AuthContext } from "../context/authContext";

const StartupDashboard = () => {
  const { id } = useParams();
  const { state: authState } = useContext(AuthContext);
  const isVisitor = id;
  const path = id ? `startups/${id}` : "startup/dashboard/";
  const [sd, setStartupDetails] = useState<startupDetails>();

  const [jobs, setJobs] = useState<Job[]>([]);
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
    if (isVisitor) {
      apiClient
        .get<Startup>(path)
        .then((res) => {
          setStartupDetails({
            email: "",
            role: "",
            createdAt: "",
            id: "0",
            updatedAt: "",
            startup: { ...res.data },
          });

          setError(false);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(sd);
    } else {
      apiClient
        .get<startupDetails>(path)
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
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  const getJobs = () => {
    apiClient
      .get<Job[]>("/jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJobs();
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
          {authState.role === "startup" && authState.userId === sd?.id && (
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
          )}
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
          <div>
            {authState.role === "investor" && (
              <Button
                color="green"
                size="md"
                variant="light"
                uppercase
                onClick={() => {
                  nav(
                    `/private-chat/${authState.userId}i${sd?.startup.userId}s`,
                    {
                      state: { otherPerson: sd?.startup.displayName },
                    }
                  );
                }}
              >
                <MessageDots style={{ marginRight: 5 }} />
                chat
              </Button>
            )}
          </div>
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
              <Text my={10}>{sd?.startup.r1}</Text>
              <Text>{sd?.startup.b1}</Text>
            </Paper>
            <Paper style={{ cursor: "pointer" }} shadow="lg" m={20} p="lg">
              <Text size="xl" weight={700}>
                {sd?.startup.p2}
              </Text>
              <Text my={10}>{sd?.startup.r2}</Text>
              <Text>{sd?.startup.b2}</Text>
            </Paper>
            <Paper style={{ cursor: "pointer" }} shadow="lg" m={20} p="lg">
              <Text size="xl" weight={700}>
                {sd?.startup.p3}
              </Text>
              <Text my={10}>{sd?.startup.r3}</Text>
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
        <Tabs.Tab label="Jobs" mr={15} icon={<Briefcase size={35} />}>
          <Accordion iconPosition="right">
            {jobs.map((job) => (
              <Accordion.Item label={job.title} key={job.id}>
                <Paper>
                  <Text weight={600}>Description:</Text>
                  <Text>{job.description}</Text>
                  <Text weight={600} mt={15}>
                    Experience:
                  </Text>
                  <Text>{job.experience}</Text>
                  <Text weight={600} mt={15}>
                    Salary:
                  </Text>

                  <Text>{job.salary}</Text>
                  <Text weight={600} mt={15}>
                    Apply before:
                  </Text>

                  <Text>{moment(job.applyby).format("MMM Do YY")}</Text>
                </Paper>
              </Accordion.Item>
            ))}
          </Accordion>
          {authState.role === "startup" && authState.userId === sd?.id && (
            <Center>
              <Button variant="subtle" fullWidth mt={20}>
                <Anchor component={Link} to="/AddJobs">
                  Add new job
                </Anchor>
              </Button>
            </Center>
          )}
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
};

export default StartupDashboard;

export interface startupDetails {
  id: string;
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
  r1: string;
  p2: string;
  b2: string;
  r2: string;
  p3: string;
  b3: string;
  r3: string;
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

interface Job {
  id: number;
  description: string;
  title: string;
  experience: string;
  salary: string;
  applyby: Date;
  userid: number;
  createdAt: Date;
  updatedAt: Date;
}

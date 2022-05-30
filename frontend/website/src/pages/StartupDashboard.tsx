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
import { FaqWithBg } from "../components/FaqWithBg";
import StatsGrid from "../components/StatsGrid";

const StartupDashboard = () => {
  const [sd, setStartupDetails] = useState<startupDetails>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
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
        <Tabs.Tab label="Pitch" icon={<PresentationAnalytics size={14} />}>
          <Document
            file="https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2FAICTE%20activity%203.pdf?alt=media&token=aaa15952-d1ab-4fd7-a002-8d9fdf0284f6"
            onLoadError={console.error}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Tabs.Tab>
        <Tabs.Tab label="People" icon={<Building size={14} />}>
          <SimpleGrid
            mt={15}
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 2 },
            ]}
          >
            <Paper shadow="md" m={20} p="md">
              <Text size="xl" weight={700}>
                Name
              </Text>
              <Text>Role</Text>
              <Anchor>linkedin url</Anchor>
              <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                optio veniam amet vitae dolore sequi eaque a incidunt
                consequatur repellendus ullam magnam ab aliquam hic, inventore
                aspernatur. Dolore, magnam animi.
              </Text>
            </Paper>
            <Paper shadow="md" m={20} p="md">
              <Text size="xl" weight={700}>
                Name
              </Text>
              <Text>Role</Text>
              <Anchor>linkedin url</Anchor>
              <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                optio veniam amet vitae dolore sequi eaque a incidunt
                consequatur repellendus ullam magnam ab aliquam hic, inventore
                aspernatur. Dolore, magnam animi.
              </Text>
            </Paper>
            <Paper shadow="md" m={20} p="md">
              <Text size="xl" weight={700}>
                Name
              </Text>
              <Text>Role</Text>
              <Anchor>linkedin url</Anchor>
              <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                optio veniam amet vitae dolore sequi eaque a incidunt
                consequatur repellendus ullam magnam ab aliquam hic, inventore
                aspernatur. Dolore, magnam animi.
              </Text>
            </Paper>
          </SimpleGrid>
        </Tabs.Tab>
        <Tabs.Tab label="FAQs" icon={<InfoCircle size={14} />}>
          <Accordion iconPosition="right">
            <Accordion.Item label="Customization">
              Colors, fonts, shadows and many other parts are customizable to
              fit your design needs
            </Accordion.Item>

            <Accordion.Item label="Flexibility">
              Configure components appearance and behavior with vast amount of
              settings or overwrite any part of component styles
            </Accordion.Item>

            <Accordion.Item label="No annoying focus ring">
              With new :focus-visible pseudo-class focus ring appears only when
              user navigates with keyboard
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

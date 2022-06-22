import {
  Badge,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Image,
  Loader,
  Menu,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CircleMinus } from "tabler-icons-react";
import { apiClient } from "../api/client";
import { InvestorsT } from "./Investors";
import { StartupT } from "./Startups";
const ManageInvestors = () => {
  const [startups, setStartups] = useState<InvestorsT[]>([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get<InvestorsT[]>("investor")
      .then((res) => {
        setStartups(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

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
    <Container size="md" mt={25}>
      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {startups.map((itm) => (
          <StartupItem {...itm} key={itm.id} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ManageInvestors;

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    boxShadow: "rgb(0 0 0 / 10%) 0px 0px 15px 0px",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

const StartupItem: FC<InvestorsT> = ({
  displayName,
  contactEmail: website,
  userId: id,
  pfpURL: logoURL,
  iType,
}: StartupItemProps) => {
  const nav = useNavigate();
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      p="lg"
      radius="md"
      className={classes.card}
      style={{ cursor: "pointer" }}
    >
      <Card.Section mb="sm" onClick={() => nav("/investors/" + id)}>
        <Image src={logoURL} alt={displayName} height={180} />
      </Card.Section>

      <Text size="xl" weight={700} className={classes.title} mt="xs">
        {displayName}
      </Text>
      <Text size="xs" color="dimmed">
        {website}
      </Text>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {iType}
          </Text>
          <Menu>
            <Menu.Label>Controls</Menu.Label>
            <Menu.Item
              icon={<Check size={14} />}
              onClick={() => {
                approve(id);
              }}
            >
              Approve
            </Menu.Item>
            <Menu.Item
              icon={<CircleMinus size={14} />}
              onClick={() => {
                revokeApproval(id);
              }}
            >
              Revoke Approval
            </Menu.Item>
          </Menu>
        </Group>
      </Card.Section>
    </Card>
  );
};

interface StartupItemProps {
  id: number;
  displayName: string;
  contactEmail: string;
  shortDesc: string;
  iType: string;
  investedIn: string;
  pfpURL: string;
  userId: number;
}

const approve = (id: any) => {
  apiClient
    .post("/admin/approve-investor/", {
      userid: id,
    })
    .then(() => {
      showNotification({
        title: "Approved",
        message: "Approal successful",
        autoClose: 2000,
        color: "green",
      });
    })
    .catch(() => {
      showNotification({
        title: "Approval failed",
        message: "Something went wrong",
        autoClose: 2000,
        color: "red",
      });
    });
};

const revokeApproval = (id: any) => {
  apiClient
    .post("/admin/revoke-approve-investor/", {
      userid: id,
    })
    .then(() => {
      showNotification({
        title: "Approval Revoked",
        message: "Approal Revoked successfully",
        autoClose: 2000,
        color: "green",
      });
    })
    .catch(() => {
      showNotification({
        title: "Approval revocation failed",
        message: "Something went wrong",
        autoClose: 2000,
        color: "red",
      });
    });
};


import {
  ActionIcon,
  Badge,
  Card,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FC, useState } from "react";
import { ThumbUp } from "tabler-icons-react";
import { apiClient } from "../api/client";

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

interface StartupItemProps {
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
  revenue: string;
  profit: string;
  upvalue: number;
  upvoted: boolean;
  up: (sid: number) => void;
  upRemove: (sid: number) => void;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const StartupItem: FC<StartupItemProps> = ({
  displayName,
  website,
  id,
  amountRaised,
  upvoted,
  logoURL,
  upvalue,
  up,
  upRemove,
  onClick,
}: StartupItemProps) => {
  const { classes, theme } = useStyles();
  const [upvoting, setUpvoting] = useState(false);
  const upvote = (startupid: any, upvoted: boolean) => {
    setUpvoting(true);
    apiClient
      .post("upvote/" + startupid)
      .then(() => {
        if (upvoted) {
          showNotification({
            title: "Notification",
            message: "Upvote Removed",
            autoClose: 1000,
            color: "red",
          });
          return;
        }
        showNotification({
          title: "Notification",
          message: "Upvoted",
          autoClose: 1000,
          color: "green",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setUpvoting(false));
  };
  return (
    <Card
      onClick={onClick}
      withBorder
      p="lg"
      radius="md"
      className={classes.card}
      style={{ cursor: "pointer" }}
    >
      <Card.Section mb="sm">
        <Image src={logoURL} alt={displayName} height={180} />
      </Card.Section>

      <Text size="xl" weight={700} className={classes.title} mt="xs">
        {displayName}
      </Text>
      <Text size="xs" color="dimmed">
        {website}
      </Text>
      <Badge color="dark" radius="lg" variant="outline" mt="xs">
        {amountRaised ? amountRaised : "NA"}
      </Badge>
      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {upvalue} {" Upvotes"}
          </Text>
          <Group spacing={0}>
            <ActionIcon disabled={upvoting}>
              <ThumbUp
                size={28}
                color={theme.colors.orange[7]}
                fill={upvoted ? "rgb(255 186 140)" : "none"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (upvoted) {
                    upRemove(id);
                  } else {
                    up(id);
                  }
                  upvote(id, upvoted);
                }}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};
export default StartupItem;


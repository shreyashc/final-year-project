import { Avatar, Button, createStyles, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { At, Location, MessageDots, UserPlus } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  displayName: string;
  contactEmail: string;
  shortDesc: string;
  iType: string;
  investedIn: string;
  pfpURL: string;
  userId: number;
  startupUserId: string;
}

export default function InvestorItem({
  displayName,
  contactEmail,
  startupUserId,
  iType,
  investedIn,
  pfpURL,
  userId,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  const nav = useNavigate();
  return (
    <div>
      <Group noWrap my={40} align="stretch">
        <Avatar src={pfpURL} size={175} radius="md" />
        <Group direction="column" style={{ gap: "5px" }}>
          <Text
            size="md"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {iType}
          </Text>

          <Text size="xl" weight={500} className={classes.name}>
            {displayName}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <At size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {contactEmail}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <Location size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {investedIn}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt="auto">
            <Button
              color="green"
              size="md"
              variant="light"
              uppercase
              onClick={() => {
                nav(`/private-chat/${userId}i${startupUserId}s`, {
                  state: { otherPerson: displayName },
                });
              }}
            >
              <MessageDots style={{ marginRight: 5 }} />
              chat
            </Button>
            <Button color="gray" size="md" variant="light" uppercase>
              <UserPlus style={{ marginRight: 5 }} />
              Save
            </Button>
          </Group>
        </Group>
      </Group>
    </div>
  );
}


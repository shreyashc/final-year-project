import { Avatar, Button, createStyles, Group, Text } from "@mantine/core";

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
  avatar: string;
  name: string;
  title: string;
  location: string;
  email: string;
}

export default function InvestorItem({
  avatar,
  name,
  title,
  location,
  email,
}: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap my={40} align="stretch">
        <Avatar src={avatar} size={175} radius="md" />
        <Group direction="column" style={{ gap: "5px" }}>
          <Text
            size="md"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {title}
          </Text>

          <Text size="xl" weight={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <At size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <Location size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {location}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt="auto">
            <Button color="green" size="md" variant="light" uppercase>
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

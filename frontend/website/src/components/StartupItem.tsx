import React from "react";
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
} from "@mantine/core";
import { Heart, Bookmark, Share } from "tabler-icons-react";

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
  image: string;
  category: string;
  title: string;
  footer: string;
  location: string;
}

export default function StartupItem({
  image,
  category,
  title,
  footer,
  location,
}: StartupItemProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Text size="xl" weight={700} className={classes.title} mt="xs">
        {title}
      </Text>
      <Text size="xs" color="dimmed">
        {location}
      </Text>
      <Badge color="dark" radius="lg" variant="outline" mt="xs">
        {category}
      </Badge>
      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {footer}
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <Heart size={18} color={theme.colors.red[7]} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

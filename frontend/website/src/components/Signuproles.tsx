import React from "react";
import { Eye, MessageCircle } from "tabler-icons-react";
import { Card, Text, Group, Center, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef("image");

  return {
    card: {
      position: "relative",
      height: 280,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: "scale(1.03)",
      },
    },

    image: {
      ref: image,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
      transition: "transform 500ms ease",
    },

    overlay: {
      position: "absolute",
      top: "20%",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
    },

    content: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

interface ImageCardProps {
  link: string;
  image: string;
  title: string;
  description: string;
}

export default function Signuproles({
  image,
  title,
  description,
  link,
}: ImageCardProps) {
  const { classes, theme } = useStyles();

  return (
    <Card
      p="md"
      shadow="lg"
      className={classes.card}
      radius="md"
      component={Link}
      to={link}
    >
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Center>
            <Text size="lg" className={classes.title} weight={500}>
              {title}
            </Text>
          </Center>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author}>
              {description}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}


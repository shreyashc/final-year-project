import {
  Anchor,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Image,
  List,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { url } from "inspector";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AccessPoint,
  Certificate,
  Check,
  Coin,
  Icon,
  Messages,
  Truck,
  User,
  UserCheck,
  Users,
} from "tabler-icons-react";
import { AuthContext } from "../context/authContext";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    // background: "url(homebg.webp)",
  },

  content2: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  feature2: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay2: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content3: {
    position: "relative",
    zIndex: 2,
  },

  icon2: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  title2: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  title3: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    alignSelf: "center",
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  title1: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const Home = () => {
  const nav = useNavigate();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { classes } = useStyles();
  return (
    <>
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>platform</span>for
                StartUps <br />
                and budding Entrepreneurs
              </Title>
              {/* <Text color="dimmed" mt="md">
                One stop platform for StartUps, Investors and Job Seekers. 
              </Text> */}

              <List
                mt={60}
                spacing="sm"
                size="lg"
                icon={
                  <ThemeIcon size={40} radius="xl">
                    <Check size={24} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>StartUps</b> – Easily find Investors and pitch your ideas.
                  Take guidance from Experts in one click. Find required human
                  resources.
                </List.Item>
                <List.Item>
                  <b>Investors</b> – One place to find and invest into India's
                  leading Startups.
                </List.Item>
                <List.Item>
                  <b>Job Seekers</b> – Easily find and apply for jobs in
                  Startups.
                </List.Item>
                <List.Item>
                  <b>Visitors</b> – Have a look into StartUps and get inspired
                  free of cost.
                </List.Item>
              </List>

              <Group mt={30}>
                <Button
                  radius="xl"
                  size="md"
                  className={classes.control}
                  component={Link}
                  to="/signup"
                >
                  Get started
                </Button>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  <Anchor component={Link} to="/startups">
                    View Startups
                  </Anchor>
                </Button>
              </Group>
            </div>
            <Image
              width={450}
              height={200}
              src="/StartEzy.png"
              className={classes.image}
            />
          </div>
          <Center>
            {" "}
            <Title className={classes.title3}>For StartUps</Title>
          </Center>
          <FeaturesAsymmetrical mockdata={startupdata} />

          <Center>
            <Title mt={30} className={classes.title3}>
              For Investors
            </Title>
          </Center>
          <FeaturesAsymmetrical mockdata={investordata} />
        </Container>
      </div>
      <div>
        <div>
          <Center>
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/startups">
                All Startups
              </Anchor>
            </Button>
            <br />
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/investors">
                All Investors
              </Anchor>
            </Button>
            <br />
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/investor/my-chats">
                My chats
              </Anchor>
            </Button>
            <br />
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/news/1">
                Startup News
              </Anchor>
            </Button>
            <br />
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/Schemes">
                Schemes
              </Anchor>
            </Button>
            <br />
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/discussion-rooms">
                Discussion Rooms
              </Anchor>
            </Button>
          </Center>
        </div>
      </div>
    </>
  );
};

export default Home;

interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.FC<React.ComponentProps<typeof Truck>>;
  title: string;
  description: string;
}

function Feature({
  icon: Icon,
  title,
  description,
  className,
  ...others
}: FeatureProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature2, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content3}>
        <Icon size={38} className={classes.icon} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title2}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}
interface mockdata {
  icon: Icon;
  title: string;
  description: string;
}

const startupdata = [
  {
    icon: AccessPoint,
    title: "Get Worldwide Exposure",
    description:
      "As our investors are present all over the world, connect to them in one touch.",
  },
  {
    icon: Messages,
    title: "Proper Mentorship",
    description:
      "One-to-one communication with investors and mentors to get guidance.",
  },
  {
    icon: Users,
    title: "Hire Human Resources",
    description: "You can easily find required  resources for your Startups.",
  },
];

const investordata = [
  {
    icon: Coin,
    title: "Find and Invest Easily",
    description:
      "You can find most of the Startups worldwide and invest easily.",
  },
  {
    icon: Messages,
    title: "Contact with Startups",
    description:
      "Can contact with Startups to help them improve their performance.",
  },
  {
    icon: UserCheck,
    title: "Easy to use",
    description:
      "User friendly interface will allow you to get access to your required features instantly.",
  },
];

function FeaturesAsymmetrical({ mockdata }: { mockdata: mockdata[] }) {
  const items = mockdata.map((item, i) => <Feature {...item} key={i} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}

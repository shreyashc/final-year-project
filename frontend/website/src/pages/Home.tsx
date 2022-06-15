import { Anchor, Center, Col, Grid, SimpleGrid } from "@mantine/core";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Truck, Certificate, Coin, Icon } from 'tabler-icons-react';
import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import { Check, CircleDotted, FileCode, Flame, ReceiptOff } from 'tabler-icons-react';
import image from './image.svg';

const useStyles = createStyles((theme) => ({

  feature: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: 'absolute',
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  icon: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content2: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  feature2: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay2: {
    position: 'absolute',
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
    zIndex: 1,
  },

  content3: {
    position: 'relative',
    zIndex: 2,
  },

  icon2: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  title2: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  title3: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
  
    flex: 1,
    alignSelf: 'center',
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
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
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },


}));


const Home = () => {
  const nav = useNavigate();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { classes } = useStyles();
  return (
   
    <><div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>platform </span>for StartUps <br />and budding Entrepreneurs
            </Title>
            <Text color="dimmed" mt="md">
              Build fully functional accessible web applications faster than ever – Mantine includes
              more than 120 customizable components and hooks to cover you in any situation
            </Text>

            <List
              mt={60}
              spacing="sm"
              size="lg"
              icon={<ThemeIcon size={40} radius="xl">
                <Check size={24} />
              </ThemeIcon>}
            >
              <List.Item>
                <b>StartUps</b> – Easily find Investors and pitch your ideas infront of them. Take guidance from Experts in one click
              </List.Item>
              <List.Item>
                <b>Investors</b> – One place to find and invest into India's leading Startups.
              </List.Item>
              <List.Item>
                <b>Visitors</b> – Have a look into StartUps and get inspired free of cost.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control} component={Link} to="/signup">
                Get started
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
              <Anchor component={Link} to="/startups">
                All Startups
              </Anchor>
              </Button>
            </Group>
          </div>
          <Image width={450}
        height={200} src="/StartEzy.png" className={classes.image}  />
        </div>
        <Center>        <Title className={classes.title3}>For StartUps</Title>
</Center>
        <FeaturesAsymmetrical mockdata={startupdata} />
        
        <Center>
        <Title mt={30} className={classes.title3}>For Investors</Title>
</Center>
        <FeaturesAsymmetrical mockdata={ investordata}/>

      </Container>
    </div><div>
        <div>
          {/* <p>Email:{authState.email}</p>
    <p>Role:{authState.role}</p>
    <p>token:{authState.token.substring(0, 20)}......</p>
    <p>isLoggedIn:{authState.isLoggedIn ? "YES" : "No"}</p>
    <button onClick={makeRequest}>makeRequest</button> */}
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
                Investors chats
              </Anchor>
            </Button>
            <br />
            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="/news/1">
                Startup News
              </Anchor>
            </Button>

            <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
              <Anchor component={Link} to="">
              </Anchor>
            </Button>
          </Center>
        </div>
      </div></>
  );
};

export default Home;

const features = [
  {
    icon: ReceiptOff,
    title: 'A new way of Pitch',
    description: 'Let your personal & professional network, partners and users be a part of your mission. Raise capital from your biggest flagbearers.',
  },
  {
    icon: FileCode,
    title: 'Close your deals',
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: CircleDotted,
    title: 'No annoying focus ring',
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: Flame,
    title: 'Flexible',
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];

 function FeaturesTitle() {
  const { classes } = useStyles();

  
}
const items = features.map((feature) => (
  <div key={feature.title}>
    <ThemeIcon
      size={44}
      radius="md"
      variant="gradient"
      gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
    >
      <feature.icon size={26} />
    </ThemeIcon>
    <Text size="lg" mt="sm" weight={500}>
      {feature.title}
    </Text>
    <Text color="dimmed" size="sm">
      {feature.description}
    </Text>
  </div>
));



interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<React.ComponentProps<typeof Truck>>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
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
    icon: Truck,
    title: 'startupdata',
    description:
      'As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.',
  },
  {
    icon: Certificate,
    title: 'startupdata',
    description:
      'Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.',
  },
  {
    icon: Coin,
    title: 'startupdata',
    description:
      'Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.',
  },
];

const investordata = [
  {
    icon: Truck,
    title: 'Free Worldwide shipping',
    description:
      'As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity.',
  },
  {
    icon: Certificate,
    title: 'Best Quality Product',
    description:
      'Slakoth’s heart beats just once a minute. Whatever happens, it is content to loaf around motionless.',
  },
  {
    icon: Coin,
    title: 'Very Affordable Pricing',
    description:
      'Thought to have gone extinct, Relicanth was given a name that is a variation of the name of the person who discovered.',
  },
];

 function FeaturesAsymmetrical({mockdata}:{mockdata:mockdata[]}) {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
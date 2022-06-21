import { createStyles, Container, Title, Text, Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: "#11284b",
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundImage: "url(newbg.jpg)",
    // height: "100vh - 15px",
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 3,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    // height: "100vh",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.black,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,
    height: "auto",
    lineHeight: "initial !important",

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

const NewHome = () => {
  const { classes } = useStyles();
  const nav = useNavigate();
  const { state: authState } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to
              <br />
              <Text
                component="span"
                inherit
                variant="gradient"
                size="xl"
                gradient={{ from: "pink", to: "yellow" }}
              >
                StartEzy.
              </Text>
            </Title>

            <Text className={classes.description} mt={30}>
              {authState.role === "startup" &&
                "Easily find Investors and pitch your ideas. Take from Experts in one click. Find required human resources."}
              {authState.role === "investor" &&
                "One place to find and invest into India's leading Startups."}
              {authState.role === "jobseeker" &&
                "Easily find and apply for jobs in Startups."}

              {authState.role === "admin" && "You are Admin."}
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              size="md"
              mr={8}
              className={classes.control}
              mt={40}
              onClick={() => {
                nav("/dashboard");
              }}
            >
              Dashboard
            </Button>
            {authState.role === "startup" && (
              <>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/investors");
                  }}
                >
                  View Investors
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/my-chats");
                  }}
                >
                  My Messages
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/discussion-rooms");
                  }}
                >
                  Discussion Rooms
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/news/1");
                  }}
                >
                  Startup News
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/Schemes");
                  }}
                >
                  Government Schemes
                </Button>
              </>
            )}
            {authState.role === "investor" && (
              <>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/startups");
                  }}
                >
                  View Startups
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/my-chats");
                  }}
                >
                  My Messages
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/news/1");
                  }}
                >
                  Startup News
                </Button>
                <Button
                  size="md"
                  mr={8}
                  variant="subtle"
                  className={classes.control}
                  mt={40}
                  onClick={() => {
                    nav("/discussion-rooms");
                  }}
                >
                  Discussion Rooms
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewHome;


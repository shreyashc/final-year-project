import { Center, Container, Group, Text } from "@mantine/core";
import Signuproles from "../components/Signuproles";

const Signup = () => {
  return (
    <Center>
      <Container size="lg">
        <Center>
          <Text style={{ fontSize: "30px" }} weight={800} my={30}>
            {" "}
            Choose which describes you the best.
          </Text>
        </Center>
        <Group>
          <Signuproles
            link={"/signup/startup"}
            image={"/PngItem_2194036.png"}
            title={"STARTUP"}
            description={"Pitch your ideas and get in touch with investors."}
          />
          <Signuproles
            link={"/signup/investor"}
            image={"/inv.jpg"}
            title={"INVESTOR"}
            description={"See all Startups and get in contact with them."}
          />
          <Signuproles
            link={"/signup/visitor"}
            image={"/ja.jpg"}
            title={"JOB ASPIRANTS"}
            description={"See all startups and join discussion rooms."}
          />
        </Group>
      </Container>
    </Center>
  );
};

export default Signup;


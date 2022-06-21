import { Center, Container, Group } from "@mantine/core";
import Signuproles from "../components/Signuproles";

const Signup = () => {
  return (
    <Center>
      <Container size="lg" mt={40}>
        <Group>
          <Signuproles
            link={"/signup/startup"}
            image={"/PngItem_2194036.png"}
            title={"STARTUP"}
            description={"Pitch your ideas and get in touch with investors."}
          />
          <Signuproles
            link={"/signup/investor"}
            image={""}
            title={"INVESTOR"}
            description={"See all Startups and get in contact with them."}
          />
          <Signuproles
            link={"/signup/visitor"}
            image={""}
            title={"JOB ASPIRANTS"}
            description={"See all startups and join discussion rooms."}
          />
        </Group>
      </Container>
    </Center>
  );
};

export default Signup;


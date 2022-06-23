import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import Loading from "../components/Loading";

const DRooms = () => {
  const form = useForm({
    initialValues: {
      dname: "",
    },

    validate: {
      dname: (value) => (value.length > 0 ? null : "Password is Required"),
    },
  });
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drooms, setDrooms] = useState<DroomRes[]>([]);
  const nav = useNavigate();
  const getRooms = () => {
    apiClient.get<DroomRes[]>("/chat/all-drooms/").then((res) => {
      setDrooms(res.data);
      console.log(res);
    });
  };
  useEffect(() => {
    getRooms();
  }, []);

  const createRoom = async (values: any) => {
    setLoading(true);
    apiClient
      .post("/chat/create-droom", {
        roomName: values.dname,
      })
      .then(() => {
        setOpened(false);
        getRooms();
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container size="md">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a discussion room"
        transition="skew-up"
      >
        <form onSubmit={form.onSubmit((values) => createRoom(values))}>
          <TextInput
            label="Room name"
            placeholder="Room name"
            {...form.getInputProps("dname")}
          />
          <Button fullWidth mt="xl" type="submit" disabled={loading}>
            {loading ? <Loader color="white" variant="dots" /> : "Create"}
          </Button>
        </form>
      </Modal>
      <Center>
        <Text style={{ fontSize: "35px" }} weight={800}>
          {" "}
          Discussion Rooms
        </Text>
      </Center>
      <Group position="right">
        <Button variant="subtle" onClick={() => setOpened(true)}>
          Create Room +{" "}
        </Button>
      </Group>
      {!drooms.length && <Loading />}
      {drooms.map((room) => (
        <Paper
          key={room.id}
          shadow="lg"
          p="lg"
          m="md"
          onClick={() => {
            nav(`/discussion-rooms/${room.roomId}`, {
              state: {
                roomName: room.roomName,
              },
            });
          }}
        >
          <Anchor size="lg" to="" component={Link}>
            {room.roomName}
          </Anchor>
        </Paper>
      ))}
    </Container>
  );
};

export default DRooms;

interface DroomRes {
  id: number;
  roomId: string;
  roomName: string;
  createorUserId: number;
}


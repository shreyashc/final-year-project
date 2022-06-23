import { Center, Container, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

const Jobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<any>("/seeker/jobs/")
      .then((res) => {
        console.log(res.data);

        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  if (loading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="dark" size="xl" />
      </Center>
    );
  if (error) return <div>Error (see console)</div>;
  return (
    <>
      <Container size="md">
        <Center mt={20}>
          <Text size="lg" weight={800} style={{ fontSize: "30px" }}>
            Latest Jobs
          </Text>
        </Center>
      </Container>
    </>
  );
};

export default Jobs;


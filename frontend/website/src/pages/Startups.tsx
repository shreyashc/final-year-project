import { Container, SimpleGrid } from "@mantine/core";
import StartupItem from "../components/StartupItem";

const s = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2FCred_logo.png?alt=media&token=87983a13-e05e-4491-ae3b-e64083d7ebc8",
    category: "Fintech",
    title: "CRED",
    footer: "733 people liked this",
    location: "Bengaluru, Karnataka",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2FCred_logo.png?alt=media&token=87983a13-e05e-4491-ae3b-e64083d7ebc8",
    category: "Fintech",
    title: "CRED",
    footer: "733 people liked this",
    location: "Bengaluru, Karnataka",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2FCred_logo.png?alt=media&token=87983a13-e05e-4491-ae3b-e64083d7ebc8",
    category: "Fintech",
    title: "CRED",
    footer: "733 people liked this",
    location: "Bengaluru, Karnataka",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/gallery-e29e9.appspot.com/o/startezy%2FCred_logo.png?alt=media&token=87983a13-e05e-4491-ae3b-e64083d7ebc8",
    category: "Fintech",
    title: "CRED",
    footer: "733 people liked this",
    location: "Bengaluru, Karnataka",
  },
];

const Startups = () => {
  return (
    <Container size="md">
      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {s.map((itm, idx) => (
          <StartupItem {...itm} key={idx} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Startups;

import { Container } from "@mantine/core";
import InvestorItem from "../components/InvestorItem";

const i = [
  {
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    title: "Angel Investor",
    name: "Robert Glassbreaker",
    email: "robert@glassbreaker.io",
    location: "Hassan, Karnataka",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    title: "Venture capital",
    name: "Robert Glassbreaker",
    email: "robert@glassbreaker.io",
    location: "Hassan, Karnataka",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    title: "Angel Investor",
    name: "Robert Glassbreaker",
    email: "robert@glassbreaker.io",
    location: "Hassan, Karnataka",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    title: "Venture capital",
    name: "Robert Glassbreaker",
    email: "robert@glassbreaker.io",
    location: "Hassan, Karnataka",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    title: "Angel Investor",
    name: "Robert Glassbreaker",
    email: "robert@glassbreaker.io",
    location: "Hassan, Karnataka",
  },
];

const Investors = () => {
  return (
    <Container size="md">
      <div>
        {i.map((inverstor, idx) => {
          return <InvestorItem {...inverstor} key={idx} />;
        })}
      </div>
    </Container>
  );
};

export default Investors;

import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));
const d = new Date();
const today = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const News = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const { classes } = useStyles();
  const { page } = useParams();
  const nav = useNavigate();
  const ref = useRef<any>();

  const curPage: number = page ? +page : 1;
  useEffect(() => {
    setLoading(true);
    axios
      .get<NewsT>(
        `https://newsapi.org/v2/everything?q=indian%20startups&from=${today}&sortBy=popularity&apiKey=cdc46dec344149d4b3411a8a4e17bdf7&pageSize=10&page=${curPage}`
      )
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    ref.current?.scrollIntoView();
  }, [curPage]);

  if (loading) return <Loading />;

  return (
    <>
      <div ref={ref}></div>
      <Container size="md">
        <Center mt={20}>
          <Text size="lg" weight={800} style={{ fontSize: "30px" }}>
            Latest Startup News
          </Text>
        </Center>
        {news.map((itm) => (
          <Card
            withBorder
            radius="md"
            p={0}
            className={classes.card}
            my={25}
            shadow="lg"
            onClick={() => {
              window.open(itm.url, "_blank");
            }}
            key={itm.url}
            style={{ cursor: "pointer" }}
          >
            <Group noWrap spacing={0}>
              <Image src={itm.urlToImage} height={140} width={140} />
              <div className={classes.body}>
                <Text
                  transform="uppercase"
                  color="dimmed"
                  weight={700}
                  size="xs"
                >
                  {itm.source?.name}
                </Text>
                <Text className={classes.title} mt="xs" mb="md">
                  {itm.title}
                </Text>
                <Text mt="xs" mb="md" weight={200}>
                  {itm.content?.slice(0, -14)}
                </Text>
                <Group noWrap spacing="xs">
                  <Group spacing="xs" noWrap>
                    <Text size="xs">{itm.author}</Text>
                  </Group>
                  <Text size="xs" color="dimmed">
                    •
                  </Text>
                  <Text size="xs" color="dimmed">
                    {itm.publishedAt.toLocaleString()}
                  </Text>
                </Group>
              </div>
            </Group>
          </Card>
        ))}
        <Group style={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              nav(`/news/${curPage - 1}`);
            }}
            disabled={curPage === 1}
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              nav(`/news/${curPage + 1}`);
            }}
            disabled={curPage === 10}
          >
            Next
          </Button>
        </Group>
      </Container>
    </>
  );
};

export default News;

export interface Source {
  id: string;
  name: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface NewsT {
  status: string;
  totalResults: number;
  articles: Article[];
}


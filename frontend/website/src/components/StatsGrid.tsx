import React from "react";
import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface StatsGridProps {
  data: { title: string; value: string; diff: number }[];
  revenue: number | undefined;
  profit: number | undefined;
  amountRaised: string | undefined;
}

export default function StatsGrid({
  data,
  revenue,
  amountRaised,
  profit,
}: StatsGridProps) {
  const { classes } = useStyles();
  const stats = data.map((stat, idx) => {
    const DiffIcon = 1 > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text weight={700} size="xl">
              {idx === 0 ? revenue : idx === 1 ? profit : amountRaised}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: 1 > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}

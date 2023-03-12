import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Router from 'next/router';
export default function FeatureCard(props: { data: any; }) {
    const data = props.data;
    const redirectToHome = () => {
        Router.push(data.link);
    };
  return (
    <Card shadow="lg" p="md" radius="md" withBorder>
      <Card.Section >
        <Image
          src={data.image}
          height={460}
          alt="image"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.title}</Text>
        <Badge color={data.badgeColor} variant="light">
          {data.badge}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {data.description}
      </Text>

      <Button variant="light" color={data.buttonColor} fullWidth mt="md" radius="md"
      onClick={redirectToHome}
      >
        {data.button}
      </Button>
    </Card>
  );
}
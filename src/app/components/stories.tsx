"use client";
import { Story } from "@/types/story";
import {
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";

interface Props {
  stories: Story[];
  keyword: string;
}

export function StoriesGrid(props: Props) {
  const { stories, keyword } = props;
  return (
    <Container>
      <Heading size="8" mb="4">
        {keyword}
      </Heading>
      <Grid columns="3" gap="6" width="auto">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={story.url}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card style={{ height: "100%" }}>
              <Flex direction="column">
                <Heading size="4" mb="2">
                  {story.title}
                </Heading>
                <Text>Description</Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

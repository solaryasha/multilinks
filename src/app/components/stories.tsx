"use client";
import { Story } from "@/types/story";
import {
  AspectRatio,
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
      <Grid columns="3" gap="6" width="auto" height="auto">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={story.url}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card style={{ height: "100%" }}>
              <Flex direction="column" width="100%" justify="between">
                {story.thumbnailUrl ? (
                  <AspectRatio ratio={1}>
                    <img
                      src={story.thumbnailUrl}
                      alt="A house in a forest"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "var(--radius-2)",
                      }}
                    />
                  </AspectRatio>
                ) : null}
                {/* <Heading size="4" mb="2">
                  {story.title}
                </Heading> */}
                <Text>{story.title}</Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

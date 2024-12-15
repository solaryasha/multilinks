"use client";
import { Card, Flex, Grid, Skeleton, Text } from "@radix-ui/themes";
import { useState } from "react";

export function DiscoverGrid() {
  const [stories] = useState([]);
  // const getStories = useAction(api.stories.getStories);

  // useEffect(() => {
  //   getStories().then((storiesFromApi) => setStories(storiesFromApi))
  // }, [])

  return (
    <Grid columns="3" gap="3" width="auto">
      {stories.length
        ? null
        : Array.from({ length: 12 }).map((_, index) => (
            <Card key={index}>
              <Flex direction="column" gap="3">
                <Skeleton height="48px">
                  <Text as="div" size="2" weight="bold" />
                </Skeleton>
                <Skeleton height="48px">
                  <Text as="p" />
                </Skeleton>
                <Text as="p">
                  <Skeleton height="48px" />
                </Text>
              </Flex>
            </Card>
          ))}
    </Grid>
  );
}

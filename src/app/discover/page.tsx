import { Box, Container, Section } from "@radix-ui/themes";
import { StoriesGrid } from "../components/stories";
import getStories from "@/actions/getStories";

export default async function MyLinksPage() {
  const aiStories = await getStories(["AI"]);
  return (
    <Section py="4">
      <Container size="3">
        <Box mb="9">
          <StoriesGrid stories={aiStories} keyword="AI" />
        </Box>
      </Container>
    </Section>
  );
}

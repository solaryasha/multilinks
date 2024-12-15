import { Container, Section } from "@radix-ui/themes";
import { DiscoverGrid } from "../components/discover-grid";

export default async function MyLinksPage() {
  return (
    <Section py="4">
      <Container size="3">
        <DiscoverGrid />
      </Container>
    </Section>
  );
}

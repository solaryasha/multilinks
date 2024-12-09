import { Box, Container, Flex, Heading, Section } from "@radix-ui/themes";
import SaveLinkDialog from "../components/save-link-dialog";
import UserLinks from "../components/user-links";

export default function MyLinksPage() {
  return (
    <Section py="4">
      <Container size="3">
        <Box mb="4">
          <Flex align="center" justify="between">
            <Heading size="8">My links</Heading>
            <SaveLinkDialog />
          </Flex>
        </Box>
        <UserLinks />
      </Container>
    </Section>
  );
}

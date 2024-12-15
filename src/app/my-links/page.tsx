import { Box, Container, Flex, Heading, Section } from "@radix-ui/themes";
import SaveLinkDialog from "../components/save-link-dialog";
import UserLinks from "../components/user-links";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

const getUserLinks = async () => {
  const { user } = await withAuth();

  if (!user) return [];

  const data = await fetchQuery(api.userLinks.paginate, {
    userId: user.id,
    paginationOpts: { numItems: 10, cursor: null },
  });

  return data.page;
};

export default async function MyLinksPage() {
  const userLinks = await getUserLinks();

  return (
    <Section py="4">
      <Container size="3">
        <Box mb="4">
          <Flex align="center" justify="between">
            <Heading size="8">My links</Heading>
            <SaveLinkDialog />
          </Flex>
        </Box>
        <UserLinks links={userLinks} />
      </Container>
    </Section>
  );
}

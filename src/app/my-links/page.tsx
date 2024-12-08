import { Flex, Heading } from "@radix-ui/themes";
import SaveLinkDialog from "../components/save-link-dialog";

export default function MyLinksPage() {
  return (
    <Flex align="center" justify="between" pr="4" pl="4">
      <Heading size="8">My links</Heading>
      <SaveLinkDialog />
    </Flex>
  );
}

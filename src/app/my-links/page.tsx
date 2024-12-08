import saveUserLink from "@/actions/saveUserLink";
import { Flex, Heading } from "@radix-ui/themes";
import SaveLinkInput from "../components/save-link-input";

export default function MyLinksPage() {
  return (
    <Flex align="center" justify="center" direction="column">
      <Heading size="9">My links</Heading>
      <form action={saveUserLink}>
        <SaveLinkInput />
      </form>
    </Flex>
  );
}

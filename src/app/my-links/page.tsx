import saveUserLink from "@/actions/saveUserLink";
import { Button, Flex, Heading } from "@radix-ui/themes";

export default function MyLinksPage() {
  return (
    <Flex align="center" justify="center" direction="column">
      <Heading size="9">My links</Heading>
      <form
        action={async () => {
          "use server";
          saveUserLink("https://google.com");
        }}
      >
        <Button>Click me</Button>
      </form>
      {/* <Button>Click me</Button> */}
    </Flex>
  );
}

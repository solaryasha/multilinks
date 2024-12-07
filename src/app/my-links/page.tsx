"use client";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default function MyLinksPage() {
  const addLink = async () => {
    await withAuth();
  };

  return (
    <Flex align="center" justify="center" direction="column">
      <Heading size="9">My links</Heading>
      <Button onClick={addLink}>Click me</Button>
    </Flex>
  );
}

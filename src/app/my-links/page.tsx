import { createClient } from "@/utils/supabase/server";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function MyLinksPage() {
  const { user } = await withAuth();
  const supabase = await createClient();

  const addLink = async () => {
    if (user) {
      await supabase.from("user_links").insert({
        user_id: user.id,
        link: "my link",
      });
    }
  };

  return (
    <Flex align="center" justify="center">
      <Heading size="9">My links</Heading>
      <Button onClick={addLink}></Button>
    </Flex>
  );
}

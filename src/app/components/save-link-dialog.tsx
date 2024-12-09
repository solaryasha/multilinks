"use client";

import { ChangeEvent, useState } from "react";
import { Dialog, Button, Flex, Text, TextField, Box } from "@radix-ui/themes";
import { FieldNames } from "../../types/fieldNames";
import { validateUrl } from "@/utils/validateUrl";
import { PlusIcon } from "@radix-ui/react-icons";
import saveUserLink from "@/actions/saveUserLink";

export default function SaveLinkDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsValid(true);
  };

  const handleSave = async (formData: FormData) => {
    if (validateUrl(inputValue)) {
      setLoading(true);
      setInputValue("");
      setIsValid(true);
      await saveUserLink(formData);
      setLoading(false);
      setOpen(false);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          size="3"
          style={{ cursor: "pointer" }}
          onClick={() => setIsValid(true)}
          variant="classic"
          color="gray"
          highContrast
        >
          <PlusIcon />
          Add new link
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add new link</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <form action={handleSave}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Your link
              </Text>
              <TextField.Root
                placeholder="https://"
                name={FieldNames.SavedUserLink}
                type="url"
                onChange={handleInputChange}
              />
            </label>
          </Flex>
          <Box height="1rem">
            {!isValid && (
              <Text size="1" color="red">
                {!inputValue
                  ? "You didn't provide any url, I'm upset :("
                  : "This URL is not valid. Please enter a valid URL!"}
              </Text>
            )}
          </Box>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              type="submit"
              loading={loading}
              style={{ cursor: "pointer" }}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

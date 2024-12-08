"use client";

import { useState } from "react";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { FieldNames } from "../../types/fieldNames";
import { validateUrl } from "@/utils/validateUrl";

export default function SaveLinkInput() {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsValid(value === "" || validateUrl(value));
  };

  const handleSave = () => {
    if (validateUrl(inputValue)) {
      setSavedValue(inputValue);
      setInputValue("");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Flex
      direction="column"
      gap="3"
      maxWidth="500px"
      style={{ margin: "40px auto" }}
    >
      <Flex gap="3">
        <Box width="300px">
          <TextField.Root
            style={{ flex: 1 }}
            name={FieldNames.SavedUserLink}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter text here"
            type="url"
            size="3"
          />
        </Box>
        <Button size="3" onClick={handleSave}>
          Save
        </Button>
      </Flex>
      {/* </Flex> */}
      {!isValid && (
        <Text size="1" color="red">
          This URL is not valid. Please enter a valid URL!
        </Text>
      )}
      {savedValue && (
        <Text size="2" color="gray">
          Last saved value: <Text weight="bold">{savedValue}</Text>
        </Text>
      )}
    </Flex>
  );
}

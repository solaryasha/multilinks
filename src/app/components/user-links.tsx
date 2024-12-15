"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Select,
  Table,
  TextField,
  Text,
  Box,
  Link,
} from "@radix-ui/themes";
import { useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";

interface Props {
  links: Doc<"user_links">[];
}

const resultsPerPage = [5, 10, 15, 20].map(String);

export default function UserLinks({ links: userLinks }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(userLinks.length / itemsPerPage);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <>
      <Flex>
        <Box flexGrow="1">
          <TextField.Root
            type="text"
            placeholder="Filter by keyword"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Box>
        <Select.Root
          value={itemsPerPage.toString()}
          onValueChange={handleItemsPerPageChange}
        >
          <Select.Trigger></Select.Trigger>
          <Select.Content position="popper">
            {resultsPerPage.map((result) => (
              <Select.Item key={result} value={result}>
                {result} per page
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Table.Root variant="surface" my="4" size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Link</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Added at</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userLinks.map((user) => (
            <Table.Row key={user._id}>
              <Table.Cell>
                <Link href={user.link}>{user.link}</Link>
              </Table.Cell>
              <Table.Cell>
                {new Date(user._creationTime).toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justify="between" my="4" align="center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="classic"
          color="gray"
          highContrast
        >
          <ChevronLeftIcon />
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="classic"
          color="gray"
          highContrast
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
    </>
  );
}

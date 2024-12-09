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
} from "@radix-ui/themes";
import { useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
  },
  { id: "4", name: "David Lee", email: "david@example.com", role: "Manager" },
  { id: "5", name: "Eva Martinez", email: "eva@example.com", role: "User" },
];

const resultsPerPage = [5, 10, 15, 20].map(String);

export default function UserLinks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredUsers = mockUsers;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <>
      <Flex gap="4">
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

      <Table.Root variant="surface" my="4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Link</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentUsers.map((user) => (
            <Table.Row key={user.id} className="border-t">
              <Table.Cell className="p-2">{user.name}</Table.Cell>
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

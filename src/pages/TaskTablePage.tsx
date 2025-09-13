import {
  Container,
  Title,
  Text,
  Button,
  Badge,
  Stack,
  Table,
  ActionIcon,
  Checkbox,
} from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddTaskModal from "../components/AddTaskModal";
import { useTaskStore } from "../store/TaskItemStore";

export default function TodoTablePage() {
  const { tasks, addTask, toggleTask, removeTask, setTasks } = useTaskStore();
  const [modalOpened, setModalOpened] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      let getTasks = localStorage.getItem("tasks");
      if (getTasks !== null) {
        setTasks(JSON.parse(getTasks));
      }
      return;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const rows = tasks.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td w={450}>
        <Text fw={400} td={task.isDone ? "line-through" : "none"} size="md">
          {task.title}
        </Text>
      </Table.Td>
      <Table.Td w={450}>{task.description}</Table.Td>
      <Table.Td>
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleTask(task.id)}
          label={task.isDone ? "Done" : "Pending"}
        />
      </Table.Td>
      <Table.Td>
        {task.dueDate ? dayjs(task.dueDate).format("ddd MMM DD YYYY") : "-"}
      </Table.Td>
      <Table.Td>{task.doneAt}</Table.Td>
      <Table.Td>
        <ActionIcon color="red" onClick={() => removeTask(task.id)}>
          <IconTrash size={16} />
        </ActionIcon>
      </Table.Td>
      {/* เพิ่ม row assignees ตรงนี้*/}
      <Table.Td w={450}>
        {task.assignees.map((assignee) => (
          <Badge color="blue" variant="light">
            {assignee}
          </Badge>
        ))}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" py="lg">
      <Stack align="center">
        <Title order={2}>Todo List Table</Title>
        <Text size="sm" c="dimmed">
          All: {tasks.length} | Done: {tasks.filter((t) => t.isDone).length}
        </Text>
        <Button onClick={() => setModalOpened(true)}>Add Task</Button>

        <AddTaskModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onAdd={addTask}
        />

        <Table striped highlightOnHover horizontalSpacing="xl">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Completed</Table.Th>
              <Table.Th>Actions</Table.Th>
              {/* เพิ่ม table header assignees ตรงนี้*/}
              <Table.Th>Assignees</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}

interface TaskProps {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  isDone: boolean;
  doneAt: string | null;
  assignees: string[];
}
export type { TaskProps };

interface TaskItemProps {
  tasks: TaskProps[];
  setTasks: (tasks: TaskProps[]) => void;
  addTask: (title: string, description: string, dueDate: string | null,assignees: string[]) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}
export type { TaskItemProps };

interface TaskFormState {
  title: string;
  description: string;
  dueDate: string | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDueDate: (dueDate: string | null) => void;
  resetForm: () => void;
  assignees: string[];
  setAssignees:(assignees:string[]) => void;
}
export type { TaskFormState };

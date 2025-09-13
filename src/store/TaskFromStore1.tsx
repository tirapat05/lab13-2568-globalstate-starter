import { create } from "zustand";
import { type TaskFormState } from "../libs/Task";

export const useTaskFormStore = create<TaskFormState>((set) => ({
  title: "",
  description: "",
  dueDate: "",
  assignees: [],
  setAssignees:(assingnees) => set(() =>
  ({
    assignees:assingnees,
  })),
  setTitle: (title) =>
    set(() => ({
      title: title,
    })),
  setDescription: (description) =>
    set(() => ({
      description: description,
    })),
  setDueDate: (dueDate) =>
    set(() => ({
      dueDate: dueDate,
    })),
  resetForm: () =>
    set({
      title: "",
      description: "",
      dueDate: "",
    }),
}));

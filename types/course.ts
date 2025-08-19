import { Module } from "../routes/api/modules/module.tsx";
import { Student } from "../routes/api/users/user.tsx";

export type Course = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  modules: Module[];
  students: Student[];
  difficulty?: string;
  description?: string;
  progress?: number;
};

export type CourseRawInfo = {
  _id: string;
  name: string;
  slug: string;
  modules: string[];
  students: string[];
  description: string;
  difficulty: string;
};

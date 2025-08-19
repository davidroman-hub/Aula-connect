export interface CurrentLesson {
  courseId: string;
  moduleId: string;
  moduleName: string;
  status: string; // "in-progress", "completed","not-started"
}

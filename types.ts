
export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student'
}

export interface User {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  lastLogin?: string;
}

export interface Course {
  courseId: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  lessons?: Lesson[];
}

export interface Lesson {
  lessonId: string;
  courseId: string;
  title: string;
  type: 'video' | 'book';
  videoSource?: 'drive' | 'url';
  videoRef?: string;
  pdfUrl?: string;
  durationSec?: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  status: 'started' | 'completed';
  lastUpdated: string;
}

export interface StudentStats {
  coursesInProgress: number;
  completedCourses: number;
  totalStudyHours: number;
  learningPoints: number;
  weeklyActivity: { name: string; hours: number }[];
}

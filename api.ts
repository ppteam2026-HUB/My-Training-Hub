
import { User, Course, Lesson, StudentStats, UserProgress } from './types';

// Global variable for Google Apps Script environment
declare const google: any;

const isGAS = typeof google !== 'undefined' && google.script && google.script.run;

export const api = {
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
    if (!isGAS) {
      // Local Development Mock
      await new Promise(r => setTimeout(r, 1000));
      const isAdmin = email.includes('admin');
      return { 
        success: true, 
        user: { 
          userId: isAdmin ? 'U000' : 'U001', 
          email, 
          fullName: isAdmin ? 'System Admin' : 'ทดสอบพนักงาน', 
          role: isAdmin ? 'admin' as any : 'student' as any 
        } 
      };
    }

    return new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((res: string) => resolve(JSON.parse(res)))
        .withFailureHandler((err: any) => resolve({ success: false, message: 'การเชื่อมต่อผิดพลาด: ' + err.toString() }))
        .doPostGAS({ action: 'login', email, password });
    });
  },

  async getCourses(): Promise<Course[]> {
    if (!isGAS) {
      await new Promise(r => setTimeout(r, 500));
      return MOCK_COURSES;
    }
    return new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((res: string) => resolve(JSON.parse(res)))
        .doGetGAS({ action: 'getCourses' });
    });
  },

  async getLessons(courseId: string): Promise<Lesson[]> {
    if (!isGAS) return MOCK_LESSONS;
    return new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((res: string) => resolve(JSON.parse(res)))
        .doGetGAS({ action: 'getLessons', courseId });
    });
  },

  async updateProgress(progress: Omit<UserProgress, 'lastUpdated'>): Promise<void> {
    if (!isGAS) {
      console.log('Update Progress (Local):', progress);
      return;
    }
    return new Promise((resolve) => {
      google.script.run
        .withSuccessHandler(() => resolve())
        .doPostGAS({ action: 'updateProgress', ...progress });
    });
  },

  async getStudentStats(userId: string): Promise<StudentStats> {
    if (!isGAS) {
      return {
        coursesInProgress: 2,
        completedCourses: 5,
        totalStudyHours: 24.5,
        learningPoints: 850,
        weeklyActivity: [
          { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 1.5 }, { name: 'Wed', hours: 3 },
          { name: 'Thu', hours: 4 }, { name: 'Fri', hours: 2.5 }, { name: 'Sat', hours: 0 }, { name: 'Sun', hours: 1 }
        ]
      };
    }
    return new Promise((resolve) => {
      google.script.run
        .withSuccessHandler((res: string) => resolve(JSON.parse(res)))
        .doGetGAS({ action: 'getStudentStats', userId });
    });
  }
};

const MOCK_COURSES: Course[] = [
  { courseId: 'CRS001', name: 'Workplace Safety 2024', description: 'กฎความปลอดภัยขั้นพื้นฐานและการจัดการสารเคมีเบื้องต้น', thumbnail: 'https://images.unsplash.com/photo-1581092921461-eab62e92c73e?w=800', category: 'Compliance' },
  { courseId: 'CRS002', name: 'Effective Digital Communication', description: 'ทักษะการสื่อสารผ่านช่องทางดิจิทัลในองค์กรยุคใหม่', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', category: 'Soft Skills' }
];

const MOCK_LESSONS: Lesson[] = [
  { lessonId: 'L1', courseId: 'CRS001', title: 'Chapter 1: Safety Mindset', type: 'video', videoRef: 'https://example.com' },
  { lessonId: 'L2', courseId: 'CRS001', title: 'Chapter 2: PPE Manual', type: 'book', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
];

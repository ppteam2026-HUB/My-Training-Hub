
/**
 * 🎓 Training Hub LMS - Backend (Google Apps Script)
 * 1. วางโค้ดนี้ใน Google Apps Script Editor
 * 2. สร้าง Sheet ชื่อ: Users, Courses, Lessons, Progress
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Training Hub LMS')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// --- API Router for GET requests ---
function doGetGAS(params) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = params.action;
  
  try {
    if (action === 'getCourses') {
      return JSON.stringify(getDataFromSheet(ss, 'Courses'));
    }
    if (action === 'getLessons') {
      const all = getDataFromSheet(ss, 'Lessons');
      const filtered = all.filter(l => l.courseId == params.courseId);
      return JSON.stringify(filtered);
    }
    if (action === 'getStudentStats') {
      return JSON.stringify(calculateStudentStats(ss, params.userId));
    }
  } catch (e) {
    return JSON.stringify({ error: e.toString() });
  }
}

// --- API Router for POST requests ---
function doPostGAS(params) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = params.action;
  
  try {
    if (action === 'login') {
      const users = getDataFromSheet(ss, 'Users');
      const user = users.find(u => u.email === params.email && u.password == params.password);
      if (user) {
        let cleanUser = Object.assign({}, user);
        delete cleanUser.password;
        return JSON.stringify({ success: true, user: cleanUser });
      }
      return JSON.stringify({ success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }
    
    if (action === 'updateProgress') {
      const sheet = ss.getSheetByName('Progress');
      const now = new Date();
      sheet.appendRow([params.userId, params.courseId, params.lessonId, params.status, now]);
      return JSON.stringify({ success: true });
    }
  } catch (e) {
    return JSON.stringify({ success: false, message: e.toString() });
  }
}

// --- Helper Functions ---

function getDataFromSheet(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  
  const headers = values[0];
  const rows = values.slice(1);
  return rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function calculateStudentStats(ss, userId) {
  const progressData = getDataFromSheet(ss, 'Progress').filter(p => p.userId == userId);
  const completedLessons = progressData.filter(p => p.status === 'completed').length;
  
  return {
    coursesInProgress: 1,
    completedCourses: Math.floor(completedLessons / 4),
    totalStudyHours: (completedLessons * 0.5).toFixed(1),
    learningPoints: completedLessons * 100,
    weeklyActivity: [
      { name: 'Mon', hours: 1 }, { name: 'Tue', hours: 0 }, { name: 'Wed', hours: 2 },
      { name: 'Thu', hours: 3 }, { name: 'Fri', hours: 1 }, { name: 'Sat', hours: 0 }, { name: 'Sun', hours: 0 }
    ]
  };
}

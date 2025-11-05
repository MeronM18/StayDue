-- Create courses table (classes/classes user is taking)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT, -- e.g., "CS 101", "MATH 240"
  instructor TEXT,
  semester TEXT, -- e.g., "Fall 2024", "Spring 2025"
  year INTEGER,
  color TEXT, -- For UI display
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create documents table (syllabus uploads, PDFs, etc.)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL, -- Supabase Storage URL
  file_type TEXT, -- "pdf", "docx", etc.
  file_size BIGINT, -- in bytes
  extracted_data JSONB, -- Store extracted text/data from document
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create tasks table (assignments, tests, exams, projects, etc.)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  -- Task details
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL, -- "assignment", "test", "exam", "project", "report", "quiz", "other"
  priority TEXT DEFAULT 'medium', -- "low", "medium", "high"
  status TEXT DEFAULT 'todo', -- "todo", "in_progress", "completed", "cancelled"
  -- Due dates
  due_date TIMESTAMP WITH TIME ZONE,
  due_time TIME, -- Specific time on due_date
  -- Google Calendar integration
  calendar_event_id TEXT, -- Google Calendar event ID if synced
  calendar_synced BOOLEAN DEFAULT FALSE,
  -- Metadata
  points_possible NUMERIC,
  points_earned NUMERIC,
  is_graded BOOLEAN DEFAULT FALSE,
  -- Relations
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL, -- If extracted from syllabus
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS courses_user_id_idx ON courses(user_id);
CREATE INDEX IF NOT EXISTS courses_semester_year_idx ON courses(semester, year);
CREATE INDEX IF NOT EXISTS documents_user_id_idx ON documents(user_id);
CREATE INDEX IF NOT EXISTS documents_course_id_idx ON documents(course_id);
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_course_id_idx ON tasks(course_id);
CREATE INDEX IF NOT EXISTS tasks_due_date_idx ON tasks(due_date);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks(status);
CREATE INDEX IF NOT EXISTS tasks_task_type_idx ON tasks(task_type);
CREATE INDEX IF NOT EXISTS tasks_calendar_event_id_idx ON tasks(calendar_event_id);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
DROP POLICY IF EXISTS "Users can read own courses" ON courses;
CREATE POLICY "Users can read own courses"
  ON courses FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own courses" ON courses;
CREATE POLICY "Users can insert own courses"
  ON courses FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own courses" ON courses;
CREATE POLICY "Users can update own courses"
  ON courses FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own courses" ON courses;
CREATE POLICY "Users can delete own courses"
  ON courses FOR DELETE
  USING (user_id = auth.uid());

-- RLS Policies for documents
DROP POLICY IF EXISTS "Users can read own documents" ON documents;
CREATE POLICY "Users can read own documents"
  ON documents FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own documents" ON documents;
CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own documents" ON documents;
CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own documents" ON documents;
CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  USING (user_id = auth.uid());

-- RLS Policies for tasks
DROP POLICY IF EXISTS "Users can read own tasks" ON tasks;
CREATE POLICY "Users can read own tasks"
  ON tasks FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own tasks" ON tasks;
CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own tasks" ON tasks;
CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own tasks" ON tasks;
CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  USING (user_id = auth.uid());

-- Triggers for updated_at
DROP TRIGGER IF EXISTS courses_updated_at ON courses;
CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS documents_updated_at ON documents;
CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tasks_updated_at ON tasks;
CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


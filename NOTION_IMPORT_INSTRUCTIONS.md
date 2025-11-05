# How to Import This Task List into Notion

## Option 1: Copy-Paste (Easiest)

1. **Open Notion** and create a new page
2. **Open** `NOTION_TASKS.md` file
3. **Copy all the content** (Cmd+A, Cmd+C)
4. **Paste into Notion** (Cmd+V)
5. Notion will automatically convert markdown checkboxes to Notion checkboxes

## Option 2: Import Markdown File

1. **In Notion**, click **"Import"** in the sidebar
2. Select **"Markdown"** or **"Text"**
3. Upload `NOTION_TASKS.md` file
4. Notion will convert it with checkboxes

## Option 3: Manual Setup (Most Control)

1. **Create a new Notion page**
2. **Create sections** using the headings from the task list
3. **Add checkboxes** by typing `/checkbox` and selecting "Checkbox"
4. Copy task items and add checkboxes manually

## Tips for Notion

### Create a Database View (Recommended)

1. **Create a new Database** (Table view)
2. **Add columns**:
   - `Task` (Title)
   - `Status` (Select: Not Started, In Progress, Done)
   - `Week` (Select: Week 1, Week 2, etc.)
   - `Category` (Select: Infrastructure, Auth, Database, etc.)
   - `Priority` (Select: High, Medium, Low)
3. **Import tasks** from the markdown file
4. **Create views**:
   - "Week 1 Tasks" (filter by Week = Week 1)
   - "In Progress" (filter by Status = In Progress)
   - "Done" (filter by Status = Done)

### Use Templates

Create a template for recurring tasks:
- Task name
- Description
- Checklist
- Due date
- Assignee (if working with team)

### Quick Actions

- Use `/` to add blocks quickly
- Use `@` to mention dates, pages, or people
- Use `[]` to create checkboxes inline
- Use `Cmd+Shift+L` for line numbers


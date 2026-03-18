# GoodHome — Project Context for AI Assistants

## What is GoodHome?
GoodHome is a family communication platform — think Discord but built specifically for families. Each family creates a private group (like a server) and communicates through channels, events, shared media, and member management.

## Tech Stack
- **Frontend**: React 18 + Vite, React Router, Axios, Context API, Vanilla CSS
- **Backend**: Node.js, Express.js, JWT auth, bcrypt
- **Database**: MongoDB Atlas + Mongoose
- **Deployment**: Frontend → Vercel, Backend → Render
- **Auth Storage**: sessionStorage (per-tab isolation for multi-user testing)

## Project Structure
```
GoodHome-frontend/
  src/
    api/          # axiosInstance.js — base URL + auth interceptor
    context/      # AuthContext.jsx — user, loading, login(), logout()
    pages/        # GroupsPage, ChannelsPage, MembersPage, EventsPage, MediaPage, SettingsPage
    layouts/      # GroupLayout.jsx — sidebar + topbar for group workspace
    components/   # TopBar, Sidebar, StatCards, etc.
    
GoodHome-backend/
  src/
    models/       # User, Group, Channel, Message, Event, Media, Activity
    routes/       # auth, group, channel, message, event, media, dashboard
    middleware/   # auth.middleware.js
    config/       # db.js
```

## Core Architecture
- `/dashboard` → GroupsPage (list of user's groups)
- `/groups/:groupId/*` → GroupLayout wrapping all group pages
- All group content is scoped by `groupId` — users only see data from groups they are members of
- JWT token stored in **sessionStorage** (not localStorage) for per-tab user isolation

## API Base URL
`https://goodhome-backend.onrender.com/api`

## Key API Endpoints
```
Auth:         POST /api/auth/register, /api/auth/login
              PATCH /api/auth/profile, /api/auth/password

Groups:       GET  /api/groups/my
              POST /api/groups/create, /api/groups/join
              GET  /api/groups/:groupId
              GET  /api/groups/:groupId/invite
              DELETE /api/groups/:groupId
              POST /api/groups/:groupId/leave
              GET  /api/groups/:groupId/members
              DELETE /api/groups/:groupId/members/:memberId
              GET/POST /api/groups/:groupId/channels

Channels:     GET/POST /api/channels/:channelId/messages
              DELETE /api/channels/:channelId/messages/:messageId
              DELETE /api/groups/:groupId/channels/:channelId

Events:       GET /api/events?groupId=:groupId
              POST /api/events
              DELETE /api/events/:id

Media:        POST /api/media/upload (base64, no multer)
              GET /api/groups/:groupId/media
              DELETE /api/media/:mediaId

Dashboard:    GET /api/dashboard?groupId=:groupId
```

## Database Models
- **User**: name, email, password (bcrypt), role, lastSeen
- **Group**: name, description, owner (ref User), members ([ref User]), inviteCode (unique 8-char), createdAt
- **Channel**: name, groupId, createdBy, createdAt
- **Message**: text, sender (ref User), channelId, groupId, createdAt
- **Event**: title, date, time, description, groupId, createdBy (ref User), createdAt
- **Media**: fileName, fileData (base64 string), mimeType, groupId, uploadedBy (ref User), createdAt
- **Activity**: type, description, groupId, createdBy (ref User), createdAt

## Auth Pattern
```js
// All protected API calls
const token = sessionStorage.getItem('token');
headers: { Authorization: `Bearer ${token}` }

// AuthContext exposes
const { user, loading, login, logout } = useAuth();
// user: { _id, name, email, role }
```

## Important Rules
- NEVER use localStorage — always sessionStorage (multi-tab user isolation)
- All routes inside /groups/:groupId/* must be wrapped in ProtectedRoute
- Member check always uses .toString() comparison on ObjectIds
- Media stored as base64 in MongoDB (Render filesystem is ephemeral)
- Backend channel routes registered under /api/groups, message routes under /api/channels

## Current State
All core features are working:
- Group creation, joining via invite code, leaving, deleting (owner)
- Channels with real-time messaging (5s polling)
- Members list with invite code sharing
- Events CRUD
- Media upload/view/delete (base64)
- Settings (name + password update)
- Delete permissions: owner can delete everything, members can delete own content
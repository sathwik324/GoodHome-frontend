import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

import GroupsPage from "./pages/GroupsPage";
import GroupLayout from "./layouts/GroupLayout";

import ChannelsPage from "./pages/ChannelsPage";
import MembersPage from "./pages/MembersPage";
import EventsPage from "./pages/EventsPage";
import MediaPage from "./pages/MediaPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />

      {/* Old Dashboard is now the Groups selection page */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <GroupsPage />
          </ProtectedRoutes>
        }
      />

      {/* Group Workspace layout wraps all feature pages */}
      <Route
        path="/groups/:groupId"
        element={
          <ProtectedRoutes>
            <GroupLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="channels" element={<ChannelsPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;

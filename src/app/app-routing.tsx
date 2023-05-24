import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./guards/auth.guard";

import { Register } from "./core/auth/register/register";
import { Login } from "./core/auth/login/login";
import { UserDashboard } from "./core/dashboard/users/user";
import { TaskCreateComponent } from "./core/dashboard/users/pages/task-create/task-create.component";
import { TaskViewComponent } from "./core/dashboard/users/pages/task-view/task-view.component";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={ <ProtectedRoute fallbackPath="/login" element={<UserDashboard />} />}>
            <Route path="" element={<TaskViewComponent />} />
            <Route path="create" element={<TaskCreateComponent />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
};
export default AppRouter;

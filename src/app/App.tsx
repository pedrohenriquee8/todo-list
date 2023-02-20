import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import { TaskProvider } from "../ui/contexts/TaskProvider";
import { MyTasks } from "../ui/pages/MyTasks";

export function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyTasks />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./components/container/Dashboard";
import NewPost from "./components/container/NewPost";
import Layout from "./components/container/Layout";
import Login from "./components/container/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createOrUpdate" element={<NewPost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

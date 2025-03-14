import "./App.css";
import Dashboard from "./components/container/Dashboard";
import PostProvider from "./context/PostContext";

function App() {
  return (
    <div>
      <PostProvider>
        <Dashboard></Dashboard>
      </PostProvider>
    </div>
  );
}

export default App;

import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <nav className="bg-gray-800 p-4 flex justify-between">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/createOrUpdate"
              className="text-white hover:text-gray-400"
            >
              New Post
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to="/login"
              className="text-white hover:text-gray-400 float-right"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

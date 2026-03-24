import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">TodoApp</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-600 font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center text-center px-6">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Organize Your Life with TodoApp
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your daily tasks efficiently and stay productive.
          </p>

          <div className="space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          
          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Simple and clean interface for managing your tasks.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">
              Your data is protected with authentication and cookies.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Fast</h3>
            <p className="text-gray-600">
              Lightning-fast performance with modern technologies.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500">
        © {new Date().getFullYear()} TodoApp. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;
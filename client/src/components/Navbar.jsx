import { useEffect, useState } from "react";
import { FaBell, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../api/notificationApi";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (token) {
      loadNotifications();
    }
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-3xl font-bold text-blue-600"
      >
        ATS Portal
      </Link>

      <div className="flex items-center gap-6">
        {token && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="relative"
            >
              <FaBell className="text-2xl text-gray-700" />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl border z-50 max-h-[450px] overflow-y-auto">

                <div className="p-4 border-b font-bold text-lg">
                  🔔 Notifications
                </div>

                {notifications.length === 0 ? (
                  <p className="p-4 text-gray-500 text-center">
                    No Notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleRead(item._id)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                        item.isRead
                          ? "bg-white"
                          : "bg-blue-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">

                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {item.title}
                          </h3>

                          <p className="text-sm text-gray-600 mt-1">
                            {item.message}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                          className="text-red-500 hover:text-red-700 ml-3"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
        {token ? (
  <>
    <Link
      to="/dashboard"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
    >
      Dashboard
    </Link>

    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  </>
) : (
       
          <>
            <Link
              to="/login"
              className="border px-5 py-2 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
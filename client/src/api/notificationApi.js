import API from "./api";

export const getNotifications = () => {
  const token = localStorage.getItem("token");

  return API.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markNotificationRead = (id) => {
  const token = localStorage.getItem("token");

  return API.put(
    `/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteNotification = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/notifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
import API from "./api";

export const getNotifications = () => {
  const token = localStorage.getItem("token");

  return API.get("/notification", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markNotificationRead = (id) => {
  const token = localStorage.getItem("token");

  return API.put(
    `/notification/${id}/read`,
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

  return API.delete(`/notification/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
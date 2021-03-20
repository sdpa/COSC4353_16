export const getConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
};

export const getConfig = () => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
};

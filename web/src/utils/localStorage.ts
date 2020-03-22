export const readFromLS = () => {
  const userDetails = localStorage.getItem("helper_human_ls");
  if (!userDetails) return null;
  return JSON.parse(userDetails);
};

export const writeIntoLS = (data: any) => {
  if (data) {
    localStorage.setItem("helper_human_ls", JSON.stringify(data));
  }
};

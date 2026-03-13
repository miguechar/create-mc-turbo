export const getUserInitials = (name: string) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
};

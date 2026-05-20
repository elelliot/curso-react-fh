export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: number) => {
  console.log("START - Function");
  await new Promise((res) => setTimeout(res, 2000));
  console.log("RESOLVED - Function");

  return {
    id,
    name: "Fernando Herrera",
    location: "Ottawa, Canada",
    role: "Instructor de Software",
  };
};

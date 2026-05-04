export const getTiles = async () => {
  const res = await fetch("http://localhost:5000/tiles");
  const data = await res.json();
  console.log("Fetched:", data);
  return data;
};
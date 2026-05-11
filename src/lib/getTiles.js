export const getTiles = async () => {
  const res = await fetch("https://tiles-gallery-server-l7uz.onrender.com/tiles");
  const data = await res.json();
  console.log("Fetched:", data);
  return data;
};
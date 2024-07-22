export const deleteClient = async (clientId: string) => {
  try {
    const res = await fetch("/clients/api/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId }),
    });
    if (!res.ok) {
      throw new Error("Network response failed.");
    }
    const data = await res.json();
    // returns deleted client information
    return data;
  } catch (error) {
    console.error("Could not delete client from database.", error);
  }
};

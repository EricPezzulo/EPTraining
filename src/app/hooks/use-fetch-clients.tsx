import { useQuery } from "@tanstack/react-query";

export function useFetchClients() {
  return useQuery({ queryKey: ["clients"], queryFn: getClients });
}


export async function getClients () {
  try {
    const res = await fetch("/clients/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

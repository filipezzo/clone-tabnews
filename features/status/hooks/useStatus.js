import { useQuery } from "@tanstack/react-query";

async function getStatusData() {
  const response = await fetch("/api/v1/status");
  if (!response.ok) {
    throw new Error("Erro ao buscar os dados do status");
  }
  const data = await response.json();

  return data;
}

export function useStatus() {
  return useQuery({
    queryKey: ["status"],
    queryFn: getStatusData,
    refetchInterval: 2000,
  });
}

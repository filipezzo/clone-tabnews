import { useStatus } from "../hooks/useStatus";

export function DatabaseStatus() {
  const { data, isPending, error } = useStatus();
  const database = data?.dependencies?.database;

  if (error) {
    return <p>erro ao puxar dados do banco de dados {error.message}</p>;
  }

  if (isPending) {
    return <p>loading...</p>;
  }

  if (!database) return null;

  return (
    <div>
      <p>Versão: {database.version} </p>
      <p>Conexões Máximas: {database.max_connections}</p>
      <p>Conexões Abertas: {database.opened_connections}</p>
    </div>
  );
}

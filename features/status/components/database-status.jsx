import { useStatus } from "../hooks/useStatus";

export function DatabaseStatus() {
  const { data, isPending, error } = useStatus();
  const database = data?.dependencies?.database;

  if (error) {
    return <p>❌ {error.message}</p>;
  }

  if (isPending) {
    return (
      <div>
        <h2>Database</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!database) return null;

  return (
    <div>
      <h2>Database</h2>
      <p>Versão: {database.version} </p>
      <p>Conexões Máximas: {database.max_connections}</p>
      <p>Conexões Abertas: {database.opened_connections}</p>
    </div>
  );
}

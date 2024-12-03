import { useStatus } from "../hooks/useStatus";

export function UpdatedAt() {
  const { data, isPending, error } = useStatus();

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isPending) {
    return <p>Carregando...</p>;
  }

  if (!data) return null;

  const formatDate = new Date(data.updated_at).toLocaleString("pt-br");

  return (
    <div>
      <p>
        Última atualização: <span>{formatDate}</span>{" "}
      </p>
    </div>
  );
}

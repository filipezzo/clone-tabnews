import { DatabaseStatus } from "features/status/components/database-status";
import { UpdatedAt } from "features/status/components/updated-at";

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

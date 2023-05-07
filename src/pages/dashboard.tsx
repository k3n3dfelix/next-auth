import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/apiClient";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { setupApiClient } from "@/services/api";
import { useCan } from "@/hooks/useCan";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const userCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
  });

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      {userCanSeeMetrics && <div>Métricas</div>}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  }
);

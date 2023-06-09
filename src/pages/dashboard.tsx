import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/apiClient";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { setupApiClient } from "@/services/api";
import { useCan } from "@/hooks/useCan";
import { Can } from "@/components/Can";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
 
  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
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


import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { setupApiClient } from "@/services/api";
import { Can } from "@/components/Can";


export default function Metrics() {

  return (
    <>
      <h1>Metrics</h1>
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
  },{
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
);

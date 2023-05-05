import { useContext, useEffect } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { api } from "@/services/apiClient"
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { setupApiClient } from "@/services/api";

export default function Dashboard(){

  useEffect(() => {
    api.get('/me')
    .then(response =>  console.log(response))
    .catch(error => console.log(error));
  }, [])
  const { user } = useContext(AuthContext)
  return(
    <h1>Dashboard: {user?.email}</h1>
  )
}
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);
  return {
    props:{}
  }
});

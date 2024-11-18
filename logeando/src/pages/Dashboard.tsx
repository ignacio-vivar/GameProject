import { Flex } from "@chakra-ui/react";
import DashboardGet from "../components/DashboardGet";
import DashboardPost from "../components/DashboardPost";
import DashboardLogout from "../components/DashboardLogout";
import { useState } from "react";
import DashboardDelete from "../components/DashboardDelete";
import DashboardAdmin from "../components/DashboardAdmin";

function Dashboard() {
  const [shouldFetch, setShouldFetch] = useState(false);

  const toggleFetch = () => setShouldFetch((prev) => !prev);
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"stretch"}>
        <DashboardGet shouldFetch={shouldFetch} />
        <DashboardPost onPostSuccess={toggleFetch} />
      </Flex>
      <DashboardAdmin />
      <DashboardDelete />
      <DashboardLogout />
    </>
  );
}

export default Dashboard;

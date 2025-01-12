import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminStatistics from "../../../components/Statistics/AdminStatistics";
import GuestStatistics from "../../../components/Statistics/GuestStatistics";
import HostStatistics from "../../../components/Statistics/HostStatistics";
import { useRole } from "../../../hooks/useRole";

const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      {role === "guest" && <GuestStatistics />}
      {role === "host" && <HostStatistics />}
      {role === "admin" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;

import { getPortfolioData } from "@/lib/data";
import AdminDashboard from "./AdminDashboard";
import LoginScreen from "./LoginScreen";
import { checkAuth } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return <LoginScreen />;
  }

  const initialData = getPortfolioData();
  return <AdminDashboard initialData={initialData} />;
}

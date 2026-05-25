import { getPortfolioData } from "@/lib/data";
import AdminShell from "@/components/admin/AdminShell";
import LoginScreen from "./LoginScreen";
import { checkAuth } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return <LoginScreen />;
  }

  const initialData = await getPortfolioData();
  return <AdminShell initialData={initialData} />;
}

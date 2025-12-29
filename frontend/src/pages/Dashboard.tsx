import PageLayout from "../components/pages/PageLayout";
import PageHeader from "../components/pages/Header";

export default function Dashboard() {
  return (
    <PageLayout>
      <PageHeader title="Dashboard"/>
      <p className="text-gray-400">Bienvenue sur ton dashboard crypto</p>
    </PageLayout>
  )
}
import PageLayout from "../components/pages/PageLayout";
import PageHeader from "../components/pages/Header";

export default function Portfolio() {
  return (
    <PageLayout>
      <PageHeader title="Portfolio"/>
      <p className="text-gray-400">Gérez votre portefeuille</p>
    </PageLayout>
  )
}
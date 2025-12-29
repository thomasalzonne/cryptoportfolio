import PageHeader from "../components/pages/Header";
import PageLayout from "../components/pages/PageLayout";

export default function Dashboard() {
  return (
    <PageLayout>
      <PageHeader title="Dashboard" />
      
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Markets History</h2>
          <p className="text-gray-600 dark:text-gray-400">Table</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Swap</h3>
            <p className="text-gray-600 dark:text-gray-400">Swap Component</p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Wallet</h3>
            <p className="text-gray-600 dark:text-gray-400">Wallet Component</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
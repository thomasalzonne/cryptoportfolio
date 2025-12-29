interface PageHeaderTitle {
  title: string
}

export default function PageHeader({title}: PageHeaderTitle) {
    return(
        <div className="flex flex-col w-full mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
            <div className="relative w-full h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-cyan-400 blur-md opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600 to-transparent dark:via-cyan-500"></div>
            </div>
        </div>
    )
}
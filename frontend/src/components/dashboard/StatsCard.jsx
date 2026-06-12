export default function StatsCard({ title, value, icon: Icon, color, change }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className="text-sm font-semibold text-green-600">
            {change}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  )
}

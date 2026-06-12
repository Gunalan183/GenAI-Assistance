export default function AnalysisResults({ analysis }) {
  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No analysis results yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Matching Score */}
      <div className="text-center p-6 bg-gradient-to-r from-primary to-secondary rounded-lg">
        <p className="text-white text-sm mb-2">Matching Score</p>
        <p className="text-5xl font-bold text-white">{analysis.matchingScore}</p>
        <p className="text-white text-sm mt-2">out of 100</p>
      </div>

      {/* Career Domain */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Career Domain
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {analysis.careerDomain}
        </p>
      </div>

      {/* Skill Summary */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Skill Summary
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {analysis.skillSummary}
        </p>
      </div>

      {/* Experience Summary */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Experience Summary
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {analysis.experienceSummary}
        </p>
      </div>

      {/* Career Insights */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Career Insights
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {analysis.careerInsights}
        </p>
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Recommendations
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

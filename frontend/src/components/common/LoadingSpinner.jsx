const LoadingSpinner = ({ size = 'md', inline = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const spinnerElement = (
    <div className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}></div>
  )

  // If inline, return just the spinner without the centering container
  if (inline) {
    return spinnerElement
  }

  // Otherwise return the spinner in a centered container
  return (
    <div className="flex justify-center items-center py-8">
      {spinnerElement}
    </div>
  )
}

export default LoadingSpinner

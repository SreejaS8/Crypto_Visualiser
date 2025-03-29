import * as React from "react"

// Simple className combiner function to replace cn
const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "relative w-full rounded-lg border p-4"
  const variantStyles = variant === "destructive" 
    ? "border-red-500 text-red-600 dark:border-red-700" 
    : "bg-white border-gray-200 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
  
  return (
    <div
      ref={ref}
      role="alert"
      className={combineClasses(baseStyles, variantStyles, className)}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={combineClasses("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={combineClasses("text-sm", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
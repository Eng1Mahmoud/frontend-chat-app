interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export function AuthButton({
  children,
  isLoading,
  loadingText = "Loading...",
  className = "",
  disabled,
  ...props
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

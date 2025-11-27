import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AuthFooterProps {
  text?: string;
  linkText: string;
  linkHref: string;
  showArrow?: boolean;
}

export function AuthFooter({ text, linkText, linkHref, showArrow = false }: AuthFooterProps) {
  return (
    <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
      {text && <span>{text} </span>}
      <Link
        href={linkHref}
        className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
      >
        {showArrow && <ArrowRight className="mr-2 h-4 w-4 rotate-180" />}
        {linkText}
        {!showArrow && text && <ArrowRight className="ml-1 h-4 w-4" />}
      </Link>
    </div>
  );
}

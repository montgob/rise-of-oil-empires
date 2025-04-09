
import { LucideProps } from "lucide-react";

export function PipeLine(props: LucideProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10h18" />
      <path d="M6 6v4" />
      <path d="M18 6v4" />
      <path d="M21 10v4a2 2 0 0 1-2 2h-4v-2" />
      <path d="M3 10v4a2 2 0 0 0 2 2h4v-2" />
      <path d="M14 16v4" />
      <path d="M10 16v4" />
    </svg>
  );
}

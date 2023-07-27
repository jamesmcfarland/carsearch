import Link from "next/link";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

const GithubButton = () => {
  return (
    <Button asChild variant="outline">
      <Link
        href="https://github.com/jamesmcfarland"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="w-4 h-4" />
      </Link>
    </Button>
  );
};

export default GithubButton;

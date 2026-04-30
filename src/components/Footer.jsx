import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-4 bg-card px-4 relative border-t border-gray-900">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} meow meow
        </p>
        <a
          href="#hero"
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};


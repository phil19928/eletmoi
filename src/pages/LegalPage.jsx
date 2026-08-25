import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../sections/Footer";
import { legalComponents } from "../components/markdownComponents";

export default function LegalPage({ content }) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      <div className="flex-1">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <Link
            to="/"
            className="inline-block mb-8 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            ← Retour à l'accueil
          </Link>
          <ReactMarkdown components={legalComponents} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}

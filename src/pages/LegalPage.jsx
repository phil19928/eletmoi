import SiteLink from "../components/SiteLink";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../sections/Footer";
import Navbar from "../components/Navbar";
import { legalComponents } from "../components/markdownComponents";

export default function LegalPage({ content }) {
  return (
    <div className="min-h-screen bg-paper font-sans antialiased flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 pt-28 pb-14 sm:pt-32">
          <SiteLink
            to="/"
            className="inline-block mb-8 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            ← Retour à l'accueil
          </SiteLink>
          <ReactMarkdown components={legalComponents} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../sections/Footer";

const components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold font-display text-gray-900 mb-6 mt-2">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold font-display text-gray-800 mb-3 mt-8">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 pl-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1 pl-2">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  hr: () => <hr className="border-gray-200 my-6" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-gray-200 px-3 py-2 font-semibold text-gray-800">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 px-3 py-2 text-gray-700">{children}</td>
  ),
};

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
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}

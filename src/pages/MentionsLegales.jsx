import content from "../legal/mentions-legales.md?raw";
import LegalPage from "./LegalPage";

export default function MentionsLegales() {
  return <LegalPage content={content} />;
}

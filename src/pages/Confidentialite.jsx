import content from "../legal/confidentialite.md?raw";
import LegalPage from "./LegalPage";

export default function Confidentialite() {
  return <LegalPage content={content} />;
}

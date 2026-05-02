import content from "../legal/cgv.md?raw";
import LegalPage from "./LegalPage";

export default function CGV() {
  return <LegalPage content={content} />;
}

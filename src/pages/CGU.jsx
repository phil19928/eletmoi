import content from "../legal/cgu.md?raw";
import LegalPage from "./LegalPage";

export default function CGU() {
  return <LegalPage content={content} />;
}

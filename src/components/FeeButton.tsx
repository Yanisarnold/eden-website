import { FEE_DOCUMENTS } from "@/data/fee-documents";
import { EnquiryButton } from "./EnquiryModal";

export function FeeButton({slug = "all", location, className}: {slug?: string; location?: string; className?: string}) {
  const url = FEE_DOCUMENTS[slug];
  return url ? <a href={url} download className={className}>Download {location ? `${location} fees` : "all fees"} (PDF)</a>
    : <EnquiryButton intent="Fees enquiry" location={location} className={className}>Request {location ? `${location} fees` : "fee information"}</EnquiryButton>;
}

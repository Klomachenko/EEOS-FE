import ProgramPresentations from "./ProgramPresentations";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";

interface ProgramDetailProps {
  data: ProgramInfoDto;
}

const ProgramDetail = ({ data }: ProgramDetailProps) => {
  const { content } = data;
  return (
    <>
      <MarkdownViewer value={content} />
      <ProgramPresentations />
    </>
  );
};
export default ProgramDetail;

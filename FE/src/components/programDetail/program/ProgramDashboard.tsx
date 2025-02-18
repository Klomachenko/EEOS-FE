"use client";

import DashboardWrapper from "./DashboardCompound/DashboardWrapper";
import Title from "@/components/common/Title/Title";
import { AccessType } from "@/types/access";

interface ProgramDashboardProps {
  programId: number;
  accessType: AccessType;
}
const ProgramDashboard = ({ programId, accessType }: ProgramDashboardProps) => {
  return (
    <DashboardWrapper programId={programId} accessType={accessType}>
      <Title text="질문 게시판" />
      <div className="mt-8 flex flex-col gap-8">
        <DashboardWrapper.TeamTab />
        <DashboardWrapper.Board />
        <DashboardWrapper.Input />
      </div>
    </DashboardWrapper>
  );
};

export default ProgramDashboard;

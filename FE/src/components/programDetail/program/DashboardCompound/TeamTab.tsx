import { useContext, useEffect } from "react";
import { DashboardContext } from "./DashboardWrapper";
import Tab from "@/components/common/tabs/Tab";
import { TabOption } from "@/types/tab";
import { TeamInfo } from "@/types/team";

const TeamTab = () => {
  const { teams, isLoading, selectedTeam, setSelectedTeam } =
    useContext(DashboardContext);

  useEffect(() => {
    if (teams && teams.length > 0) {
      setSelectedTeam(teams[0].teamId);
    }
  }, [teams]);

  const teamTabOptions: TabOption<number>[] =
    teams?.map(({ teamId, teamName }: TeamInfo) => ({
      text: teamName,
      type: teamId,
    })) || [];

  const handleTeamSelect = (selected: number) => {
    setSelectedTeam(selected);
  };

  return (
    <div>
      {isLoading && <div>로딩중</div>}
      {teams && teams.length > 0 && (
        <Tab<number>
          selected={selectedTeam}
          baseColor="gray"
          size="md"
          pointColor="navy"
          align="line"
          onItemClick={handleTeamSelect}
          options={teamTabOptions}
        />
      )}
    </div>
  );
};

export default TeamTab;

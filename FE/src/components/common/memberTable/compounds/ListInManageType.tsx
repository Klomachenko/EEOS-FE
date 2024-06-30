import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../ErrorFallback";
import ActiveStatusToggle from "../../toggle/ActiveStatusToggle";
import MemberTableLoader from "../MemberTable.loader";
import { MemberContext } from "../MemberTableWrapper";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";

const ListInManageType = () => {
  const queryClient = useQueryClient();
  const {
    tab: { selectedActive },
  } = useContext(MemberContext);

  const { data: memberList, isLoading } = useGetMemberByActive(selectedActive);
  if (isLoading) return <MemberTableLoader />;

  queryClient.setQueryData(
    ["memberIdList"],
    memberList.map((v) => v.memberId),
  );
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div
          className="grid h-20 w-fit grid-cols-[7rem_7.25rem_1fr_10rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
          key={memberId}
        >
          <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
          <span className="font-bold">{name}</span>
          <div className="flex w-full items-center justify-end">
            <ActiveStatusToggle
              memberId={memberId}
              selectedValue={activeStatus}
            />
          </div>
          <div />
        </div>
      ))}
    </ErrorBoundary>
  );
};

export default ListInManageType;

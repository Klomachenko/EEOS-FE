"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Participant from "../../../programCreate/Participant";
import CreateCategory from "./CreateCategory";
import ProgramTitle from "./ProgramTitle";
import FormBtn from "@/components/common/form/FormBtn";
import ProgramDate from "@/components/common/form/program/ProgramDate";
import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";
import ProgramGithubLinkInput from "@/components/programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "@/components/programCreate/ProgramTeamList";
import FORM_INFO from "@/constants/FORM_INFO";
import { useCreateProgram } from "@/hooks/query/useProgramQuery";
import { useMemberSet } from "@/hooks/useMemberForm";
// import useProgramFormData from "@/hooks/useProgramFormData";
import { ProgramCategory, ProgramType } from "@/types/program";
import { TeamInputInfo } from "@/types/team";
import ROUTES from "@/constants/ROUTES";

export interface ProgramFormDataState {
  title: string;
  deadLine: string;
  // type: ProgramType;
  isDemand: boolean;
  category: ProgramCategory;
  content: string;
  programGithubUrl: string;
  teamList: TeamInputInfo[];
}

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  // type: "notification",
  isDemand: false,
  category: "weekly",
  content: "",
  programGithubUrl: "",
  teamList: [],
};

const CreateForm = () => {
  const router = useRouter();

  // const {
  //   title,
  //   deadLine,
  //   type,
  //   category,
  //   content,
  //   isDemand,
  //   programGithubUrl,
  //   teams,
  //   setTitle,
  //   setDeadLine,
  //   setCategory,
  //   setContent,
  //   setProgramGithubUrl,
  //   setTeams,
  //   reset,
  //   handleChangeType,
  // } = useProgramFormData(initialState);

  const { register, handleSubmit, getValues, reset, watch } =
    useForm<ProgramFormDataState>({
      defaultValues: initialState,
    });

  const { members, updateAllMembers, updateMembers } = useMemberSet();

  const { mutate: createProgramMutate } = useCreateProgram();

  const isDemand = watch("isDemand");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content, deadLine, category, isDemand } = getValues();
    if (!title || !content || !deadLine || !category) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }

    createProgramMutate(
      {
        deadLine,
        content,
        category,
        type: isDemand ? "demand" : "notification",
        programGithubUrl: getValues("programGithubUrl"),
        teams: getValues("teamList"),
        members: Array.from(members, (memberId) => ({ memberId })),
        title: isDemand ? `${FORM_INFO.DEMAND_PREFIX} ${title}` : title,
      },
      {
        onSuccess: (programId) => {
          reset();
          router.replace(ROUTES.ADMIN_DETAIL(programId));
        },
      },
    );
  };

  const handleReset = () => {
    reset();
    router.back();
  };

  // const handleGithubUrlChange = (url: string) => {
  //   setProgramGithubUrl(url);
  // };
  // const handleTeamListChange = (teamList: TeamInputInfo[]) => {
  //   setTeams(teamList);
  // };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <ProgramTitle
        register={register}
        prefix={isDemand && FORM_INFO.DEMAND_PREFIX}
        formType="create"
        isDemand={isDemand}
        // handleChangeDemandType={handleChangeType}
      />
      {/* <div className="flex flex-col items-end gap-8 sm:flex-row"> */}
      {/* <ProgramDate
        programDate={deadLine}
        setProgramDate={(date: string) => setDeadLine(date)}
      />
      <CreateCategory
        selectedCategory={category}
        setCategory={(category: ProgramCategory) => setCategory(category)}
      /> */}
      {/* </div> */}
      {/* <MarkdownEditor
        id={FORM_INFO.PROGRAM.CONTENT.id}
        label={FORM_INFO.PROGRAM.CONTENT.label}
        placeholder={FORM_INFO.PROGRAM.CONTENT.placeholder}
        value={content}
        onChange={(v) => setContent(v)}
      />
      <div className="my-4 flex flex-col gap-4">
        <ProgramGithubLinkInput
          programGithubUrl={programGithubUrl}
          handleGithubUrlChange={handleGithubUrlChange}
        />
        <ProgramTeamList
          selectedTeamList={teams}
          handleTeamListChange={handleTeamListChange}
        />
      </div> */}
      <Participant
        members={members}
        setMembers={updateMembers}
        onClickHeaderCheckBox={updateAllMembers}
      />
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT["create"]}
        formReset={handleReset}
      />
    </form>
  );
};

export default CreateForm;

"use client";

import ErrorFallback from "@/components/common/error/ErrorFallback";

const EditPageError = () => {
  const error = {
    message: "행사 정보를 불러오는 중에 오류가 발생했습니다.",
  };

  return (
    <ErrorFallback
      error={error}
      resetErrorBoundary={() => {
        window.location.reload();
      }}
    />
  );
};
export default EditPageError;

interface NotFount {
  TITLE: string;
  DESCRIPTION: string[];
  BUTTON_TEXT: string;
  IMAGE_URL: string;
}

const NOT_FOUND: NotFount = {
  TITLE: "NOT FOUND",
  DESCRIPTION: [
    "죄송합니다. 페이지를 찾을 수 없습니다.",
    "존재하지 않은 주소를 입력하셨거나,",
    "요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.",
  ],
  BUTTON_TEXT: "홈으로",
  IMAGE_URL: "/saly-run.svg",
};

Object.freeze(NOT_FOUND);
export { NOT_FOUND };

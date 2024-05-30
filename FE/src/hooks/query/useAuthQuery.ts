import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postAdminLogin, postSlackLogin } from "@/apis/auth";
import ERROR_CODE from "@/constants/ERROR_CODE";
import ROUTES from "@/constants/ROUTES";
import {
  deleteTokenInfo,
  setAccessToken,
  setTokenExpiration,
} from "@/utils/authWithStorage";

export const useSlackLoginMutation = () => {
  const router = useRouter();
  return useMutation(
    ["slackLogin"],
    async ({ code, redirect_uri }: { code: string; redirect_uri: string }) => {
      return await postSlackLogin(code, redirect_uri);
    },
    {
      onSuccess: (data) => {
        const { accessToken, accessExpiredTime } = data;
        setAccessToken(accessToken);
        setTokenExpiration(accessExpiredTime);

        router.replace(ROUTES.MAIN);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const errorCode = error?.response?.data?.code;
        errorCode === ERROR_CODE.AUTH.INVALID_NAME &&
          router.replace(ROUTES.NAME_ERROR);
      },
    },
  );
};

export const useAdminLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      postAdminLogin(id, password),
    onSuccess: (data) => {
      const { accessToken, accessExpiredTime } = data;
      setAccessToken(accessToken);
      setTokenExpiration(accessExpiredTime);
      router.replace(ROUTES.ADMIN_MAIN);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorCode = error?.response?.data?.code;
      errorCode === ERROR_CODE.AUTH.INVALID_NAME &&
        router.replace(ROUTES.NAME_ERROR);
    },
  });
};

export const useLogoutMutation = () => {
  return { mutate: deleteTokenInfo };
};

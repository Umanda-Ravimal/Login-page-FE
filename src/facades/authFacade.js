import useAuthStore from "../store/authStore";

const useAuthFacade = () => {
  const isUserValid = useAuthStore((state) => state.isUserValid);
  const setIsUserValid = useAuthStore((state) => state.setIsUserValid);

  return { isUserValid, setIsUserValid };
};

export default useAuthFacade;

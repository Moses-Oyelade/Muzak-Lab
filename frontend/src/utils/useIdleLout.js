import { useEffect } from "react";
import axiosClient from "./axiosClient";

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

let idleTimer;

const resetIdleTimer = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Cancel any pending refresh token requests
    axiosClient.defaults.headers.common.Authorization = null;

    // Redirect to login
    window.location.href = "/login";
  }, IDLE_TIMEOUT);
};

const useIdleLogout = () => {
  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer));

    resetIdleTimer(); // start timer on mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
      clearTimeout(idleTimer);
    };
  }, []);
};

export default useIdleLogout;

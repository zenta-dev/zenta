"use client";

import { useRouter } from "next/navigation";

export const LogoutButton = ({
  handleLogout,
}: {
  handleLogout: () => void;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        handleLogout();
        router.push("/redirect/auth");
      }}
    >
      Logout
    </button>
  );
};

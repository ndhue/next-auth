import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}

      <button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default SettingPage;

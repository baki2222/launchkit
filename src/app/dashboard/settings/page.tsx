import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { ProfileForm } from "./ProfileForm";

export default async function Settings() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Settings</h1>
        <p className="text-sm text-stone-500">Manage your profile.</p>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <ProfileForm name={session.name} email={session.email} />
      </div>
    </div>
  );
}

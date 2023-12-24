import { Navbar } from "../_components/UI/Navbar/Navbar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen min-w-full flex-col ">
      <Navbar />
      {children}
    </main>
  );
};

export default ProfileLayout;

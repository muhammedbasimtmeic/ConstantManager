import AppLogo from "@/components/sidebar/AppLogo";
import SearchBar from "@/components/sidebar/SearchBar";
import SideBarMenu from "@/components/sidebar/SidebarMenu";
import { SignIn } from "@/components/user/LoginButton";
import UserControl from "@/components/user/UserControlButton";
import currentUser from "@/lib/getCurrentUser";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="min-h-full flex flex-col">
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-700 h-[60px] drop-shadow-lg flex items-center justify-between px-2 fixed w-full top-0 z-20">
        <AppLogo />
        <SearchBar />
        {user ? <UserControl /> : <SignIn />}
      </div>
      <div className="flex flex-grow pt-[60px]">
        <div className="hidden md:flex flex-col w-[270px] max-w-xs space-y-8 fixed h-[calc(100vh-60px)] top-[60px] left-0 shadow-md shadow-zinc-400 hover:shadow-zinc-500 z-10 overflow-y-auto">
          <SideBarMenu />
        </div>
        <main className="md:ml-[270px] flex-grow p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

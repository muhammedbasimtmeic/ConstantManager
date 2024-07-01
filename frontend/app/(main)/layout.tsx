import AppLogo from "@/components/sidebar/AppLogo";
import SearchBar from "@/components/sidebar/SearchBar";
import SideBarMenu from "@/components/sidebar/SidebarMenu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-700 h-[60px] drop-shadow-lg flex items-center justify-between px-2 ">
        <AppLogo />
        <SearchBar />
      </div>
      <div className="h-full sticky top-0">
        <div className="hidden md:flex flex-col min-h-screen w-[270px] max-w-xs space-y-8 absolute inset-y-0 shadow-md z-10">
          <SideBarMenu />
        </div>
        <main className="md:pl-[270px] min-h-screen z-0 flex justify-center">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

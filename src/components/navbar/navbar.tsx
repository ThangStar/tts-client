import { CircularProgress, Input, Link, Navbar, NavbarContent, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { ProcessIcon } from "../icons/ProcessIcon";
import RightSidebar from "../sidebar/RightSidebar";
import { useSelector } from "react-redux";
import { tts_response } from "@/types/tts_response.type";
import { VoiceState } from "@/redux/slice/voice.slice";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const [openProcess, setOpenProcess] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // State for RightSidebar
  const { voiceExports }: VoiceState = useSelector((state: any) => state.voice.value)
  const handleToggleProcess = () => {
    setOpenProcess(!openProcess);
    setIsSidebarOpen(!isSidebarOpen); // Toggle RightSidebar visibility
  };

  return (
    <div className="relative flex flex-col flex-1 h-[calc(100vh-12px)] overflow-y-scroll overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Tìm kiếm"
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden cursor-pointer">
            <FeedbackIcon />
          </div>

{/* 
          <Link
            href="https://github.com/ThangStar"
            target={"_blank"}
          >
            <GithubIcon />
          </Link> */}
          
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
          <NavbarContent onClick={handleToggleProcess} className="lg:hidden">
            {voiceExports.some((voice: tts_response) => voice.progress) ? <Spinner color="secondary" className="cursor-pointer" size="md" /> : <p>EXPORT</p>}
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
      <RightSidebar isOpenDrawer={isSidebarOpen} onCloseDrawer={() => setIsSidebarOpen(false)} />
    </div>
  );
};

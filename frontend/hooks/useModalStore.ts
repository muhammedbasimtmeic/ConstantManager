import { create } from "zustand";

export type ModalType =
  | null
  | "userProfile"
  | "addSidebarGroup"
  | "deleteSidebarGroup"
  | "deleteSidebarTable"
  | "editSidebarGroup"
  | "unGroupSidebarTable"
  | "AddSidebarTable"
  | "userLogin";

interface ModalData {
  profile?: UserProfile;
  deleteId?: string;
  unGroupTableId?: number;
  sidebarGroupData?: SidebarGroupEdit;
  sidebarTableData?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));

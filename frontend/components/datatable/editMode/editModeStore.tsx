import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useParams } from "next/navigation";

interface SessionDetails {
  userId: string;
  user: string;
  startTime?: Date;
}

interface BlockedUser {
  userId: string;
  user: string;
  time: Date;
  clientAddress: string;
}

interface EditModeContextProps {
  isEditModeOn: boolean;
  sessionDetails: SessionDetails | null;
  editModeTime: number;
  inactivityTimeout: number;
  currentTableId: string | null;
  isEditModeBlocked: boolean;
  blockedBy: BlockedUser | null;
  onEnableEditMode: (tableId: string) => Promise<void>;
  onDisableEditMode: () => Promise<void>;
  resetInactivityTimer: () => void;
}

const EditModeContext = createContext<EditModeContextProps | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error("useEditMode must be used within an EditModeProvider");
  }
  return context;
};

const EDIT_MODE_TIMEOUT = 60000; // 60 seconds for inactivity timeout

export const EditModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = useCurrentUser();
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [editModeTime, setEditModeTime] = useState(0);
  const [inactivityTimeout, setInactivityTimeout] = useState(EDIT_MODE_TIMEOUT);
  const [inactivityTimerId, setInactivityTimerId] = useState<NodeJS.Timeout | null>(null);
  const [currentTableId, setCurrentTableId] = useState<string | null>(null);
  const [isEditModeBlocked, setIsEditModeBlocked] = useState(false);
  const [blockedBy, setBlockedBy] = useState<BlockedUser | null>(null);

  const params = useParams();

  // Check for active edit mode on the table
  useEffect(() => {
    const getActiveSession = async (tableId: string) => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/table_session/open_session/${tableId}`);
        if (res.status === 200 && res.data) {
          setIsEditModeBlocked(true);
          setBlockedBy({
            userId: res.data.userId,
            user: res.data.user,
            time: new Date(res.data.time),
            clientAddress: res.data.clientAddress,
          });
        }
      } catch (error) {
        console.error("Failed to get active session:", error);
      }
    };

    if (params?.tableId) {
      getActiveSession(params.tableId as string);
    }

    if (user) {
      setSessionDetails({
        userId: user.id,
        user: user.name,
      });
    }
  }, [user, params]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerId) {
      clearTimeout(inactivityTimerId);
    }
    const timerId = setTimeout(() => {
      onDisableEditMode();
      // Optionally show modal here
    }, inactivityTimeout);
    setInactivityTimerId(timerId);
  }, [inactivityTimerId, inactivityTimeout]);

  const onEnableEditMode = useCallback(
    async (tableId: string) => {
      if (isEditModeBlocked) {
        alert("Edit mode is already enabled for this table by another user.");
        return;
      }

      if (sessionDetails) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/table_session/create_session/${tableId}/${sessionDetails.userId}`);
        } catch (error) {
          console.error("Failed to log enable edit mode:", error);
          return;
        }
      }

      if (inactivityTimerId) {
        clearTimeout(inactivityTimerId);
      }

      const timerId = setTimeout(() => {
        onDisableEditMode();
        // Optionally show modal here
      }, inactivityTimeout);

      setInactivityTimerId(timerId);
      setIsEditModeOn(true);
      setEditModeTime(0);
      setCurrentTableId(tableId);
      setIsEditModeBlocked(false);
    },
    [isEditModeBlocked, inactivityTimerId, inactivityTimeout, sessionDetails]
  );

  const onDisableEditMode = useCallback(async () => {
    if (sessionDetails && currentTableId) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/table_session/close_session/${currentTableId}/${sessionDetails.userId}`);
      } catch (error) {
        console.error("Failed to log disable edit mode:", error);
        return;
      }
    }

    if (inactivityTimerId) {
      clearTimeout(inactivityTimerId);
    }

    setIsEditModeOn(false);
    setInactivityTimerId(null);
    setCurrentTableId(null);
    setIsEditModeBlocked(false);
  }, [currentTableId, inactivityTimerId, sessionDetails]);

  useEffect(() => {
    if (isEditModeOn) {
      const interval = setInterval(() => {
        setEditModeTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isEditModeOn]);

  return (
    <EditModeContext.Provider
      value={{
        isEditModeOn,
        sessionDetails,
        editModeTime,
        inactivityTimeout,
        currentTableId,
        isEditModeBlocked,
        blockedBy,
        onEnableEditMode,
        onDisableEditMode,
        resetInactivityTimer,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

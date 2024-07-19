import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

interface TableCommentsProps {
  tableName: string | undefined;
  schemaName: string | undefined;
  dbName: string | undefined;
}

const TableComments = ({ tableName, schemaName, dbName }: TableCommentsProps) => {
  const [comment, setComment] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [initialComment, setInitialComment] = useState("");

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await getTableComment(tableName, schemaName, dbName);
        setComment(data.comment);
        setInitialComment(data.comment);
      } catch (error) {
        console.error("Error loading initial comment:", error);
      }
    };

    if (tableName && schemaName && dbName) {
      fetchComment();
    }
  }, [tableName, schemaName, dbName]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await setTableComment(tableName, schemaName, dbName, comment);
      toast.success("Comment updated successfully");
      setIsEdited(false);
      setInitialComment(comment);
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update comment");
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <Textarea
        className="text-zinc-600 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-96 md:w-full p-1 ps-8 line-clamp-3 tracking-tight disabled:text-zinc-500"
        value={comment}
        placeholder="Table Comment"
        onChange={(e) => {
          setComment(e.target.value);
          if (e.target.value === initialComment) {
            setIsEdited(false);
          } else {
            setIsEdited(true);
          }
        }}
      />
      <Edit className="w-4 h-4 absolute top-2 left-1 text-zinc-600" />
      {isEdited && (
        <Button type="submit" onClick={handleSubmit}>
          Update
        </Button>
      )}
    </div>
  );
};

const getTableComment = async (tableName: string | undefined, schemaName: string | undefined, dbName: string | undefined) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/table/comment`, {
      params: { dbName, schemaName, tableName },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching table comment:", error);
    toast.error("Failed to fetch table comment");
    throw new Error("Failed to fetch table comment");
  }
};

const setTableComment = async (tableName: string | undefined, schemaName: string | undefined, dbName: string | undefined, comment: string) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/table/comment`, {
      comment,
      dbName,
      schemaName,
      tableName,
    });
    return res.data;
  } catch (error) {
    console.error("Error setting table comment:", error);
    toast.error("Failed to set table comment");
    throw new Error("Failed to set table comment");
  }
};

export default TableComments;

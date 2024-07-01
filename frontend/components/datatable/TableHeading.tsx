import ActionTooltip from "../ToolTip";

const TableHeading = ({ title, describtion }: { title: string; describtion?: string | "" }) => (
  <ActionTooltip label={describtion ? (describtion as string) : ""}>
    <span className="text-center font-semibold text-sm px-1">{title}</span>
  </ActionTooltip>
);

export default TableHeading;

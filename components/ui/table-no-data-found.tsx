import { InboxIcon } from 'lucide-react';
import { TableRow, TableCell } from '../ui/table';

export default function TableNoDataFound({
  colSpanValue,
}: {
  colSpanValue: number;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpanValue} className="h-[219px]">
        <div className="flex items-center justify-center h-full gap-2 text-muted-foreground">
          <InboxIcon className="w-6 h-6" />
          <span className="text-lg">No data found</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

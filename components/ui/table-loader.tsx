import { Loader2Icon } from 'lucide-react';
import { TableRow, TableCell } from '../ui/table';

export default function TableLoader({
  colSpanValue,
}: {
  colSpanValue: number;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpanValue} className="h-[219px]">
        <div className="flex items-center justify-center h-full gap-2">
          <Loader2Icon className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

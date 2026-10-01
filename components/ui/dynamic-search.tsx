import { Input } from './input';
import { SearchIcon } from 'lucide-react';

interface DynamicSearchProps {
  search: string;
  setSearch: (search: string) => void;
}
export default function DynamicSearch({
  search,
  setSearch,
}: DynamicSearchProps) {
  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        value={search} // Bind search input to state
        onChange={(e) => setSearch(e.target.value)} // Update search state
        className="pl-8 w-full"
      />
    </div>
  );
}

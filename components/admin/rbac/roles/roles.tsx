'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RoleDataTable from './role-data-table';
import RoleFormDialog from './role-form-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DynamicPagination from '@/components/ui/dynamic-pagination';

import DynamicSearch from '@/components/ui/dynamic-search';
import DynamicSortingDropdownMenu from '@/components/ui/dynamic-sorting-dropdown-menu';
import Links from '../links';

const sortByOptions = [{ value: 'rolename', label: 'Role' }];
export const ITEMS_PER_PAGE = 3;


export default function RoleControls() {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('rolename');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Calculate the current users to display based on pagination
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
  function handleTotalPages(totalUsers: number) {
    const newTotalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
    setTotalPages(newTotalPages);

    // Check if the current page exceeds the total pages
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages); // Move to the last valid page
    }
  }

  return (  <>
   <Links/>
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Roles Management</CardTitle>
            <CardDescription>Manage your roles here.</CardDescription>
          </div>
          <RoleFormDialog
            title="Create Role"
            description="Enter role details"
            btnText="Create"
          >
            <Button>Create Role</Button>
          </RoleFormDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 space-x-8">
          <DynamicSearch search={search} setSearch={setSearch} />
          <DynamicSortingDropdownMenu
            onSortChange={setSortBy}
            onOrderChange={setSortOrder}
            currentSortBy={sortBy}
            currentOrder={sortOrder}
            sortByOptions={sortByOptions}
          />
        </div>
        <RoleDataTable
          search={search}
          sortBy={sortBy}
          sortOrder={sortOrder}
          indexOfLastUser={indexOfLastUser}
          indexOfFirstUser={indexOfFirstUser}
          handleTotalPages={handleTotalPages}
        />
      </CardContent>
      <CardFooter>
        <DynamicPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </CardFooter>
    </Card>
    </>
  );
}

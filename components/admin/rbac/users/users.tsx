'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserDataTable from './user-data-table';
import UserFormDialog from './user-form-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DynamicPagination from '@/components/ui/dynamic-pagination';

import DynamicSearch from '@/components/ui/dynamic-search';
import DynamicSortingDropdownMenu from '@/components/ui/dynamic-sorting-dropdown-menu';

import Links from '../links';


const sortByOptions = [
  { value: 'username', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'role', label: 'Role' },
  { value: 'status', label: 'Status' },
];

export const ITEMS_PER_PAGE = 3;

export default function UserControls() {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('username');
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

  return (
    <>
    <Links/>

    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Users Management</CardTitle>
            <CardDescription>Manage your users here.</CardDescription>
          </div>
          <UserFormDialog
            title="Create User"
            description="Enter user details"
            btnText="Create"
          >
            <Button>Create User</Button>
          </UserFormDialog>
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
        <UserDataTable
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

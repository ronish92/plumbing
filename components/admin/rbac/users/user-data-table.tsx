'use client';
import { Loader2Icon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { getAllUsers, getUserById, deleteUser } from '@/actions/users/users';
import type { AxiosError } from 'axios';
import type { User, Users } from '@/models/users';
import TableLoader from '@/components/ui/table-loader';
import TableNoDataFound from '@/components/ui/table-no-data-found';
import UserFormDialog from './user-form-dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserDataTableProps {
  search: string;
  sortBy: string;
  sortOrder: string;
  indexOfLastUser: number;
  indexOfFirstUser: number;
  handleTotalPages?: (totalUsers: number) => void;
}

type SortableFields = 'username' | 'email' | 'role' | 'status';
export default function UserDataTable({
  search,
  sortBy,
  sortOrder,
  indexOfLastUser,
  indexOfFirstUser,
  handleTotalPages,
}: UserDataTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserDataLoading } = useQuery<
    User,
    AxiosError
  >({
    queryKey: ['get-user-by-id', selectedUserId],
    queryFn: async () => await getUserById(selectedUserId as string),
    enabled: !!selectedUserId,
  });

  const { data: usersData, isLoading: isUsersDataLoading } = useQuery<
    Users,
    AxiosError
  >({
    queryKey: ['get-all-users'],
    queryFn: async () => await getAllUsers(),
  });

  const { mutate: deleteUserMutate, isPending: isDeleteUserMutatePending } =
    useMutation({
      mutationKey: ['delete-user'],
      mutationFn: async (id: string) => await deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-all-users'] });
        toast.success('User Deleted Successfully');
        setSelectedUserId(null);
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message);
      },
    });

  function handleDeleteUser(id: string) {
    setSelectedUserId(id);
    deleteUserMutate(id);
  }

 const filteredUsersData = usersData
  ? usersData.filter((user) =>
      [user.username, user.email, user.role, user.status]
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    )
  : [];

  const sortedUsersData =
    filteredUsersData &&
    filteredUsersData?.length > 0 &&
    filteredUsersData?.sort((a: User, b: User) => {
      const aValue = a[sortBy as SortableFields]?.toLowerCase();
      const bValue = b[sortBy as SortableFields]?.toLowerCase();

      if (aValue === undefined || bValue === undefined) return 0; // Check if the value is defined

      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue); // Sort based on order
    });

  const currentUsers =
    sortedUsersData &&
    sortedUsersData.length > 0 &&
    sortedUsersData?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (handleTotalPages && sortedUsersData && sortedUsersData.length > 0)
      handleTotalPages(sortedUsersData?.length);
  }, [sortedUsersData, handleTotalPages]);

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentUsers &&
          currentUsers?.length > 0 &&
          currentUsers?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === 'Active' ? 'secondary' : 'outline'}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <UserFormDialog
                  title="Edit User"
                  description="Edit user details"
                  btnText="Update"
                  isEdit={true}
                  id={user.id}
                  isUserDataLoading={isUserDataLoading}
                  userData={userData as User}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedUserId(user.id as string)}
                  >
                    {!isDeleteUserMutatePending &&
                    isUserDataLoading &&
                    user.id === selectedUserId ? (
                      <Loader2Icon className="animate-spin w-4 h-4" />
                    ) : (
                      <PencilIcon />
                    )}
                  </Button>
                </UserFormDialog>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteUser(user.id as string)}
                >
                  {isDeleteUserMutatePending && user.id === selectedUserId ? (
                    <Loader2Icon className="animate-spin w-4 h-4" />
                  ) : (
                    <Trash2Icon />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        {isUsersDataLoading && <TableLoader colSpanValue={5} />}
        {!isUsersDataLoading && !currentUsers && (
          <TableNoDataFound colSpanValue={5} />
        )}
      </TableBody>
    </Table>
  );
}

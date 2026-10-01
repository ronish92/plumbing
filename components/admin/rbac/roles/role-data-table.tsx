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
import { deleteRole, getAllRoles, getRoleById } from '@/actions/users/users';
import type { AxiosError } from 'axios';
import type { Role, Roles } from '@/models/users';
import TableLoader from '@/components/ui/table-loader';
import TableNoDataFound from '@/components/ui/table-no-data-found';
import RoleFormDialog from './role-form-dialog';
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

type SortableFields = 'rolename';
export default function RoleDataTable({
  search,
  sortBy,
  sortOrder,
  indexOfLastUser,
  indexOfFirstUser,
  handleTotalPages,
}: UserDataTableProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: roleData, isLoading: isRoleDataLoading } = useQuery<
    Role,
    AxiosError
  >({
    queryKey: ['get-role-by-id', selectedRoleId],
    queryFn: async () => await getRoleById(selectedRoleId as string),
    enabled: !!selectedRoleId,
  });

  const { data: rolesData, isLoading: isRolesDataLoading } = useQuery<
    Roles,
    AxiosError
  >({
    queryKey: ['get-all-roles'],
    queryFn: async () => await getAllRoles(),
  });

  const { mutate: deleteRoleMutate, isPending: isDeleteRoleMutatePending } =
    useMutation({
      mutationKey: ['delete-role'],
      mutationFn: async (id: string) => await deleteRole(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-all-roles'] });
        toast.success('Role Deleted Successfully');
        setSelectedRoleId(null);
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message);
      },
    });

  function handleDeleteUser(id: string) {
    setSelectedRoleId(id);
    deleteRoleMutate(id);
  }

  const filteredRolesData =
    rolesData &&
    rolesData?.length > 0 &&
    rolesData.filter((role) =>
      role.rolename.toLowerCase().includes(search.toLowerCase())
    );

  const sortedRolesData =
    filteredRolesData &&
    filteredRolesData?.length > 0 &&
    filteredRolesData?.sort((a: Role, b: Role) => {
      const aValue = a[sortBy as SortableFields]?.toLowerCase();
      const bValue = b[sortBy as SortableFields]?.toLowerCase();

      if (aValue === undefined || bValue === undefined) return 0; // Check if the value is defined

      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue); // Sort based on order
    });

  const currentRoles =
    sortedRolesData &&
    sortedRolesData.length > 0 &&
    sortedRolesData?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (handleTotalPages && sortedRolesData && sortedRolesData.length > 0)
      handleTotalPages(sortedRolesData?.length);
  }, [sortedRolesData, handleTotalPages]);

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentRoles &&
          currentRoles?.length > 0 &&
          currentRoles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.rolename}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary">
                      {permission.toLocaleLowerCase()}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <RoleFormDialog
                  title="Edit Role"
                
                  btnText="Update"
                  isEdit={true}
                  id={role.id}
                  isRoleDataLoading={isRoleDataLoading}
                  roleData={roleData as Role}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRoleId(role.id as string)}
                  >
                    {!isDeleteRoleMutatePending &&
                    isRoleDataLoading &&
                    role.id === selectedRoleId ? (
                      <Loader2Icon className="animate-spin w-4 h-4" />
                    ) : (
                      <PencilIcon />
                    )}
                  </Button>
                </RoleFormDialog>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteUser(role.id as string)}
                >
                  {isDeleteRoleMutatePending && role.id === selectedRoleId ? (
                    <Loader2Icon className="animate-spin w-4 h-4" />
                  ) : (
                    <Trash2Icon />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        {isRolesDataLoading && <TableLoader colSpanValue={5} />}
        {!isRolesDataLoading && !currentRoles && (
          <TableNoDataFound colSpanValue={5} />
        )}
      </TableBody>
    </Table>
  );
}

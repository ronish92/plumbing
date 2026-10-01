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
import {
  deletePermission,
  getAllPermissions,
  getPermissionById,
} from '@/actions/users/users';
import type { AxiosError } from 'axios';
import type { Permission, Permissions } from '@/models/users';
import TableLoader from '@/components/ui/table-loader';
import TableNoDataFound from '@/components/ui/table-no-data-found';
import RoleFormDialog from './permission-form-dialog';
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

type SortableFields = 'permissionname';
export default function PermissionDataTable({
  search,
  sortBy,
  sortOrder,
  indexOfLastUser,
  indexOfFirstUser,
  handleTotalPages,
}: UserDataTableProps) {
  const [selectedPermissionId, setSelectedPermissionId] = useState<
    string | null
  >(null);

  const queryClient = useQueryClient();

  const { data: permissionData, isLoading: isPermissionDataLoading } = useQuery<
    Permission,
    AxiosError
  >({
    queryKey: ['get-permission-by-id', selectedPermissionId],
    queryFn: async () =>
      await getPermissionById(selectedPermissionId as string),
    enabled: !!selectedPermissionId,
  });

  const { data: permissionsData, isLoading: isPermissionsDataLoading } =
    useQuery<Permissions, AxiosError>({
      queryKey: ['get-all-permissions'],
      queryFn: async () => await getAllPermissions(),
    });

  const {
    mutate: deletePermissionMutate,
    isPending: isDeletePermissionMutatePending,
  } = useMutation({
    mutationKey: ['delete-permission'],
    mutationFn: async (id: string) => await deletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-permissions'] });
      toast.success('Permission Deleted Successfully');
      setSelectedPermissionId(null);
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message);
    },
  });

  function handleDeleteUser(id: string) {
    setSelectedPermissionId(id);
    deletePermissionMutate(id);
  }

  const permissionsArray = Array.isArray(permissionsData)
  ? permissionsData
  : (permissionsData as any)?.data || (permissionsData as any)?.permissions || [];

  const filteredPermissionsData = permissionsArray.filter((role: any) =>
  role?.permissionname?.toLowerCase().includes(search.toLowerCase())
);

  const sortedPermissionsData =
    filteredPermissionsData &&
    filteredPermissionsData?.length > 0 &&
    filteredPermissionsData?.sort((a: Permission, b: Permission) => {
      const aValue = a[sortBy as SortableFields]?.toLowerCase();
      const bValue = b[sortBy as SortableFields]?.toLowerCase();

      if (aValue === undefined || bValue === undefined) return 0; // Check if the value is defined

      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue); // Sort based on order
    });

  const currentPermissions =
    sortedPermissionsData &&
    sortedPermissionsData.length > 0 &&
    sortedPermissionsData?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (
      handleTotalPages &&
      sortedPermissionsData &&
      sortedPermissionsData.length > 0
    )
      handleTotalPages(sortedPermissionsData?.length);
  }, [sortedPermissionsData, handleTotalPages]);

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Permission</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentPermissions &&
          currentPermissions?.length > 0 &&
          currentPermissions?.map((permission:Permission) => (
            <TableRow key={permission.id}>
              <TableCell className="font-medium">
                {permission.permissionname}
              </TableCell>
              <TableCell>{permission.description}</TableCell>

              <TableCell className="flex items-center justify-end gap-2">
                <RoleFormDialog
                  title="Edit Permission"
                  description="Edit permission details"
                  btnText="Update"
                  isEdit={true}
                  id={permission.id}
                  isPermissionDataLoading={isPermissionDataLoading}
                  permissionData={permissionData as Permission}
                >
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSelectedPermissionId(permission.id as string)
                    }
                  >
                    {!isDeletePermissionMutatePending &&
                    isPermissionDataLoading &&
                    permission.id === selectedPermissionId ? (
                      <Loader2Icon className="animate-spin w-4 h-4" />
                    ) : (
                      <PencilIcon />
                    )}
                  </Button>
                </RoleFormDialog>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteUser(permission.id as string)}
                >
                  {isDeletePermissionMutatePending &&
                  permission.id === selectedPermissionId ? (
                    <Loader2Icon className="animate-spin w-4 h-4" />
                  ) : (
                    <Trash2Icon />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        {isPermissionsDataLoading && <TableLoader colSpanValue={5} />}
        {!isPermissionsDataLoading &&  (!currentPermissions || currentPermissions.length === 0) && (
          <TableNoDataFound colSpanValue={5} />
        )}
      </TableBody>
    </Table>
  );
}

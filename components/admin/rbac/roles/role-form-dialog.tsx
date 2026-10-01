'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRole, getAllPermissions, updateRoleDetails } from '@/actions/users/users';
import { Loader2Icon } from 'lucide-react';
import type { AxiosError } from 'axios';
import type { Permissions, Role } from '@/models/users';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  rolename: z
    .string({ required_error: 'Role name is required' })
    .min(1)
    .max(50),
  description: z.string({ required_error: 'Description is required' }).min(1),
  permissions: z.array(z.string()).nonempty('Please at least one permission'),
});

interface UserFormDialogProps {
  title: string;
  description?: string;
  btnText: string;
  isEdit?: boolean;
  id?: string;
  isRoleDataLoading?: boolean;
  roleData?: Role;
  children: React.ReactNode;
}
export default function RoleFormDialog({
  title,
  description,
  btnText,
  isEdit = false,
  id,
  isRoleDataLoading = false,
  roleData,
  children,
}: UserFormDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: ['read', 'write', 'update', 'delete'],
    },
  });

  const { data: permissionsData, isLoading: isPermissionsDataLoading } =
    useQuery<Permissions, AxiosError>({
      queryKey: ['get-all-permissions'],
      queryFn: async () => await getAllPermissions(),
    });

  const { mutate: createRoleMutate, isPending: isCreateRoleMutatePending } =
    useMutation({
      mutationKey: ['create-role'],
      mutationFn: async (data: z.infer<typeof formSchema>) =>
        await createRole(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-all-roles'] });
        setIsDialogOpen(false);
        toast.success('Role Created Successfully');
        form.reset();
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message);
      },
    });

  const {
    mutate: UpdateRoleDetailsMutate,
    isPending: isUpdateRoleDetailsMutatePending,
  } = useMutation({
    mutationKey: ['update-role-details'],
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      await updateRoleDetails({ ...data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-roles'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-role-by-id'],
      });
      setIsDialogOpen(false);
      toast.success('Role Updated Successfully');
      form.reset();
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (roleData) {
      form.reset(roleData);
    }
  }, [roleData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit) UpdateRoleDetailsMutate(values);
    else createRoleMutate(values);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {!isRoleDataLoading && (
        <DialogContent >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto "
              >
                <FormField
                 
                  control={form.control}
                  name="rolename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Admin"
                          type="text"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
              
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <div className="border-t pt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Full access to all features"
                          className="resize-none"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                   
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

               <div className="border-t pt-6">
                <FormField
  control={form.control}
  name="permissions"
  render={({ field }) => (
    <FormItem>
      <div className="mb-3">
        <FormLabel className="text-sm font-semibold">
          Permissions
        </FormLabel>

        <p className="mt-1 text-xs text-muted-foreground">
          Select the permissions this role should have access to.
        </p>
      </div>

      <FormControl>
        <MultiSelector
          values={field.value}
          onValuesChange={field.onChange}
          loop
          className="w-full"
        >
          <MultiSelectorTrigger className="min-h-11 rounded-lg border bg-background px-3 py-2">
            <MultiSelectorInput
              placeholder={
                field.value?.length
                  ? "Add another permission..."
                  : "Select permissions..."
              }
            />
          </MultiSelectorTrigger>

          <MultiSelectorContent
            className="z-[100] w-[var(--radix-popover-trigger-width)]"
          >
            <MultiSelectorList className="max-h-64 overflow-y-auto">
              {isPermissionsDataLoading && (
                <MultiSelectorItem
                  value="Loading..."
                  disabled
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Loading permissions...
                </MultiSelectorItem>
              )}

              {!isPermissionsDataLoading &&
                permissionsData?.length === 0 && (
                  <MultiSelectorItem
                    value="No permissions found"
                    disabled
                    className="justify-center"
                  >
                    No permissions found
                  </MultiSelectorItem>
                )}

              {!isPermissionsDataLoading &&
                permissionsData?.map((permission) => (
                  <MultiSelectorItem
                    value={permission.permissionname}
                    key={permission.id}
                    className="cursor-pointer"
                  >
                    {permission.permissionname}
                  </MultiSelectorItem>
                ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>
              </div>
            
          
                <div className="flex items-center justify-end gap-3 border-t bg-muted/20 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={
                isCreateRoleMutatePending ||
                isUpdateRoleDetailsMutatePending
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isCreateRoleMutatePending ||
                isUpdateRoleDetailsMutatePending
              }
            >
              {isCreateRoleMutatePending ||
              isUpdateRoleDetailsMutatePending ? (
                <span className="flex items-center gap-2">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  {btnText}ing...
                </span>
              ) : (
                btnText
              )}
            </Button>
          </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

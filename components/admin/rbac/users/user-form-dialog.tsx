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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getAllRoles, updateUserDetails } from '@/actions/users/users';
import { Loader2Icon } from 'lucide-react';
import type { AxiosError } from 'axios';
import type { Roles, User } from '@/models/users';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  username: z.string().min(1).max(50),
  email: z.string(),
  role: z.string(),
  status: z.string(),
});

interface UserFormDialogProps {
  title: string;
  description: string;
  btnText: string;
  isEdit?: boolean;
  id?: string;
  isUserDataLoading?: boolean;
  userData?: User;
  children: React.ReactNode;
}
export default function UserFormDialog({
  title,
  description,
  btnText,
  isEdit = false,
  id,
  isUserDataLoading = false,
  userData,
  children,
}: UserFormDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data: rolesData, isLoading: isRolesDataLoading } = useQuery<
    Roles,
    AxiosError
  >({
    queryKey: ['get-all-roles'],
    queryFn: async () => await getAllRoles(),
  });

  const { mutate: createUserMutate, isPending: isCreateUserMutatePending } =
    useMutation({
      mutationKey: ['create-user'],
      mutationFn: async (data: z.infer<typeof formSchema>) =>
        await createUser(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get-all-users'] });
        setIsDialogOpen(false);
        toast.success('User Added Successfully');
        form.reset();
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message);
      },
    });

  const {
    mutate: UpdateUserDetailsMutate,
    isPending: isUpdateUserDetailsMutatePending,
  } = useMutation({
    mutationKey: ['update-user-details'],
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      await updateUserDetails({ ...data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-user-by-id'],
      });
      setIsDialogOpen(false);
      toast.success('User Updated Successfully');
      form.reset();
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit) UpdateUserDetailsMutate(values);
    else createUserMutate(values);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {!isUserDataLoading && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto grid grid-cols-2 gap-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="krishna"
                          type="text"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>Name of the user</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="krishna@gmail.com"
                          type="email"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>Email of the user</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Admin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rolesData &&
                            rolesData?.length > 0 &&
                            rolesData?.map((role) => (
                              <SelectItem value={role.rolename} key={role.id}>
                                {role.rolename}
                              </SelectItem>
                            ))}
                          {rolesData && rolesData?.length === 0 && (
                            <SelectItem
                              value="No roles found"
                              disabled
                              className="flex items-center justify-center -ml-4"
                            >
                              No roles found
                            </SelectItem>
                          )}
                          {isRolesDataLoading && (
                            <SelectItem
                              value="Loading..."
                              disabled
                              className="flex items-center justify-center -ml-4"
                            >
                              <Loader2Icon className="animate-spin w-4 h-4" />
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select role of the user</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Active" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the status of user
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="col-span-2" type="submit">
                  {isCreateUserMutatePending ||
                  isUpdateUserDetailsMutatePending ? (
                    <div className="flex items-center gap-2 ">
                      <Loader2Icon className="animate-spin w-4 h-4" />{' '}
                      <span>{`${btnText}ing...`}</span>
                    </div>
                  ) : (
                    btnText
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

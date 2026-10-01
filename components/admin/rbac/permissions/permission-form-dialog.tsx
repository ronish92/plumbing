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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPermission, updatePermissionDetails } from '@/actions/users/users';
import { Loader2Icon } from 'lucide-react';
import type { AxiosError } from 'axios';
import type { Permission } from '@/models/users';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  permissionname: z
    .string({ required_error: 'Permission name is required' })
    .min(1)
    .max(50),
  description: z.string({ required_error: 'Description is required' }).min(1),
});

interface PermissionFormDialogProps {
  title: string;
  description: string;
  btnText: string;
  isEdit?: boolean;
  id?: string;
  isPermissionDataLoading?: boolean;
  permissionData?: Permission;
  children: React.ReactNode;
}
export default function PermissionFormDialog({
  title,
  description,
  btnText,
  isEdit = false,
  id,
  isPermissionDataLoading = false,
  permissionData,
  children,
}: PermissionFormDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    mutate: createPermissionMutate,
    isPending: isCreatePermissionMutatePending,
  } = useMutation({
    mutationKey: ['create-permission'],
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      await createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-permissions'] });
      setIsDialogOpen(false);
      toast.success('Permission Created Successfully');
      form.reset();
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message);
    },
  });

  const {
    mutate: UpdatePermissionDetailsMutate,
    isPending: isUpdatePermissionDetailsMutatePending,
  } = useMutation({
    mutationKey: ['update-permission-details'],
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      await updatePermissionDetails({ ...data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-permissions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-permission-by-id'],
      });
      setIsDialogOpen(false);
      toast.success('Permission Updated Successfully');
      form.reset();
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (permissionData) {
      form.reset(permissionData);
    }
  }, [permissionData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit) UpdatePermissionDetailsMutate(values);
    else createPermissionMutate(values);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {!isPermissionDataLoading && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto grid grid-cols-1 gap-6"
              >
                <FormField
                  control={form.control}
                  name="permissionname"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Permission Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Read"
                          type="text"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>Name of the permission</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Can view (content, features, resources etc)"
                          className="resize-none"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Description of the permission
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="col-span-2" type="submit">
                  {isCreatePermissionMutatePending ||
                  isUpdatePermissionDetailsMutatePending ? (
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

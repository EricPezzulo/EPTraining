"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface formProps {
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  usernameInputLabel: string;
  passwordInputLabel: string;
  formDescription?: string;
  buttonLabel?: string;
}

export function SignInForm({
  usernamePlaceholder,
  passwordPlaceholder,
  usernameInputLabel,
  passwordInputLabel,
  formDescription,
  buttonLabel,
}: formProps) {
  // 1. define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{usernameInputLabel}</FormLabel>
              <FormControl>
                <Input placeholder={usernamePlaceholder} {...field} />
              </FormControl>
              <FormLabel>{passwordInputLabel}</FormLabel>
              <FormControl>
                <Input placeholder={passwordPlaceholder} {...field} />
              </FormControl>

              <FormDescription>{formDescription}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
}

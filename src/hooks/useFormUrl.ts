import { useRouter } from "next/router";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export const useFormUrl = <FieldValues extends Record<string, any>>(formMethods: UseFormReturn<FieldValues>) => {
  const { watch } = formMethods;
  
  const router = useRouter();

  const formState = watch();

  useEffect(() => {
    if (URLSearchParams) {
      router.replace('', { search: new URLSearchParams(formState).toString() });
    }
  }, [formState]);
}
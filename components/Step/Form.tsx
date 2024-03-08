import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    fid: z.number(),
    phrase: z.string().optional(),
});

const FormComponent = ({ isPhrase, setIsPhrase, setFid }: { isPhrase: Boolean, setIsPhrase: Dispatch<SetStateAction<Boolean>>, setFid: Dispatch<SetStateAction<Number>> }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values);
    }
    return (
        <div className="border-2 p-8 rounded-md">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="fid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>FID</FormLabel>
                                <FormControl>
                                    <Input placeholder="2483" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your Farcaster FID.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isPhrase && <FormField
                        control={form.control}
                        name="phrase"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login Seed Phrase</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="boy clay circle ..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your new Farcaster Login Phrase.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                    <div className="flex justify-center items-center">
                        <Checkbox className="mx-1" onCheckedChange={(e) => {
                            setIsPhrase(Boolean(e))
                        }} /> Use your own Seed Phrase?
                    </div>
                    <Button type="submit">Next</Button>
                </form>
            </Form>
        </div>
    );
};

export default FormComponent;

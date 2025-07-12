import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Write someting to title",
    }),
    content: z.string().min(1, {
        message: "Write someting to content",
    }),
})

const Create = () => {
    const [isSaving, setIsSaving] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    const navigate = useNavigate()

    const createNote = async (values: z.infer<typeof formSchema>) => {
        setIsSaving(true)
        try {
            await api.post("/notes", {
                title: values.title,
                content: values.content
            })
            form.reset()
            toast.success("Note created successfully!")
            navigate("/")
        } catch (error) {
            toast.error("Failed to create note. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }
    return (
        <div className={`w-full h-full flex items-center justify-center ${isSaving && "opacity-50 pointer-events-none"}`}>
            <Card className="w-1/2 bg-secondary-background">
                <header className="py-5">
                    <div className="max-container flex justify-between">
                        <Button asChild variant="neutral">
                            <Link to=".." >
                                <ArrowLeft />
                                <span>Cancel</span>
                            </Link>
                        </Button>
                        <Button onClick={form.handleSubmit(createNote)}>
                            <Save />
                            <span>Create</span>
                        </Button>
                    </div>
                </header>
                <main>
                    <div className="max-container">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(createNote)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="My new note" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Some content" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                </main>
            </Card>
        </div>
    )
}

export default Create
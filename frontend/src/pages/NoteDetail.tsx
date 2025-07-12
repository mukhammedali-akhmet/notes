import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'

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
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { Note } from '@/types'
import api from '@/lib/axios'

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Write someting to title",
    }),
    content: z.string().min(1, {
        message: "Write someting to content",
    }),
})

const NoteDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    const updateNote = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            await api.put(`/notes/${id}`, {
                title: values.title,
                content: values.content
            })
            form.reset()
            toast.success("Note updated successfully!")
            navigate("/")
        } catch (error) {
            toast.error("Failed to update note. Please try again.")
            console.log(error as string)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const getCurrentNote = async () => {
            try {
                setIsLoading(true);
                const res = await api.get(`/notes/${id}`)
                setCurrentNote(res.data)
                form.setValue("title", res.data.title)
                form.setValue("content", res.data.content)
            } catch (error) {
                toast.error("Failed to fetch note. Please try again.")
                console.log(error as string)
            } finally {
                setIsLoading(false);
            }
        }

        getCurrentNote()
    }, []);

    useEffect(() => {
        if (currentNote?.title === form.watch("title") && currentNote?.content === form.watch("content")) {
            setIsChanged(false)
        } else {
            setIsChanged(true)
        }
    }, [form.watch()])
    return (
        <div className={`w-full h-full flex items-center justify-center ${isLoading && "opacity-50 pointer-events-none"}`}>
            <Card className="w-1/2 bg-secondary-background">
                <header className="py-5">
                    <div className="max-container flex justify-between">
                        <Button asChild variant="neutral">
                            <Link to=".." >
                                <ArrowLeft />
                                <span>Cancel</span>
                            </Link>
                        </Button>
                        <Button disabled={!isChanged} onClick={form.handleSubmit(updateNote)}>
                            <Save />
                            <span>Save</span>
                        </Button>
                    </div>
                </header>
                <main>
                    <div className="max-container">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(updateNote)} className="space-y-8">
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

export default NoteDetail
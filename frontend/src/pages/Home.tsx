import Header from '@/components/Header'
import NoteCard from '@/components/NoteCard'
import NoteSkeleton from '@/components/NoteSkeleton'
import RateLimit from '@/components/RateLimit'
import api from '@/lib/axios'
import type { Note } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Home = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRateLimit, setIsRateLimit] = useState(false)

    useEffect(() => {
        const getAllNotes = async () => {
            try {
                setIsLoading(true);
                const res = await api.get("/notes");
                setNotes(res.data);
                setIsRateLimit(false)
            } catch (error) {
                if (axios.isAxiosError(error) && error.response && error.response.status === 429) {
                    setIsRateLimit(true);
                    toast.error("Rate limit exceeded. Please try again later.");
                } else {
                    toast.error(error as string);
                }
            } finally {
                setIsLoading(false);

            }
        }

        getAllNotes()
    }, [])
    return (
        <>
            <Header />
            <main className="mt-16 py-10">
                <div className="max-container flex flex-col gap-5">
                    <h1 className="text-4xl font-bold">All Notes</h1>
                    <ul className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, idx) => (
                                <li key={idx}>
                                    <NoteSkeleton />
                                </li>
                            ))
                        ) : (
                            notes.map((note) =>
                                <li key={note._id}>
                                    <NoteCard _id={note._id} title={note.title} content={note.content} createdAt={note.createdAt} updatedAt={note.updatedAt} />
                                </li>

                            )
                        )}
                    </ul>
                    {isRateLimit && <RateLimit />}
                </div>
            </main>
        </>
    )
}

export default Home
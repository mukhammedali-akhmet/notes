import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { Note } from '@/types'
import { formatDate } from '@/lib/utils'
import { Link } from 'react-router'

const NoteCard = ({ _id, title, content, createdAt, updatedAt }: Note) => {

    return (
        <Link to={`/note/${_id}`}>
            <Card className="bg-secondary-background hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
                <CardHeader>
                    <CardTitle className="line-clamp-1 h-4.5">{title}</CardTitle>
                    <CardDescription className="line-clamp-1 font-normal text-sm text-neutral-600">
                        {content}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <p className="text-xs text-neutral-600">
                        {createdAt && formatDate(updatedAt as string)}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default NoteCard
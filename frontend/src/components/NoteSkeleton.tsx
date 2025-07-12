import { Card, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const NoteSkeleton = () => {
    return (
        <Card className="bg-secondary-background opacity-50">
            <CardHeader>
                <Skeleton className='h-3 w-1/3' />
                <Skeleton className='h-5 w-full' />
            </CardHeader>
            <CardFooter>
                <Skeleton className='h-3 w-full' />
            </CardFooter>
        </Card>
    )
}

export default NoteSkeleton
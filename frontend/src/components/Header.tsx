import { Link } from "react-router"
import { Button } from "./ui/button"
import { LucideGithub, Plus } from "lucide-react"

const Header = () => {
    return (
        <header className="pt-3 pb-4 fixed top-0 left-0 right-0 border-border border-b-4 bg-secondary-background">
            <div className="max-container flex items-center justify-between">
                <Button asChild variant="reverse">
                    <Link to="/" className="flex items-center gap-2">
                        <img className="h-4 md:h-5" src="/notes-logo.svg" />
                        <span className="md:text-lg font-semibold">Notes</span>
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <Link to="/create">
                        <Button>
                            <Plus />
                            Create
                        </Button>
                    </Link>
                    <Button variant="neutral" size="icon" asChild>
                        <Link to="">

                            <LucideGithub />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
const RateLimit = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <img className="w-1/3" src="/opps.svg" alt="Rate Limit image" />
            <span className="font-semibold text-2xl">Too many requests. Try again later...</span>
        </div>
    )
}

export default RateLimit
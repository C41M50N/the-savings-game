
type Contribution = {
    amount: number,
    timestamp: Date
}
export { type Contribution }

type Objective = {
    id: number
    title: string
    image: string
    currentAmount: number
    goalAmount: number,
    contributions: Contribution[]
}
export { type Objective }

type FeedEntry = {
    user: string
    feedMessage: string
}

export { type FeedEntry }
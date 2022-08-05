
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
    goalAmount: number
    contributions: Contribution[]
}
export { type Objective }

type FeedEntry = {
    id: number
    user: string
    feedMessage: string
}

export { type FeedEntry }

type User = {
    name: string
    avatar: string
    objectives: Objective[]
}

export { type User }
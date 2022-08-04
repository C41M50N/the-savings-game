
import { FeedEntry, Objective, User } from "./types";

const mockObjectives: Objective[] = [
    {
        id: 1,
        title: 'New Bike',
        image: '',
        currentAmount: 30,
        goalAmount: 200,
        contributions: [
            {
                amount: 30,
                timestamp: new Date()
            }
        ]
    },
    {
        id: 2,
        title: 'New Car',
        image: '',
        currentAmount: 20_903.0,
        goalAmount: 30_000.0,
        contributions: [
            {
                amount: 2_000.0,
                timestamp: new Date()
            },
            {
                amount: 10_000.0,
                timestamp: new Date()
            },
            {
                amount: 8_903.0,
                timestamp: new Date()
            }
        ]
    },
    {
        id: 3,
        title: 'New Puppy',
        image: '',
        currentAmount: 4_900.0,
        goalAmount: 5_000.0,
        contributions: [
            {
                amount: 1_000.0,
                timestamp: new Date()
            },
            {
                amount: 3_000.0,
                timestamp: new Date()
            },
            {
                amount: 900.0,
                timestamp: new Date()
            }
        ]
    }
]

const mockFeed: FeedEntry[] = [
    {
        user: "John Smith",
        feedMessage: "Achieved 25% for the new bike objective."
    },
    {
        user: "Jane Smith",
        feedMessage: "Achieved 90% for the new baking kit objective. Almost there!"
    }
]

const mockUser: User = {
    name: "John Smith",
    avatar: "https://play-lh.googleusercontent.com/XVHP0sBKrRJYZq_dB1RalwSmx5TcYYRRfYMFO18jgNAnxHAIA1osxM55XHYTb3LpkV8",
    objectives: mockObjectives
}

export { mockObjectives, mockFeed, mockUser }
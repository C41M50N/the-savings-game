
import { FeedEntry, Objective } from "./types";

const mockObjectives: Objective[] = [
    {
        id: 1,
        title: 'New Bike',
        image: 'https://ep1.pinkbike.org/p5pb13009341/p5pb13009341.jpg',
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
        image: 'https://www.supercars.net/blog/wp-content/uploads/2016/01/Screenshot-2016-01-07-09.42.09.png',
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
        image: 'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F013%2F564%2Fdoge.jpg',
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

export { mockObjectives, mockFeed }
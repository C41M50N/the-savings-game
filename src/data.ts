
import { FeedEntry, Objective, User } from "./types";

// note month in date is indexed from 0, 8 -> Sept etc.
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
                timestamp: new Date(2020, 8, 3)
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
                timestamp: new Date(2020, 8, 3)
            },
            {
                amount: 3_000.0,
                timestamp: new Date()
            },
            {
                amount: 900.0,
                timestamp: new Date(2022, 11, 3)
            }
        ]
    },
    {
        id: 4,
        title: 'New Laptop',
        image: 'https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/intro__ewz1ro7xs14y_large.jpg',
        currentAmount: 550.00,
        goalAmount: 4_899.00,
        contributions: [
            {
                amount: 200.00,
                timestamp: new Date()
            },
            {
                amount: 350.00,
                timestamp: new Date()
            }
        ]
    },
    {
        id: 5,
        title: 'Paris Trip',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
        currentAmount: 1_700.00,
        goalAmount: 8_200.00,
        contributions: [
            {
                amount: 1_000.00,
                timestamp: new Date()
            },
            {
                amount: 700.00,
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

import { Objective } from "./types";

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

export { mockObjectives }

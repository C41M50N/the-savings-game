
import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Grid, Stack, Button, Collapse, Avatar, Divider, Progress } from '@mantine/core'
import { CaretLeft, CaretDown, UserCircle } from 'tabler-icons-react'
import { User, Objective } from '../types'
import '../app.css'

type Props = {
	user: User
    addedObjectiveCount: number
}

const Profile = ({ user, addedObjectiveCount }: Props) => {
    const [objectives, setObjectives] = useState(addedObjectiveCount);
    const [opened, setOpened] = useState(true);
    var totalCurrentAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.currentAmount, 0);
    var totalGoalAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.goalAmount, 0);
    var overallProgressPercent = Number.parseFloat((totalCurrentAmount / totalGoalAmount * 100).toFixed(0));
    var totalContributionCount = user.objectives.reduce((total, currentValue) => total = total + currentValue.contributions.length, 0);
    
    const [achievementData, setAchievementData] = useState(computeAchievementData());
    const longestStreakDayData = [achievementData.streakDate, achievementData.streakLength];
    const largestContribution = achievementData.maxContribution;
    const mostDayContributionData = [achievementData.maxContributionDate, achievementData.maxDayContribution];

    function computeAchievementData() {
        var map = new Map();
        var maxContribution = 0;

        for(const obj of user.objectives) {
            for(const entry of obj.contributions) {
                if (entry.amount > maxContribution) {
                    maxContribution = entry.amount;
                }

                const dateStr = new Date(entry.timestamp.getFullYear(), entry.timestamp.getMonth(), entry.timestamp.getDay()).toDateString();
                if (map.has(dateStr)) {
                    map.set(dateStr, {'streak': map.get(dateStr).streak + 1, 'contribution': map.get(dateStr).contribution + entry.amount});
                } else {
                    map.set(dateStr, {'streak': 1, 'contribution': entry.amount});
                }
            }
        }

        // longest day streak
        var streakDate = null;
        var streakLength = 0;
        // most contribution in one day
        var maxContributionDate = null;
        var maxDayContribution = 0;
        for(const date of map.keys()) {
            var entry = map.get(date);
            if(entry.streak > streakLength) {
                streakLength = entry.streak;
                streakDate = date;
            }
            if(entry.contribution > maxDayContribution) {
                maxDayContribution = entry.contribution;
                maxContributionDate = date;
            }
        }

        return {
            'streakDate': streakDate,
            'streakLength': streakLength,
            'maxContribution': maxContribution,
            'maxContributionDate': maxContributionDate,
            'maxDayContribution': maxDayContribution
        };
    }

    function getColor() {
        if (overallProgressPercent < 40.0) {
            return "red";
        } else if (overallProgressPercent < 90) {
            return "blue";
        } else if (overallProgressPercent !== 100.0) {
            return "green";
        } else {
            return "yellow";
        }
    }

    useEffect(() => {
        console.log(overallProgressPercent);
        setAchievementData(computeAchievementData);
        totalCurrentAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.currentAmount, 0);
        totalGoalAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.goalAmount, 0);
        overallProgressPercent = Number.parseFloat((totalCurrentAmount / totalGoalAmount * 100).toFixed(0));
        totalContributionCount = user.objectives.reduce((total, currentValue) => total = total + currentValue.contributions.length, 0);
    }, [objectives])

    return (
        <Container>
            <Grid>
                <Grid.Col span={9}>
                    <Title order={2} className="title">Profile</Title>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Button variant='default' onClick={() => setOpened((o) => !o)}>
                        {opened ? <CaretDown /> : <CaretLeft />}
                    </Button>
                </Grid.Col>
            </Grid>
            <Collapse in={opened} style={{ border: "2px solid gray", borderRadius: 10, padding: "15px", marginTop: "10px" }}>
                <Grid style={{ paddingBottom: 15 }}>
                    <Grid.Col span={3}>
                        <Avatar radius="xl" src={user.avatar} />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Title order={3} className="title">{user.name}</Title>
                    </Grid.Col>
                </Grid>
                <Divider size="md" />
                <Container px={0} style={{ paddingTop: "10px", paddingBottom: "15px", textAlign: "center" }}>
                    <Title order={4} align={'center'} className="subtitle">
                        OBJECTIVE STAT
                    </Title>
                    <Text size="lg">
                        <strong className='keyword'>{user.objectives.length}</strong> active objectives
                    </Text>
                    <Text size="lg">
                        <strong className='keyword'>{totalContributionCount}</strong> contributions made
                    </Text>
                    <Text size="lg">
                        <strong className='keyword'>${totalCurrentAmount}</strong> saved in total
                    </Text>
                    <Text size="lg">
                        <strong className='keyword'>${totalGoalAmount}</strong> to be saved
                    </Text>
                    <Text size="lg">
                        Overall Progress <strong>{overallProgressPercent}%</strong>
                        <Progress value={overallProgressPercent} color={getColor()} size="xl" animate style={{ marginTop: "15px", marginLeft: "10%", width: '80%', height: 16 }} />
                    </Text>
                </Container>
                <Divider size="md" />
                <Container px={0} style={{ paddingTop: "10px", textAlign: "center" }}>
                    <Title order={4} align={'center'} className="subtitle">
                        ACHIEVEMENT
                    </Title>
                    <Text size="lg">
                        Most contribution (#) in 1 day
                        <br />
                        <strong className='keyword'>
                            {longestStreakDayData[1]} on {longestStreakDayData[0]}
                        </strong>
                    </Text>
                    <Text size="lg">
                        Most contribution ($) in 1 day
                        <br />
                        <strong className='keyword'>
                            ${mostDayContributionData[1]} on {mostDayContributionData[0]}
                        </strong>
                    </Text>
                    <Text size="lg">
                        Largest contribution
                        <br />
                        <strong className='keyword'>
                            {largestContribution}
                        </strong>
                    </Text>
                </Container>
            </Collapse>
        </Container>
    )
}

export default Profile
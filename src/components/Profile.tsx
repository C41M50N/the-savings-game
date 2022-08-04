import React, { useState } from 'react'
import { Container, Title, Text, Grid, Stack, Button, Collapse, Avatar, Divider, Progress } from '@mantine/core'
import { CaretLeft, CaretDown, UserCircle } from 'tabler-icons-react'
import { User } from '../types'

type Props = {
	user: User
}

const Profile = ({ user }: Props) => {
    const [opened, setOpened] = useState(true);
    const totalCurrentAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.currentAmount, 0);
    const totalGoalAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.goalAmount, 0);
    const overallProgressPercent = Number.parseFloat((totalCurrentAmount / totalGoalAmount * 100).toFixed(0));
    const totalContributionCount = user.objectives.reduce((total, currentValue) => total = total + currentValue.contributions.length, 0);
    
    const achievementData = computeAchievementData();
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

    return (
        <Container>
            <Grid>
                <Grid.Col span={9}>
                    <Title order={2}>Profile</Title>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Button variant='default' onClick={() => setOpened((o) => !o)}>
                        {opened ? <CaretDown /> : <CaretLeft />}
                    </Button>
                </Grid.Col>
            </Grid>
            <Collapse in={opened} style={{ border: "2px solid gray", padding: "15px", marginTop: "10px" }}>
                <Grid style={{ paddingBottom: 15 }}>
                    <Grid.Col span={3}>
                        <Avatar radius="xl" src={user.avatar != "" ? user.avatar : null} alt="no image here" />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Title order={3}>{user.name}</Title>
                    </Grid.Col>
                </Grid>
                <Divider size="md" />
                <Container px={0} style={{ paddingTop: "10px", paddingBottom: "15px", textAlign: "center" }}>
                    <Title order={4} align={'center'}>
                        <u>OBJECTIVE STAT</u>
                    </Title>
                    <Text size="lg">
                        <strong>{user.objectives.length}</strong> active objectives
                    </Text>
                    <Text size="lg">
                        <strong>{totalContributionCount}</strong> contributions made
                    </Text>
                    <Text size="lg">
                        <strong>${totalCurrentAmount}</strong> saved in total
                    </Text>
                    <Text size="lg">
                        <strong>${totalGoalAmount}</strong> to be saved
                    </Text>
                    <Text size="lg">
                        Overall Progress <strong>{overallProgressPercent}%</strong>
                        <Progress value={overallProgressPercent} color={'blue'} size="xl" animate style={{ marginTop: "15px", marginLeft: "10%", width: '80%', height: 16 }} />
                    </Text>
                </Container>
                <Divider size="md" />
                <Container px={0} style={{ paddingTop: "10px", textAlign: "center" }}>
                    <Title order={4} align={'center'}>
                        <u>ACHIEVEMENT</u>
                    </Title>
                    <Text size="lg">
                        Most contribution (#) in 1 day
                        <br />
                        <strong>
                            {longestStreakDayData[1]} on {longestStreakDayData[0]}
                        </strong>
                    </Text>
                    <Text size="lg">
                        Most contribution ($) in 1 day
                        <br />
                        <strong>
                            ${mostDayContributionData[1]} on {mostDayContributionData[0]}
                        </strong>
                    </Text>
                    <Text size="lg">
                        Largest contribution
                        <br />
                        <strong>
                            {largestContribution}
                        </strong>
                    </Text>
                </Container>
            </Collapse>
        </Container>
    )
}

export default Profile
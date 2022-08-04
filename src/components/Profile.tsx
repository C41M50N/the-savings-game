import React, { useState } from 'react'
import { Container, Title, Text, Grid, Stack, Button, Collapse, Avatar, Divider, Progress } from '@mantine/core'
import { CaretLeft, CaretDown, UserCircle } from 'tabler-icons-react'
import { User } from '../types'

type Props = {
	user: User
}

const Profile = ({ user }: Props) => {
    const [opened, setOpened] = useState(true);
    const totalCurrentAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.currentAmount,0);
    const totalGoalAmount = user.objectives.reduce((total, currentValue) => total = total + currentValue.goalAmount,0);
    const overallProgressPercent = Number.parseFloat((totalCurrentAmount / totalGoalAmount * 100).toFixed(0));

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
                <Container px={0} style={{ paddingTop: "10px", textAlign: "center" }}>
                    <Title order={4} align={'center'}>STAT</Title>
                    <Text size="lg">
                        <strong>{user.objectives.length}</strong> active objectives
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
            </Collapse>
        </Container>
    )
}

export default Profile
import React, { useState } from 'react'
import { Container, Title, Text, Grid, Stack, Button, Collapse } from '@mantine/core'
import { CaretLeft, CaretDown } from 'tabler-icons-react'
import { User } from '../types'

type Props = {
	user: User
}

const Profile = ({ user }: Props) => {
    const [opened, setOpened] = useState(false);

    return (
        <Container>
            <Grid>
                <Grid.Col span={9}>
                    <Title order={2}>Profile Info</Title>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Button variant='default' onClick={() => setOpened((o) => !o)}>
                        {opened ? <CaretDown /> : <CaretLeft />}
                    </Button>
                </Grid.Col>
            </Grid>
            <Collapse in={opened}>
                <Title order={4}>{user.name}</Title>
            </Collapse>
        </Container>
    )
}

export default Profile
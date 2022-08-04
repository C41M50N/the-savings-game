
import React from 'react'
import { Container, Title, Text, Grid, Divider } from '@mantine/core'
import { UserCircle } from 'tabler-icons-react'
import { FeedEntry } from '../types'

type Props = {
	feedEntry: FeedEntry
}

const FeedItem = ({ feedEntry }: Props) => {

    return (
        <Container style={{ width: '100%' }}>
            <Grid>
                <Grid.Col span={2}>
                    <UserCircle size={30} />
                </Grid.Col>
                <Grid.Col span={10}>
                    <Title order={3}>{feedEntry.user}</Title>
                </Grid.Col>
            </Grid>
            <Text size="md">{feedEntry.feedMessage}</Text>
            <Divider size="md"/>
        </Container>
    );
}

export default FeedItem
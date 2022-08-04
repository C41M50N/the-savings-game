
import React, { useState } from 'react'
import { Container, Title, Text, Grid, Stack, Button, Collapse } from '@mantine/core'
import { CaretLeft, CaretDown } from 'tabler-icons-react'
import FeedItem from './FeedItem';
import { FeedEntry } from '../types'

type Props = {
	feedEntryList: FeedEntry[]
}

const SocialFeed = ({ feedEntryList }: Props) => {
	const [opened, setOpened] = useState(true);

	return (
		<Container>
			<Grid>
				<Grid.Col span={9}>
					<Title order={2}>Social Feed</Title>
				</Grid.Col>
				<Grid.Col span={3}>
					<Button variant='default' onClick={() => setOpened((o) => !o)}>
						{opened ? <CaretDown /> : <CaretLeft />}
					</Button>
				</Grid.Col>
			</Grid>
			<br />
			<Collapse in={opened} style={{ border: "2px solid gray", borderRadius: 10, padding: "15px", marginTop: "10px", marginBottom: 0, paddingBottom: 0 }}>
				<Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
					{
						[...feedEntryList].map((feed) => (
							<FeedItem feedEntry={feed} />
						))
					}
				</Stack>
			</Collapse>
		</Container>
	);
}

export default SocialFeed

import React from 'react'
import { ActionIcon, Card, Group, Menu, Title, Image, Progress, Text, DefaultMantineColor, Modal, Container, NumberInput, Button, Divider, Space, Grid, Blockquote } from '@mantine/core'
import { Objective } from '../types'
import { IconDots, IconTrash, IconCirclePlus, IconEdit } from '@tabler/icons'

type Props = {
	objective: Objective
}

const ObjectiveCard = ({ objective }: Props) => {

	const progressPercentage = Number.parseFloat((objective.currentAmount / objective.goalAmount * 100).toFixed(0));

	const [modalIsOpen, setModalIsOpen] = React.useState(false);
	const [contributionAmount, setContributionAmount] = React.useState(1000.00);

	return (
		<>
			<Card withBorder shadow={'lg'} radius={'sm'}>
				<Card.Section>
					<Group position='apart'>
						<Title order={3} style={{ paddingLeft: 10, paddingTop: 6 }}>{objective.title}</Title>

						<Menu withinPortal position="right-start" shadow="md">
							<Menu.Target>
								<ActionIcon style={{ marginRight: 10, marginTop: 6 }}>
									<IconDots size={24} />
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item icon={<IconCirclePlus size={20} />} color="green" onClick={() => setModalIsOpen(true)}>Contribute</Menu.Item>
								<Menu.Item icon={<IconEdit size={20} />} color="orange">Edit</Menu.Item>
								<Menu.Item icon={<IconTrash size={20} />} color="red">Delete</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Card.Section>

				<Card.Section mt="sm">
					<Image height={200} width={"100%"} src={objective.image} withPlaceholder />
				</Card.Section>

				<Card.Section inheritPadding mt="sm" pb="md">
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{
							(progressPercentage < 40.0 && progressPercentage >= 0.0) &&
							<ProgressBar value={progressPercentage} color={"red"} />
						}
						{
							(progressPercentage < 90.0 && progressPercentage >= 40.0) &&
							<ProgressBar value={progressPercentage} color={"blue"} />
						}
						{
							(progressPercentage < 100.0 && progressPercentage >= 90.0) &&
							<ProgressBar value={progressPercentage} color={"green"} />
						}

						<Text style={{ fontSize: 30, fontWeight: 'normal', paddingLeft: 10, fontFamily: "'Press Start 2P', cursive" }}>
							{progressPercentage.toFixed(0)}%
						</Text>
					</div>
				</Card.Section>
			</Card>

			<Modal opened={modalIsOpen} onClose={() => setModalIsOpen(false)} size='lg' title={<Text style={{ fontSize: 24, fontFamily: "'Press Start 2P', cursive" }}>Level Up !!!</Text>}>
				<div style={{ display: 'flex' }}>
					<Container>
						<NumberInput
							label="Contribution Amount"
							size='lg'
							defaultValue={1000.00}
							precision={2}
							step={20}
							min={1}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							formatter={(value) =>
								!Number.isNaN(parseFloat(value!))
									? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: '$ '
							}
							stepHoldDelay={500}
							stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}

							onChange={(amount) => setContributionAmount(amount!)}
						/>

						<Button variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }} style={{ width: '100%', fontSize: 16, marginTop: 12 }} leftIcon={<IconCirclePlus size={20} />}>{`Contribute $ ${contributionAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Button>
					</Container>

					<Container>
						<Blockquote cite="– Forrest Gump">
							If you won't invest in yourself – who will?
						</Blockquote>
					</Container>
				</div>
			</Modal>
		</>
	)
}

type ProgressBarProps = {
	value: number
	color: DefaultMantineColor
}
const ProgressBar = ({ value, color }: ProgressBarProps) => {
	return (
		<Progress value={value} color={color} size="xl" animate style={{ width: '90%', height: 24 }} />
	)
}

export default ObjectiveCard

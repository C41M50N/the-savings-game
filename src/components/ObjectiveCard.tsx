
import React, { useState } from 'react'
import { ActionIcon, Card, Group, Menu, Title, Image, Progress, Text, DefaultMantineColor, Modal, Container, NumberInput, Button, Divider, Space, Grid, Blockquote } from '@mantine/core'
import { Objective } from '../types'
import { IconDots, IconTrash, IconCirclePlus, IconEdit } from '@tabler/icons'
import { clamp } from '../utils'
import '../app.css'
import { showNotification } from '@mantine/notifications'

type Props = {
	objective: Objective,
	addContribution: (id: number, amount: number) => void
	deleteObjective: (id: number, title: string) => void
}

const ObjectiveCard = ({ objective, addContribution, deleteObjective }: Props) => {

	const progressPercentage = clamp(Number.parseFloat((objective.currentAmount / objective.goalAmount * 100).toFixed(0)), 0.0, 100.0);

	const [contributeModalOpen, setContributeModalOpen] = useState(false);
	const [neededContribution, setNeededContribution] = useState(Math.round((objective.goalAmount - objective.currentAmount) * 100) / 100);
	const [contributionAmount, setContributionAmount] = useState(neededContribution);
	const [inputWarningOn, setInputWarningOn] = useState(false);

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	function updateAmount(amt: number) {
		if(amt > 0 && amt <= neededContribution) {
			setContributionAmount(amt);
			setInputWarningOn(false);
		} else {
			setInputWarningOn(true);
		}
	}

	const performMilestoneChecks = () => {
		const milestones = getNewMilestones(progressPercentage, clamp(Number.parseFloat(((objective.currentAmount + contributionAmount) / objective.goalAmount * 100).toFixed(0)), 0.0, 100.0));
		console.log(milestones)
		if (milestones.length !== 0) {
			for (let i = 0; i < milestones.length; i++) {
				let percentString = `${milestones[i].toString()}0%`
				showNotification({
					title: '💪 New Milestone Reached',
					message: `${percentString} milestone reached for ${objective.title}!!!`,
					autoClose: 2000
				})
			}
		}
	}

	return (
		<>
			<Card withBorder shadow={'lg'} radius={'sm'}>
				<Card.Section>
					<Group position='apart'>
						<Title order={3} style={{ paddingLeft: 10, paddingTop: 6, maxWidth: '81%' }}>{objective.title}</Title>

						<Menu withinPortal position="right-start" shadow="md">
							<Menu.Target>
								<ActionIcon style={{ marginRight: 10, marginTop: 6 }}>
									<IconDots size={24} />
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item icon={<IconCirclePlus size={20} />} color="green" onClick={() => { setContributeModalOpen(true); setContributionAmount(contributionAmount); }}>Contribute</Menu.Item>
								<Menu.Item icon={<IconEdit size={20} />} color="orange">Edit</Menu.Item>
								<Menu.Item icon={<IconTrash size={20} />} color="red" onClick={() => { setDeleteModalOpen(true); }}>Delete</Menu.Item>
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
							<ProgressBar value={progressPercentage} color={"orange"} />
						}
						{
							(progressPercentage < 100.0 && progressPercentage >= 90.0) &&
							<ProgressBar value={progressPercentage} color={"green"} />
						}
						{
							(progressPercentage === 100.0) &&
							<ProgressBar value={progressPercentage} color={"yellow"} />
						}

						<Text style={{ fontSize: 30, fontWeight: 'normal', paddingLeft: 10, fontFamily: "'Press Start 2P', cursive" }}>
							{progressPercentage.toFixed(0)}%
						</Text>
					</div>
				</Card.Section>
			</Card>

			<Modal opened={contributeModalOpen} size='lg' padding={50}
				onClose={() => {
					setContributeModalOpen(false);
					setContributionAmount(contributionAmount);
					setInputWarningOn(false);
				}}
				title={<Text style={{ fontSize: 24, fontFamily: "'Press Start 2P', cursive" }}>Level Up !!!</Text>}>
				
				<Container style={{ paddingBottom: 20 }}>
					<Text size={'lg'} color="#47f9ff">
						Current Contribution Amount: ${objective.currentAmount}
					</Text>
					<Text size={'lg'} color='#6e70f4'>
						Goal Contribution Amount: ${objective.goalAmount}
					</Text>
					<Text size={'lg'} color='#ff3980b4'>
						Contribution Needed: ${neededContribution}
					</Text>
				</Container>

				<Divider size={'md'} />

				<div style={{ display: 'flex', paddingTop: '15px' }}>
					<Container>
						<NumberInput
							label="Contribution Amount"
							size='lg'
							defaultValue={contributionAmount}
							precision={2}
							step={20}
							min={1}
							max={neededContribution}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							formatter={(value) =>
								!Number.isNaN(parseFloat(value!))
									? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: '$ '
							}
							stepHoldDelay={500}
							stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}

							onChange={(value) => updateAmount(value!)}
						/>

						<Text size="md" color="red" style={ inputWarningOn ? { visibility: "visible" } : { visibility: "hidden" }}>
							<i>Invalid contribution input.</i>
						</Text>

						<Button onClick={() => {
							performMilestoneChecks();
							addContribution(objective.id, contributionAmount);
							setContributeModalOpen(false);
						}} variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }} style={{ width: '100%', fontSize: 16, marginTop: 12 }} leftIcon={<IconCirclePlus size={20} />}>{`Contribute $ ${contributionAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Button>
					</Container>

					<Container>
						<Blockquote cite="– Forrest Gump">
							If you won't invest in yourself – who will?
						</Blockquote>
					</Container>
				</div>
			</Modal>

			<Modal
				opened={deleteModalOpen} size='lg' padding={50}
				onClose={() => setDeleteModalOpen(false)}
				title={<Text style={{ fontSize: 24 }}>Are you sure you want to delete this objective?</Text>}
			>
				<Grid style={{ width: '50%' }}>
					<Grid.Col span={4}>
						<Button color="blue" variant="outline">
							No
						</Button>
					</Grid.Col>
					<Grid.Col span={2}>
						<Button color="red" variant="outline" onClick={() => { deleteObjective(objective.id, objective.title); setDeleteModalOpen(false); }}>
							Yes
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	)
}

const getNewMilestones = (previousProgressPercentage: number, newProgressPercentage: number) => {
	let progressPercentage = previousProgressPercentage;

	let milestoneArray: number[] = []
	while (progressPercentage + 10.0 <= newProgressPercentage) {
		milestoneArray.push(parseInt((progressPercentage + 10.0).toString()[0]))
		progressPercentage = progressPercentage + 10.0;
	}

	return milestoneArray;
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

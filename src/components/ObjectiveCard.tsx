
import React, { useState } from 'react'
import { ActionIcon, Card, Group, Menu, Title, Image, Progress, Text, DefaultMantineColor, Modal, Container, NumberInput, Button, Divider, Space, Grid, Blockquote } from '@mantine/core'
import { Objective } from '../types'
import { IconDots, IconTrash, IconCirclePlus, IconEdit } from '@tabler/icons'
import { clamp } from '../utils'

type Props = {
	objective: Objective,
	addContribution: (id: number, amount: number) => void
}

const ObjectiveCard = ({ objective, addContribution }: Props) => {

	const progressPercentage = clamp(Number.parseFloat((objective.currentAmount / objective.goalAmount * 100).toFixed(0)), 0.0, 100.0);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [neededContribution, setNeededContribution] = useState(Math.round((objective.goalAmount - objective.currentAmount) * 100) / 100);
	const [contributionAmount, setContributionAmount] = useState(neededContribution);
	const [inputWarningOn, setInputWarningOn] = useState(false);

	function updateAmount(amt: number) {
		if(amt > 0 && amt <= neededContribution) {
			setContributionAmount(amt);
			setInputWarningOn(false);
		} else {
			setInputWarningOn(true);
		}
	}

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
								<Menu.Item icon={<IconCirclePlus size={20} />} color="green" onClick={() => { setModalIsOpen(true); setContributionAmount(contributionAmount); }}>Contribute</Menu.Item>
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

			<Modal opened={modalIsOpen} size='lg' padding={50}
				onClose={() => {
					setModalIsOpen(false);
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
							addContribution(objective.id, contributionAmount);
							setModalIsOpen(false);

						}} variant='gradient' gradient={{ from: 'teal', to: 'green', deg: 105 }} style={{ width: '100%', fontSize: 16, marginTop: 12 }} leftIcon={<IconCirclePlus size={20} />}>{`Contribute $ ${contributionAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Button>
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

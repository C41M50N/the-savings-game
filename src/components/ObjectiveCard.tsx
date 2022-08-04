
import React from 'react'
import { ActionIcon, Card, Group, Menu, Title, Image, Progress, Text, DefaultMantineColor } from '@mantine/core'
import { Objective } from '../types'
import { IconDots, IconTrash, IconCirclePlus, IconEdit } from '@tabler/icons'

type Props = {
	objective: Objective
}

const ObjectiveCard = ({ objective }: Props) => {

	const progressPercentage = Number.parseFloat((objective.currentAmount / objective.goalAmount * 100).toFixed(0));

	return (
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
							<Menu.Item icon={<IconCirclePlus size={20} />} color="green">Contribute</Menu.Item>
							<Menu.Item icon={<IconEdit size={20} />} color="orange">Edit</Menu.Item>
							<Menu.Item icon={<IconTrash size={20} />} color="red">Delete</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Card.Section>

			<Card.Section mt="sm">
				<Image height={200} width={"100%"} src={''} withPlaceholder />
			</Card.Section>

			<Card.Section inheritPadding mt="sm" pb="md">
				<div style={{ display: 'flex', alignItems: 'baseline' }}>
					{
						(progressPercentage < 30.0 && progressPercentage >= 0.0) &&
						<ProgressBar value={progressPercentage} color={"red"} />
					}
					{
						(progressPercentage < 60.0 && progressPercentage >= 30.0) &&
						<ProgressBar value={progressPercentage} color={"blue"} />
					}
					{
						(progressPercentage < 100.0 && progressPercentage >= 60.0) &&
						<ProgressBar value={progressPercentage} color={"green"} />
					}

					<Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 10 }}>
						{progressPercentage.toFixed(0)}%
					</Text>
				</div>
			</Card.Section>
		</Card>
	)
}

type ProgressBarProps = {
	value: number
	color: DefaultMantineColor
}
const ProgressBar = ({ value, color }: ProgressBarProps) => {
	return (
		<Progress value={value} color={color} size="xl" animate style={{ width: '90%' }} />
	)
}

export default ObjectiveCard

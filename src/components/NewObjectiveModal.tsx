
import React from 'react'
import { Box, Button, FileButton, Group, Modal, NumberInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconChevronsRight } from '@tabler/icons'
import { Objective } from '../types'


type FormData = Omit<Objective, "id" | "contributions">

type Props = {
  isVisible: boolean
  onClose: () => void
  addNewObjective: ({}: FormData) => void
}

const NewObjectiveModal = ({ isVisible, onClose, addNewObjective }: Props) => {

  const form = useForm<FormData>({
    initialValues: {
      title: '',
      image: '',
      currentAmount: 100.00,
      goalAmount: 1_500.00
    },
    validate: (values) => ({
      title: values.title.length < 2 ? 'Too short name' : null,
      currentAmount: values.currentAmount < 0.0 ? 'Amount must be > 0' : null,
      goalAmount: values.goalAmount < values.currentAmount ? 'Goal Amount must be greater than Current Amount' : null
    })
  })

  return (
    <Modal opened={isVisible} onClose={onClose} title={<Text style={{ fontSize: 20, fontFamily: "'Press Start 2P', cursive" }}>Begin New Quest !</Text>}>
      <Box>
        <form onSubmit={form.onSubmit((values) => {
          addNewObjective({
            title: values.title,
            image: values.image,
            currentAmount: values.currentAmount,
            goalAmount: values.goalAmount
          })
          onClose()
        })}>

          <TextInput size='md' label='Title' placeholder='Title' {...form.getInputProps('title')} />
          <TextInput size='md' label='Image URL' placeholder='Image URL' {...form.getInputProps('image')} />
          <NumberInput size='md' label='Current Amount' {...form.getInputProps('currentAmount')}
              min={1}
              step={10}
              precision={2}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							formatter={(value) =>
								!Number.isNaN(parseFloat(value!))
									? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: '$ '
							}
							stepHoldDelay={500}
							stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)} />
          <NumberInput size='md' label='Goal Amount' {...form.getInputProps('goalAmount')}
              min={1}
              step={10}
              precision={2}
							parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
							formatter={(value) =>
								!Number.isNaN(parseFloat(value!))
									? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									: '$ '
							}
							stepHoldDelay={500}
							stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)} />

          <Group position="right" mt="md">
            <Button rightIcon={<IconChevronsRight />} type="submit">Begin Quest</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}

export default NewObjectiveModal

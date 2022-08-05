
import React from 'react'
import { ActionIcon, AppShell, Avatar, Card, ColorScheme, ColorSchemeProvider, Container, Divider, Group, Header, Input, MantineProvider, SimpleGrid, Title, Text, Stack, Button } from '@mantine/core'
import { BuildingBank, MoonStars, Search, Social, Sun } from 'tabler-icons-react';
import ObjectiveCard from './components/ObjectiveCard';
import SocialFeed from './components/SocialFeed';
import Profile from './components/Profile';
import { mockFeed, mockObjectives, mockUser } from './data';
import produce from 'immer';
import { IconPlus } from '@tabler/icons';
import NewObjectiveModal from './components/NewObjectiveModal';
import { Objective } from './types';
import { NotificationsProvider } from '@mantine/notifications';

function HomePage() {

  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';

  const [allObjectives, setAllObjectives] = React.useState(mockObjectives);

  const addContribution = React.useCallback ((id: number, amount: number) => {
    setAllObjectives(
      produce((draft) => {
        const objective = draft.find((objective) => objective.id === id)!;
        objective.currentAmount = objective?.currentAmount + amount;
        objective.contributions.push({
          amount: amount,
          timestamp: new Date()
        })
      })
    )
  }, [])

  const addObjective = React.useCallback (({ title, image, currentAmount, goalAmount }: Omit<Objective, "id" | "contributions">) => {
    setAllObjectives(
      produce((draft) => {
        const maxId = draft.sort((o1, o2) => o2.id - o1.id)[0].id
        const objective: Objective = {
          id: maxId + 1,
          title: title,
          image: image,
          currentAmount: currentAmount,
          goalAmount: goalAmount,
          contributions: [
            {
              amount: currentAmount,
              timestamp: new Date()
            }
          ]
        }

        draft.push(objective)
      })
    )
  }, [])

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const searchedObjectives = React.useMemo(() => {
    return allObjectives.filter((objective) => objective.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allObjectives, searchTerm])

  const [addObjectiveModalIsOpen, setAddObjectiveModalIsOpen] = React.useState(false);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'cyan' }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider limit={1}>
        <AppShell
          fixed
          header={
            <Header height={80} p="md" dir="horizontal">
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <BuildingBank
                  size={50}
                  strokeWidth={1.5}
                  color={'#308bff'}
                  style={{ marginRight: 20 }}
                />

                <Title>The Savings Game</Title>

                <div style={{ marginInline: 20, marginLeft: 56 }}>
                  <Input icon={<Search />} value={searchTerm} onChange={(e: any) => setSearchTerm(e.target.value as string)} placeholder="Search Objectives" style={{ maxWidth: 300 }} />
                </div>

                <div style={{ flex: 1 }}>
                  <Button onClick={() => setAddObjectiveModalIsOpen(true)} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} leftIcon={<IconPlus />}>Add Objective</Button>
                </div>

                <div style={{ marginInline: 20 }}>
                  <ActionIcon>
                    <Avatar size={42} src={mockUser.avatar} radius="xl" alt="Profile" color={"blue"} />
                  </ActionIcon>
                </div>

                <div style={{ marginInline: 10 }}>
                  <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                    style={{ marginRight: 10 }}
                  >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                  </ActionIcon>
                </div>
              </div>
            </Header>
          }
          style={{ height: "100vh" }}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
          })}
        >

          <Group spacing={"xs"} style={{ width: '100%' }}>
            {/* SAVINGS OBJECTIVES VIEWPORT */}
            <Container style={{ height: '88vh', width: '70%' }}>
              <Title order={2}>Savings Objectives</Title>
              <Divider />

              <SimpleGrid cols={3} spacing="lg" style={{ marginBlock: 12 }}>
                {
                  [...searchedObjectives].map((objective) => (
                    <ObjectiveCard key={objective.id} objective={objective} addContribution={addContribution} />
                  ))
                }
              </SimpleGrid>
            </Container>

            {/* FEED VIEWPORT */}
            <Container style={{ height: '88vh', width: '30%', flex: 1 }}>
              <Profile user={mockUser} />
              <br />
              <SocialFeed feedEntryList={mockFeed} />
            </Container>
          </Group>

          <NewObjectiveModal isVisible={addObjectiveModalIsOpen} onClose={() => setAddObjectiveModalIsOpen(false)} addNewObjective={addObjective} />

        </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default HomePage

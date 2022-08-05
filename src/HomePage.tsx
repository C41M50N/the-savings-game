
import React, { useEffect } from 'react'
import { ActionIcon, AppShell, Avatar, Card, ColorScheme, ColorSchemeProvider, Container, Divider, Group, Header, Input, MantineProvider, SimpleGrid, Title, Text, Stack } from '@mantine/core'
import { BuildingBank, MoonStars, Search, Social, Sun } from 'tabler-icons-react';
import ObjectiveCard from './components/ObjectiveCard';
import SocialFeed from './components/SocialFeed';
import Profile from './components/Profile';
import { mockFeed, mockObjectives, mockUser } from './data';
import produce from 'immer';

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

  const deleteObjective = React.useCallback((id: number, title: string) => {
    setAllObjectives(
      produce(allObjectives, draft => {
        const index = draft.findIndex(item => item.id === id && item.title === title)
        if (index !== -1) draft.splice(index, 1)
      })
    );
  }, [])

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const searchedObjectives = React.useMemo(() => {
    return allObjectives.filter((objective) => objective.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allObjectives, searchTerm])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'cyan' }} withGlobalStyles withNormalizeCSS>
        <AppShell
          fixed
          header={
            <Header height={80} p="md" dir="horizontal">
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <BuildingBank
                  size={50}
                  strokeWidth={1.5}
                  color={'#2d863a'}
                  style={{ marginRight: 20 }}
                />

                <Title className='title'>The Savings Game</Title>

                <div style={{ flex: 1, marginInline: 20, marginLeft: 56 }}>
                  <Input icon={<Search />} value={searchTerm} onChange={(e: any) => setSearchTerm(e.target.value as string)} placeholder="Search Objectives" style={{ maxWidth: 300 }} />
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
              <Title order={2} className='subtitle'>Savings Objectives</Title>
              <Divider />

              <SimpleGrid cols={3} spacing="lg" style={{ marginBlock: 12 }}>
                {
                  [...searchedObjectives].map((objective) => (
                    <ObjectiveCard key={objective.id} objective={objective} addContribution={addContribution} deleteObjective={deleteObjective}/>
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
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default HomePage

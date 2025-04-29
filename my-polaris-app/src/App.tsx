import {
  AppProvider,
  Page,
  Frame,
  Navigation,
  TopBar,
  IndexTable,
  useIndexResourceState,
  Text,
  ButtonGroup,
  Button,
  Tabs,
  LegacyCard,
  Icon
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useState, useCallback } from "react";
import enTranslations from '@shopify/polaris/locales/en.json';

function App() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue('');
  }, []);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    [],
  );

  const searchFieldMarkup = (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '480px' }}>
      <TopBar.SearchField
        onChange={handleSearchChange}
        value={searchValue}
        placeholder="Search"
        showFocusBorder
      />
    </div>
  );

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'Back to Shopify'}],
        },
        {
          items: [{content: 'Community forums'}],
        },
      ]}
      name="Stellar Interiors"
      initials="SI"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const secondaryMenuMarkup = (
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      alignItems: 'center', 
      marginRight: '12px',
      height: '100%' 
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        backgroundColor: '#303030',
        borderRadius: '4px',
        cursor: 'pointer'
      }} />
      <div style={{
        width: '24px',
        height: '24px',
        backgroundColor: '#303030',
        borderRadius: '4px',
        cursor: 'pointer'
      }} />
    </div>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchField={searchFieldMarkup}
      searchResultsVisible={isSearchActive}
      onSearchResultsDismiss={handleSearchResultsDismiss}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Home',
            selected: false,
          },
          {
            label: 'Orders',
            badge: '15',
          },
          {
            label: 'Products',
            selected: true,
          },
          {
            label: 'Collections',
          },
          {
            label: 'Inventory',
          },
        ]}
      />
      <Navigation.Section
        title="Sales channels"
        items={[
          {
            label: 'Online Store',
          },
          {
            label: 'Point of Sale',
          },
        ]}
      />
      <Navigation.Section
        title="Apps"
        items={[
          {
            label: 'Email',
          },
        ]}
      />
    </Navigation>
  );

  const tabs = [
    {
      id: 'all',
      content: 'All',
      accessibilityLabel: 'All inventory',
      panelID: 'all-inventory-content',
    },
    {
      id: 'incoming',
      content: 'Incoming',
      panelID: 'incoming-inventory-content',
    },
  ];

  const resourceName = {
    singular: 'inventory item',
    plural: 'inventory items',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState([]);

  const rowMarkup = [
    {
      id: '1',
      product: 'Tennis Racket Yellow / S',
      sku: '48052830125',
      unavailable: '5',
      committed: '15',
      available: '20',
      onHand: '40',
      incoming: '10',
    },
    {
      id: '2',
      product: 'Tennis Racket Yellow / M',
      sku: '48052830125',
      unavailable: '34',
      committed: '20',
      available: '25',
      onHand: '45',
      incoming: '5',
    },
    {
      id: '3',
      product: 'Tennis Racket Yellow / L',
      sku: '48052830125',
      unavailable: '0',
      committed: '30',
      available: '20',
      onHand: '50',
      incoming: '0',
    },
  ].map(
    ({
      id,
      product,
      sku,
      unavailable,
      committed,
      available,
      onHand,
      incoming,
    }) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={Number(id)}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {product}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{sku}</IndexTable.Cell>
        <IndexTable.Cell>{unavailable}</IndexTable.Cell>
        <IndexTable.Cell>{committed}</IndexTable.Cell>
        <IndexTable.Cell>{available}</IndexTable.Cell>
        <IndexTable.Cell>{onHand}</IndexTable.Cell>
        <IndexTable.Cell>{incoming}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <AppProvider i18n={enTranslations}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
      >
        <Page
          title="Inventory: New York City"
          fullWidth
          primaryAction={
            <ButtonGroup>
              <Button>Stock counts</Button>
              <Button>Adjustment history</Button>
              <Button>More actions</Button>
            </ButtonGroup>
          }
        >
          <LegacyCard>
            <Tabs tabs={tabs} selected={selected} onSelect={setSelected} />
            <IndexTable
              resourceName={resourceName}
              itemCount={3}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                {title: 'Inventory item'},
                {title: 'SKU'},
                {title: 'Unavailable'},
                {title: 'Committed'},
                {title: 'Available'},
                {title: 'On hand'},
                {title: 'Incoming'},
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
        </Page>
      </Frame>
    </AppProvider>
  );
}

export default App;

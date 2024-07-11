import * as React from 'react';
import {
  Bullseye,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Flex,
  FlexItem,
  Spinner,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { DeviceList, FleetList } from '@flightctl/types';
import { useTranslation } from '../../../../hooks/useTranslation';
import ApplicationStatusChart from './ApplicationStatusChart';
import DeviceStatusChart from './DeviceStatusChart';
import SystemUpdateStatusChart from './SystemUpdateStatusChart';
import { useFetchPeriodically } from '../../../../hooks/useFetchPeriodically';
import { getDevicesEndpoint } from '../../../Device/DeviceList/useDeviceLikeResources';
import StatusCardFilters from './StatusCardFilters';
import ErrorAlert from '../../../ErrorAlert/ErrorAlert';

const StatusCard = () => {
  const { t } = useTranslation();
  const [fleets, setFleets] = React.useState<string[]>([]);
  const [labels, setLabels] = React.useState<{ key: string; value: string }[]>([]);

  const [devicesList, loading, error] = useFetchPeriodically<DeviceList>({
    endpoint: getDevicesEndpoint({
      fleetId: fleets.length ? fleets[0] : undefined,
      labels,
    }),
  });

  const [fleetsList, flLoading, flError] = useFetchPeriodically<FleetList>({
    endpoint: 'fleets',
  });

  const devices = devicesList?.items || [];

  let content: React.ReactNode;
  if (loading || flLoading) {
    content = (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  } else if (error || flError) {
    content = <ErrorAlert error={error || flError} />;
  } else {
    content = (
      <Stack>
        <StackItem>
          <TextContent>
            <Text component={TextVariants.small}>{t('{{count}} Devices', { count: devices.length || 0 })}</Text>
          </TextContent>
        </StackItem>
        {!!devices.length && (
          <StackItem>
            <Flex justifyContent={{ default: 'justifyContentSpaceAround' }}>
              <FlexItem>
                <ApplicationStatusChart resources={devices} />
              </FlexItem>
              <FlexItem>
                <DeviceStatusChart resources={devices} />
              </FlexItem>
              <FlexItem>
                <SystemUpdateStatusChart resources={devices} />
              </FlexItem>
            </Flex>
          </StackItem>
        )}
      </Stack>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Flex alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <CardTitle>{t('Status')}</CardTitle>
          </FlexItem>
          <FlexItem>
            <StatusCardFilters
              devices={devices}
              fleets={fleetsList?.items || []}
              selectedFleets={fleets}
              setSelectedFleets={setFleets}
              selectedLabels={labels}
              setSelectedLabels={setLabels}
            />
          </FlexItem>
        </Flex>
      </CardHeader>
      <CardBody>{content}</CardBody>
    </Card>
  );
};

export default StatusCard;
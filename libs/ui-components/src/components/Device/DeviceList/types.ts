import { DeviceSummaryStatus, FilterSearchParams } from '../../../utils/status/devices';
import { StatusItem } from '../../../utils/status/common';
import { ApplicationsSummaryStatusType, DeviceSummaryStatusType, DeviceUpdatedStatusType } from '@flightctl/types';
import { EnrollmentRequestStatus } from '../../../utils/status/enrollmentRequest';

type FilterOptionsProps<T extends DeviceSummaryStatus> = {
  items: Array<StatusItem<T>>;
  selectedFilters: Array<T>;
  onClick: (value: string) => void;
};

export type FilterOptionsFC = <T extends DeviceSummaryStatus>(props: FilterOptionsProps<T>) => JSX.Element[];

export type FilterStatusMap = {
  [FilterSearchParams.AppStatus]: ApplicationsSummaryStatusType[];
  [FilterSearchParams.DeviceStatus]: (DeviceSummaryStatusType | EnrollmentRequestStatus.Pending)[];
  [FilterSearchParams.UpdatedStatus]: DeviceUpdatedStatusType[];
};

export type UpdateStatus = (statusType: keyof FilterStatusMap, status?: string) => void;

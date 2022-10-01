import React from 'react';
import { WorkingHour } from '../models/working-hour';
import { ItemActions } from './ItemActions';

export const WorkingHourItem = ({ workingHour }: { workingHour: WorkingHour; }) => {
  return (
    <tr>
      <td className="p-4">{ workingHour.id }</td>
      <td className="p-4">{ workingHour.day }</td>
      <td className="p-4">{ workingHour.open }</td>
      <td className="p-4">{ workingHour.close }</td>
      <ItemActions editPath={`${workingHour.id}/update`} deletePath={`${workingHour.id}/delete`} />
    </tr>
  );
}

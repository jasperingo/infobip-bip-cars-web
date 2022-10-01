import React, { ReactNode } from 'react';

export const Table = <T,>({ items, headings, emptyText, render }: { headings: string[]; items: T[]; emptyText: string; render(item: T): ReactNode; }) => {
  return (
    <div className="bg-white overflow-auto rounded-lg p-4">
      <table className="w-full border rounded-lg">
        <thead>
          <tr>
            {
              headings.map((heading) => <th key={heading} className="p-4 border-b text-left">{ heading }</th>)
            }
          </tr>
        </thead>
        <tbody>
          { 
            items.length > 0 ? items.map(render) : (
              <tr>
                <td colSpan={headings.length} className="text-center p-4 font-bold">{ emptyText }</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

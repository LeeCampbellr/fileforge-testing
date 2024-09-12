import React from "react";
import { CSS, Margins, PageBreak, Tailwind } from "@fileforge/react-print";
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { scenarios, chartData } from "./data";

export const Document = () => {
  return (
    <>
      <Tailwind>
        <div className="border rounded-lg my-10">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-slate-900">
              Simulation Summary
            </h3>
          </div>

          <div className="flex flex-row border-t w-full">
            {scenarios.map((scenario, index) => {
              const allocations = scenario.allocations;

              return (
                <div
                  key={index}
                  className="border-r last:border-none grow w-full p-4"
                >
                  <h2 className="text-md font-semibold text-slate-900">
                    {scenario.title}
                  </h2>

                  <PieChart width={80} height={80}>
                    <Pie
                      cx="50%"
                      cy="50%"
                      innerRadius="40%"
                      outerRadius="85%"
                      data={scenario.allocationsChart}
                      dataKey="value"
                      nameKey="name"
                      fill="#8884d8"
                    />
                  </PieChart>

                  {allocations.map((allocation, index) => {
                    return (
                      <ul
                        key={index}
                        className="list-none w-full flex flex-col"
                      >
                        <li className="flex flex-row justify-between w-full text-xs text-slate-900">
                          {allocation.name} {allocation.weight}%
                        </li>

                        {allocation.assets.map((asset, index) => {
                          return (
                            <li
                              key={index}
                              className="flex flex-row justify-between ml-4 w-full text-xs text-slate-600"
                            >
                              {asset.name} {asset.weight}%
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold text-slate-900">Performance</h3>
          <p className="text-xs text-slate-600">As of: Simulation End Date</p>

          <LineChart
            data={chartData}
            width={680}
            height={400}
            margin={{ top: 12, right: 0, bottom: 12, left: 12 }}
            className="w-full aspect-auto"
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#E6E8EB"
              horizontal={false}
            />

            <XAxis
              type="number"
              dataKey="date"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(timestamp) => timestamp}
              axisLine={false}
              tickLine={{ stroke: "#C1C8CD" }}
            />

            <YAxis
              axisLine={false}
              tickLine={{ stroke: "#C1C8CD" }}
              tickCount={10}
              padding={{ top: 0, bottom: 4 }}
              allowDecimals={false}
              label={{
                value: "Returns",
                angle: -90,
                position: "insideLeft",
                offset: -4,
              }}
            />

            <Line
              dot={false}
              type="monotone"
              dataKey="Portfolio"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              dot={false}
              type="monotone"
              dataKey="Scenario 1"
              stroke="#84d89c"
              activeDot={{ r: 8 }}
            />
            <Line
              dot={false}
              type="monotone"
              dataKey="Scenario 2"
              stroke="#d88484"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>

        <div className="my-10">
          <h3 className="text-lg font-semibold text-slate-900">Returns</h3>

          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2 text-left text-sm font-semibold"></th>

                  {scenarios.map((scenario, index) => (
                    <th
                      key={index}
                      className="p-2 text-left even:bg-gray-50 text-sm font-semibold"
                    >
                      {scenario.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {scenarios[0].returns.map((returnItem, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 text-left">{returnItem.name}</td>

                    {scenarios.map((scenario, scenarioIndex) => (
                      <td
                        key={scenarioIndex}
                        className="p-2 text-left even:bg-gray-50 text-sm"
                      >
                        {scenario.returns[index].value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">Statistics</h3>

          <div className="">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2 text-left text-sm font-semibold"></th>

                  {scenarios.map((scenario, index) => (
                    <th
                      key={index}
                      className="p-2 text-left even:bg-gray-50 text-sm font-semibold"
                    >
                      {scenario.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {scenarios[0].statistics.map((statistic, statIndex) => (
                  <tr key={statIndex} className="border-t">
                    <td className="p-2 text-left text-sm font">
                      {statistic.name}
                    </td>

                    {scenarios.map((scenario, scenarioIndex) => (
                      <td
                        key={scenarioIndex}
                        className="p-2 text-left even:bg-gray-50 text-sm"
                      >
                        {scenario.statistics[statIndex].value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PageBreak />

          <div>
            <h3 className="text-2xl font-semibold text-slate-900">
              Disclosures
            </h3>

            <p className="text-xs text-slate-600">
              This tool is provided on an &quot;as-is&quot; basis. Bitwise
              expressly disclaims all warranties, express or implied, statutory
              or otherwise with respect to the tool (and any results obtained
              from its use) including, without limitation, all warranties or
              merchantability, fitness for a particular purpose or use,
              accuracy, completeness, originality and/or non-infringement. In no
              event shall Bitwise have any liability for any claims, damages,
              obligations, liabilities or losses relating to the tool including,
              without limitation, any liability for any direct, indirect,
              special, incidental, punitive and/or consequential damages
              (including loss of profits or principal).
              <br />
              <br />
              Bitwise and the Bitwise Funds are not sponsored, endorsed, issued,
              sold or promoted by any of the data providers, Fund issuers, or
              index providers identified in the tool.
              <br />
              <br />
              Back-tested performance is not indicative of future results.
            </p>
          </div>
        </div>
      </Tailwind>
    </>
  );
};

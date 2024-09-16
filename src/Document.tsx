import React, { useMemo } from "react";
import dayjs from "dayjs";
import {
  CSS,
  Margins,
  PageBreak,
  PageTop,
  Tailwind,
  PageBottom,
  PageNumber,
  PagesNumber,
} from "@fileforge/react-print";
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";

import Logo from "./logo";
import { scenarios, chartData, asOfDate } from "./data";

export const Document = () => {
  const ticks = useMemo(() => {
    const years = new Set<number>();
    return chartData
      .filter((data) => {
        const year = dayjs(data.date).year();
        if (!years.has(year)) {
          years.add(year);
          return true;
        }
        return false;
      })
      .map((data) => data.date);
  }, [chartData]);

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            fontFamily: {
              neue: ["Neue Montreal", "sans-serif"],
            },
            fontSize: {
              sm: ["10px", "12px"],
              base: ["12px", "14px"],
              lg: ["16px", "20px"],
              xl: ["20px", "24px"],
              "2xl": ["40px", "40px"],
              "3xl": ["60px", "60px"],
              "4xl": ["80px", "80px"],
              "5xl": ["100px", "100px"],
            },
            colors: {
              "slate-50": "#FBFCFD",
              "slate-900": "#1A1D1E",
            },
          },
        },
      }}
    >
      <CSS>
        {`
          @font-face {
            font-family: 'Neue Montreal';
            src: url('PPNeueMontreal-Medium.ttf') format('truetype');
            font-weight: "500";
            font-style: normal;
          }

          @font-face {
            font-family: 'Neue Montreal';
            src: url('PPNeueMontreal-Regular.ttf') format('truetype');
            font-weight: "400";
            font-style: normal;
          }

          @page {
            background-color: #FFFFFF;
          }
          @page:first {
            background-color: #1A1D1E;
          }
        `}
      </CSS>
      {/* MARGINS */}
      <Margins pageRatio="A4" top="40" right="40" left="40" bottom="40" />

      {/* FOOTER */}
      <PageBottom>
        <div className="flex flex-row justify-between">
          <div className="text-sm text-slate-800 flex flex-row">
            <p className="mr-3">bitwiseinvestments.com</p>
            <p>Institutional Use Only / Not for Retail Use</p>
          </div>

          <div className="text-sm text-slate-800 flex flex-row">
            <PageNumber counterStyle="decimal" />
            {" of "}
            <PagesNumber counterStyle="decimal" />
          </div>
        </div>
      </PageBottom>

      <div className="font-neue">
        {/* COVER PAGE */}
        <div className="h-[100vh]">
          <div className="h-[100vh] flex flex-col justify-between items-start">
            <Logo className="text-slate-100" />

            <div className="">
              <h1 className="text-slate-100 font-medium text-3xl mb-4">
                Portfolio Analysis
              </h1>
              <p className="text-slate-400 text-lg">
                {dayjs(asOfDate.asOfDate).format("MMM DD, YYYY")}
              </p>
            </div>

            <div className="pb-8">
              <p className="text-slate-300 font-semibold text-base mb-3">
                Risks and Important Information
              </p>

              <p className="text-slate-400 text-base">
                Performance of an index is not illustrative of any particular
                investment. It is not possible to invest directly in an index.
                Index performance does not include the fees and expenses that
                are charged by any Fund. Actual returns of investing in any
                Bitwise Fund may differ materially from hypothetical,
                back-tested returns. Historical performance of Bitcoin (BTC) is
                not illustrative of the performance of the Bitwise Bitcoin Fund
                or any other Bitwise Fund. The returns of Bitcoin are historical
                and unaudited and do not represent the returns of an actual
                account. These historical returns do not include the fees and
                expenses that are charged by any Fund. Actual Fund returns may
                differ materially from the historical returns of Bitcoin (BTC).
                <br />
                <br />
                This tool is provided on an "as-is" basis. Bitwise expressly
                disclaims all warranties, express or implied, statutory or
                otherwise with respect to the tool (and any results obtained
                from its use) including, without limitation, all warranties or
                merchantability, fitness for a particular purpose or use,
                accuracy, completeness, originality and/or non-infringement. In
                no event shall Bitwise have any liability for any claims,
                damages, obligations, liabilities or losses relating to the tool
                including, without limitation, any liability for any direct,
                indirect, special, incidental, punitive and/or consequential
                damages (including loss of profits or principal).
                <br />
                <br />
                Data provided by IEX. View IEX's Terms of Use.
                <br />
                <br />
                For use with Institutions only, not for use with retail
                investors.
                <br />
                <br />
                This tool is provided on an "as-is" basis. Bitwise expressly
                disclaims all warranties, express or implied, statutory or
                otherwise with respect to the tool (and any results obtained
                from its use) including, without limitation, all warranties or
                merchantability, fitness for a particular purpose or use,
                accuracy, completeness, originality and/or non-infringement. In
                no event shall Bitwise have any liability for any claims,
                damages, obligations, liabilities or losses relating to the tool
                including, without limitation, any liability for any direct,
                indirect, special, incidental, punitive and/or consequential
                damages (including loss of profits or principal).
                <br />
                <br />
                Bitwise and the Bitwise Funds are not sponsored, endorsed,
                issued, sold or promoted by any of the data providers, Fund
                issuers, or index providers identified in the tool. Back-tested
                performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>

        {/* SIMULATION PAGE */}
        <div>
          <Logo className="text-slate-900 mb-6" />

          <div className="flex flex-col bg-slate-50 border border-slate-200 rounded-md p-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Simulation Summary</h3>
            </div>

            <div className="flex flex-row w-full gap-4">
              {scenarios.map((scenario, index) => {
                const allocations = scenario.allocations;

                const colors = {
                  "Domestic Equity": "#0A354C",
                  "Global Equity": "#416880",
                  "Fixed Income": "#75A0B7",
                  Alternatives: "#ACDCF2",
                  Crypto: "#39DB80",
                };

                return (
                  <div
                    key={index}
                    className="flex flex-col grow px-4 first:pl-0 last:pr-0"
                  >
                    <PieChart width={64} height={64}>
                      <Pie
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="90%"
                        data={scenario.allocationsChart}
                        dataKey="value"
                        nameKey="name"
                        fill="#8884d8"
                      >
                        {scenario.allocationsChart.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[entry.name]}
                          />
                        ))}
                      </Pie>
                    </PieChart>

                    <h2 className="text-base font-semibold mb-1">
                      {scenario.title}
                    </h2>

                    {allocations.map((allocation, index) => {
                      return (
                        <ul key={index}>
                          <li className="flex flex-row justify-between text-sm py-0.5">
                            <span className="font-medium text-slate-800">
                              {allocation.name}
                            </span>
                            <span className="font-semibold text-slate-900">
                              {allocation.weight}%
                            </span>
                          </li>

                          {allocation.assets.map((asset, index) => {
                            return (
                              <li
                                key={index}
                                className="flex flex-row justify-between gap-2 text-sm pl-2"
                              >
                                <span className="font-normal text-slate-500">
                                  {asset.name}
                                </span>
                                <span className="font-semibold text-slate-900">
                                  {asset.weight}%
                                </span>
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

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Performance</h3>

            <LineChart
              data={chartData}
              width={710}
              height={280}
              margin={{ top: 12, right: 0, bottom: 0, left: 8 }}
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
                tickFormatter={(timestamp) => dayjs(timestamp).format("YYYY")}
                axisLine={false}
                tickLine={{ stroke: "#C1C8CD" }}
                ticks={ticks}
                tick={{ fontSize: 10 }}
                padding={{ bottom: 4 }}
              />

              <YAxis
                axisLine={false}
                tickLine={{ stroke: "#C1C8CD" }}
                tickCount={10}
                padding={{ top: 0, bottom: 4 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fontSize: 10 }}
                allowDecimals={false}
                label={{
                  value: "Returns",
                  angle: -90,
                  position: "insideLeft",
                  offset: -4,
                  fontSize: 10,
                }}
              />

              <Legend wrapperStyle={{ fontSize: 8, bottom: -12 }} />

              {scenarios.map((scenario, index) => {
                const colors = ["#416880", "#39DB80", "#00B54E", "#067B39"];

                return (
                  <Line
                    key={index}
                    dot={false}
                    type="monotone"
                    dataKey={scenario.title}
                    stroke={colors[index]}
                  />
                );
              })}
            </LineChart>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-1">Performance Returns</h3>
            <p className="text-sm text-slate-500">
              As of: {dayjs(asOfDate.asOfDate).format("MMM DD, YYYY")}
            </p>

            <div className="overflow-x-auto -mt-7">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th
                      className="text-left py-2"
                      colSpan={scenarios[0].returns.length - 3}
                    ></th>
                    <th
                      className="font-semibold text-center py-2 border-b border-slate-700"
                      colSpan={4}
                    >
                      Annualized
                    </th>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <th className=" font-semibold text-left py-2 pr-4"></th>

                    {scenarios[0].returns.map((returnItem, index) => (
                      <th
                        key={index}
                        className=" font-semibold text-right py-2 last:pr-0 w-[10%] align-bottom"
                      >
                        {returnItem.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((scenario, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 last:border-none"
                    >
                      <td className="py-1 pr-4 font-semibold">
                        {scenario.title}
                      </td>

                      {scenario.returns.map((returnItem, index) => (
                        <td
                          key={index}
                          className="text-right py-1 last:pr-0 w-[10%]"
                        >
                          {returnItem.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-semibold">Statistics</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm -mt-2">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left pr-4 px-4"></th>

                    {scenarios[0].statistics.map((statistic, index) => (
                      <th key={index} className="text-right py-1 last:pr-0">
                        {statistic.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {scenarios.map((scenario, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 last:border-none"
                    >
                      <td className="py-1 pr-4 font-semibold">
                        {scenario.title}
                      </td>

                      {scenario.statistics.map((statistic, index) => (
                        <td key={index} className="text-right py-1 last:pr-0">
                          {statistic.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Tailwind>
  );
};

import React, { useState } from "react";
import { Table, Pagination } from "@mantine/core";
import data from "../utils";
import { AverageYieldData, CropData, ProcessedData } from "../types/cropDataTypes";
import BarChart from "./Charts";

const processTableData = (data: CropData[]): ProcessedData[] => {
  const yearlyData: Record<string, { crop: string; production: number }[]> = {};

  data.forEach((entry) => {
    const yearMatch = entry.Year.match(/\d+/);
    if (!yearMatch) return;
    const year = yearMatch[0];
    const crop = entry["Crop Name"];
    const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"] as string) || 0;

    if (!yearlyData[year]) {
      yearlyData[year] = [];
    }

    yearlyData[year].push({ crop, production });
  });

  return Object.entries(yearlyData).map(([year, crops]) => {
    const maxCrop = crops.reduce((a, b) => (a.production > b.production ? a : b));
    const minCrop = crops.reduce((a, b) =>
      a.production > 0 && (b.production === 0 || a.production < b.production) ? a : b
    );

    return {
      year,
      maxCrop: { name: maxCrop.crop, production: maxCrop.production },
      minCrop: { name: minCrop.crop, production: minCrop.production },
    };
  });
};

const calculateAverageYield = (data: CropData[]): AverageYieldData[] => {
  const cropStats: Record<string, { total: number; count: number }> = {};

  data.forEach((entry) => {
    const year = parseInt(entry.Year.match(/\d+/)?.[0] || "0", 10);
    if (year < 1950 || year > 2020) return;

    const crop = entry["Crop Name"];
    const production = parseFloat(entry["Crop Production (UOM:t(Tonnes))"] as string) || 0;

    if (!cropStats[crop]) {
      cropStats[crop] = { total: 0, count: 0 };
    }

    cropStats[crop].total += production;
    cropStats[crop].count += 1;
  });

  return Object.entries(cropStats).map(([name, stats]) => ({
    name,
    averageYield: stats.count > 0 ? stats.total / stats.count : 0,
  }));
};

const aggregatedTableData = processTableData(data);
const averageYieldData = calculateAverageYield(data);

const CropTable: React.FC = () => {
  const rowsPerPage = 10;
  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = aggregatedTableData.slice(startIndex, endIndex);

    return (
    <div>
      <BarChart
        data={averageYieldData.map((item) => ({
          name: item.name,
          yield: item.averageYield,
        }))}
      />
      <hr />
      <h2 className="table-heading">Agriculture Crops Data</h2>
      <div className="table-container">
        <Table highlightOnHover>
          <Table.Thead className="table-head">
            <Table.Tr>
              <Table.Th>Year</Table.Th>
              <Table.Th>Crop with Maximum Production</Table.Th>
              <Table.Th>Crop with Minimum Production</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedData.map((row, index) => (
              <Table.Tr key={index}>
                <Table.Td>{row.year}</Table.Td>
                <Table.Td>
                  {row.maxCrop.name}-{row.maxCrop.production}
                </Table.Td>
                <Table.Td>
                  {row.minCrop.name}-{row.minCrop.production}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
      <Pagination
        className="pagination-right"
        value={activePage}
        onChange={setActivePage}
        total={Math.ceil(aggregatedTableData.length / rowsPerPage)}
        mt="md"
      />
    </div>
  );
};

export default CropTable;
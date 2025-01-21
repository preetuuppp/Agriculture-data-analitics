
# Overview
This project involves implementing data visualization for the Indian Agriculture dataset (provided by NITI Aayog) using TypeScript and Vite. The task includes creating a table and bar chart to display insights about crop production over the years. The visual components are developed using Mantine v7 and Apache ECharts.

## Deployed link -- https://agriculture-data-analitics.vercel.app/

## Screenshots

![Screenshot 2025-01-21 100744](https://github.com/user-attachments/assets/f4ff868a-1444-4c28-9ac9-81c5982957a4)

![Screenshot 2025-01-21 100723](https://github.com/user-attachments/assets/67ad434c-7a90-4acc-9a2d-4d49299bd4d6)

## Languages/Libraries/Tools Used
1.TypeScript
2.Vite Min Template 
3.Mantine v7 for table implementation
4.Apache ECharts for bar chart visualization 
5.Yarn for package management

# Features
## Table Component

--> Aggregates crop data to display the crop with maximum and minimum production 
    for each year from 1950 to 2020.
--> Implemented using Mantine v7.
## Columns:

--> Year
--> Crop with Maximum Production in that Year
--> Crop with Minimum Production in that Year
## Bar Chart Component

--> Aggregates crop data to display the average yield of each crop between 1950 and 2020.
--> X-axis: Crop Name
--> Y-axis: Average Yield
--> Implemented using Apache ECharts.

# Getting Started
### Prerequisites
--> Ensure you have Node.js and Yarn installed .

### Steps to Run the Project
1.Clone the repository:

git clone https://github.com/preetuuppp/Agriculture-data-analitics.git
cd Agriculture-data-analitics

2.Install dependencies:
yarn install

3.Run the project:
yarn run dev




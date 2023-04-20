import { TagColours } from '@portal/constants/annotation';
import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartData } from './annotator';

type TimelineGraphProps = {
    chartData: ChartData[];
    featureTags: any;
    onClick: (event: number) => void;
}

const xAxisTickFormatter = (( timestamp: number ) => {
  return (timestamp/1000).toString();
})

const handleGetTagHashColour = (tagid: number): string => {
  return TagColours[tagid % TagColours.length];
};

const TimelineGraph = memo(({ chartData, featureTags, onClick }: TimelineGraphProps) => {

  while (!chartData) {
    return (<></>)
  }

  console.log("timelinegraph rendered")

  return (
    <LineChart 
    width={600} 
    height={120} 
    data={chartData} 
    onClick={(event) => onClick(parseInt(event.activeLabel as string))}
    >
      <XAxis dataKey="timestamp" tickFormatter={xAxisTickFormatter}/>
      <YAxis />
      <Tooltip position={{x:600, y:-30}} allowEscapeViewBox={{y:true}} />
      {Object.keys(featureTags).map((tagname) => (
        <Line 
          key={tagname} 
          type="monotone" 
          dataKey={tagname} 
          stroke={handleGetTagHashColour(featureTags[tagname])} 
          dot={false} 
        />
      ))}
    </LineChart>
  );
});

export default TimelineGraph;

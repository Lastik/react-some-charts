import React, {useEffect, useRef} from 'react';
import {DataSet, Sorting} from "some-charts";
import {BarsPlot} from "react-some-charts";
import {Chart} from "react-some-charts";
import {XY} from "./model/x-y";
import {getRandomInt} from "../../functions";

export function Bars() {
  const dataSet = useRef(new DataSet<XY, string>(
      [{
        x: 'first',
        y1: 10,
        y2: 15,
      }, {
        x: 'second',
        y1: 20,
        y2: 25,
      }, {
        x: 'third',
        y1: 30,
        y2: 35,
      }, {
        x: 'fourth',
        y1: 15,
        y2: 20,
      }],
      {
        y1: {
          func: item => {
            return item.y1
          }
        },
        y2: {
          func: item => {
            return item.y2
          }
        }
      },
      item => {
        return item.x
      },
      undefined,
      Sorting.None
  ));

  useEffect(() => {

    let timeout: NodeJS.Timeout | null = null;

    const updateDataSet = () => {
      dataSet.current?.update([{
        x: 'first',
        y1: getRandomInt(8, 12),
        y2: getRandomInt(15, 20),
      }, {
        x: 'second',
        y1: getRandomInt(8, 12),
        y2: getRandomInt(15, 20),
      }, {
        x: 'third',
        y1: getRandomInt(8, 12),
        y2: getRandomInt(15, 20),
      }, {
        x: 'fourth',
        y1: getRandomInt(8, 12),
        y2: getRandomInt(15, 20),
      }])
      timeout = setTimeout(updateDataSet, 4000);
    }

    updateDataSet();

    return () => {
      timeout && clearTimeout(timeout);
    }

  }, []);

  return (
      <Chart dataSet={dataSet.current}
             navigation={{isFitToViewModeEnabled: true}} header={{text: 'S Plot'}}
             width={350} height={300}>
        <BarsPlot metrics={[{
          id: 'y1',
          caption: 'Y1',
          color: "#D24E4D"
        }, {
          id: 'y2',
          caption: 'Y2',
          color: "#43bc82"
        }]} animate={true}></BarsPlot>
      </Chart>
  );
}

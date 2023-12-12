import React, {useEffect, useRef} from 'react';
import {XY} from "./model/XY";
import {DataSet, PlotKind} from "some-charts";
import {MarkerPlot} from "react-some-charts";
import {Chart} from "react-some-charts";

export function Marker() {

    const amplitude = 40;
    const frequency = 10;
    const height = 200;

    function generateSinData(origin: number, count: number): XY[]{
        // @ts-ignore
        return [...Array(count).keys()].map((val, idx) => {
            let x = (idx + origin);
            let y = height / 2 + amplitude * Math.sin(x / frequency);
            return {x, y}
        })
    }

    const origin = useRef(0);
    const count = 300;
    const data = useRef(generateSinData(origin.current, count));
    origin.current = 300 + 1;

    const dataSet = useRef(new DataSet<XY, number>(
        data.current,
        {
            y: {
                func: item => {
                    return item.y
                }
            }
        },
        item => {
            return item.x
        }
    ));

    let prevTime = useRef(0);

    useEffect(() => {

        let animationId: number | null = null;
        let updateChartData = function(time: number){

            let timePassed = time - prevTime.current;

            if(timePassed > 1000 / 60) {
                const currentData = data.current;

                currentData.shift()
                currentData.push(generateSinData(origin.current, 1)[0]);
                origin.current++;
                dataSet.current.update(currentData);

                prevTime.current = time;
            }

            animationId = requestAnimationFrame(updateChartData);
        }

        updateChartData(prevTime.current);

        return () => {
            animationId && cancelAnimationFrame(animationId);
        }

    }, []);

  return (
      <Chart dataSet={dataSet.current}
             navigation={{isFitToViewModeEnabled: true}} header={{text: 'Sin Plot'}}
             width={450} height={300}>
          <MarkerPlot metric={{
              id: "y",
              caption: "Data",
              color: "#ff392e"
          }} markerSize={5}></MarkerPlot>
      </Chart>
  );
}

import React, {LegacyRef, useEffect, useRef, Children, PropsWithChildren, MutableRefObject} from 'react';
import {ChartProps} from "./chart-props";
import {PlotKind, PlotOptions} from "some-charts";
import {Chart as JsChart} from 'some-charts';

type ChartPropsWithPlots<
    TItemType = any,
    XDimensionType extends number | string | Date = number | string | Date,
    YDimensionType extends number | string | Date | undefined = undefined> =
    ChartProps<TItemType, XDimensionType, YDimensionType> & {
    plots?: Array<PlotOptions>;
};

export function Chart<
    TItemType = any,
    XDimensionType extends number | string | Date = number | string | Date,
    YDimensionType extends number | string | Date | undefined = undefined>(
        props: PropsWithChildren<ChartProps<TItemType, XDimensionType, YDimensionType>>) {

    const ref: LegacyRef<HTMLDivElement> = useRef(null);
    const chart: MutableRefObject<JsChart<TItemType, XDimensionType, YDimensionType> | null> = useRef(null);

    useEffect(() => {
        const element = ref.current!;

        const plots = Children.map(props.children, child => {
            if(!React.isValidElement(child)){
                return null;
            }
            const plotOptions = child.props as PlotOptions
            let plotKind: PlotKind | null = null;
            if(child.type instanceof Function){
                const plotName = child.type.name;
                switch (plotName){
                    case 'MarkerPlot':
                        plotKind = PlotKind.Marker;
                        break;
                    case 'BarsPlot':
                        plotKind = PlotKind.Bars;
                        break;
                }
            }
            if(plotKind) {
                return {...plotOptions, kind: plotKind};
            }
            return plotOptions;
        });

        let propsWithPlots: ChartPropsWithPlots<TItemType, XDimensionType, YDimensionType> = {
            ...props, plots: plots ?? []
        };

        if(!chart.current) {
            chart.current = new JsChart<TItemType, XDimensionType, YDimensionType>(
                element,
                props.dataSet,
                propsWithPlots
            )
        }

        return ()=> {
            chart.current?.dispose();
            chart.current = null;
        }
    }, [props.skin, props.navigation, props.axes, props.grid, props.legend, props.renderer, props.children]);

    useEffect(() => {
        if(props.visibleRect) {
            chart.current?.update(props.visibleRect);
        }
    }, [props.visibleRect]);

    useEffect(() => {
        if(props.dataSet) {
            chart.current?.setDataSet(props.dataSet);
        }
    }, [props.dataSet]);

    useEffect(() => {
        chart.current?.resize();
    }, [props.width, props.height]);

    useEffect(() => {
        if(props.header) {
            chart.current?.setHeaderOptions(props.header);
        }
    }, [props.header]);

    return <div ref={ref} style={{
        width: props.width ?? 100,
        height: props.height ?? 100
    }}></div>;
}

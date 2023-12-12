import {ChartOptions, DataRect, DataSet} from "some-charts";

export type ChartProps<
    TItemType = any,
    XDimensionType extends number | string | Date = number | string | Date,
    YDimensionType extends number | string | Date | undefined = undefined> = Omit<ChartOptions, 'plots'> & {
    width?: string | number,
    height?: string | number,
    dataSet: DataSet<TItemType, XDimensionType, YDimensionType>,
    visibleRect?: DataRect<XDimensionType, YDimensionType extends undefined ? number : Exclude<YDimensionType, undefined>> | undefined,
};

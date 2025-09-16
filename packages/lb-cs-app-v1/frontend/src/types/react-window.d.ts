declare module "react-window" {
  import * as React from "react";

  export interface ListChildComponentProps {
    index: number;
    style: React.CSSProperties;
    data: any;
    isScrolling?: boolean;
    isVisible?: boolean;
  }

  export interface FixedSizeListProps<ItemData = any> {
    height: number;
    width: number | string;
    itemCount: number;
    itemSize: number;
    itemData?: ItemData;
    overscanCount?: number;
    children: (props: ListChildComponentProps) => React.ReactNode;
  }

  export class FixedSizeList<ItemData = any> extends React.Component<FixedSizeListProps<ItemData>> {}
  export { FixedSizeList as List };
}

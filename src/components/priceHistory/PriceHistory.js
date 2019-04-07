import React, { Component } from "react";
import { Line, Bar, LinePath } from "@vx/shape";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { scaleTime, scaleLinear } from "@vx/scale";
import { bisector } from "d3-array";
import { format } from "date-fns";
import "./PriceHistory.scss";

const formatDate = date => format(date, "DD/MM/YY");
const xSelector = d => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;

  return new Date(Date.parse(d.date) + offset);
};
const ySelector = d => d.price;

const bisectDate = bisector(xSelector).left;

class PriceHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 400
    };
  }

  componentDidMount() {
    this.divElement.scrollIntoView();

    const { clientWidth } = this.divElement;

    this.setState({ width: clientWidth });
  }

  handleTooltip = ({ event, data, xSelector, xScale, yScale }) => {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xSelector(d0) > xSelector(d1) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(xSelector(d)),
      tooltipTop: yScale(ySelector(d))
    });
  };

  render() {
    const { width, height } = this.state;
    const { data, title, closeCallback } = this.props;
    const { hideTooltip, tooltipData, tooltipTop, tooltipLeft } = this.props;

    const firstPoint = data[0];
    const currentPoint = data[data.length - 1];

    const xScale = scaleTime({
      range: [10, width - 10],
      domain: [xSelector(firstPoint), xSelector(currentPoint)]
    });

    const minPrice = Math.min(...data.map(ySelector));
    const maxPrice = Math.max(...data.map(ySelector));

    const yScale = scaleLinear({
      range: [height - 100, 100],
      domain: [minPrice, maxPrice]
    });

    const tooltipColor = "#333";

    return (
      <div className="price-history" ref={divElement => (this.divElement = divElement)}>
        <div className="row">
          <h3 className="title col-xs-10">{title}</h3>
          <div className="col-xs-2">
            <span className="close-btn custom-btn" onClick={() => closeCallback()}>
              Voltar
            </span>
          </div>
        </div>
        <svg width={width} height={height}>
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={xSelector}
            y={ySelector}
            strokeWidth={5}
            stroke="#15787d"
            strokeLinecap="round"
            fill="transparent"
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            data={data}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xSelector,
                xScale,
                yScale
              })}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: maxPrice }}
                stroke={tooltipColor}
                strokeWidth={4}
                style={{ pointerEvents: "none" }}
                strokeDasharray="4,6"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={tooltipColor}
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop + 100}
              left={tooltipLeft + 10}
              style={{
                backgroundColor: tooltipColor,
                color: "#FFF",
                width: "100px"
              }}
            >
              {`R$ ${ySelector(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={tooltipTop + 120}
              left={tooltipLeft + 10}
              style={{
                backgroundColor: tooltipColor,
                color: "#FFF",
                width: "100px"
              }}
            >
              {formatDate(xSelector(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}

export default withTooltip(PriceHistory);

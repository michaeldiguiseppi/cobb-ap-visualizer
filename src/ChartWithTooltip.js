import React from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { bisector } from 'd3-array';

// util
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xTime = d => d.time;
const yBoost = d => d.boost;
const bisectDate = bisector(d => d.time).left;

class ChartWithTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.handleTooltip = this.handleTooltip.bind(this);
  }
  handleTooltip({ event, data, xTime, xScale, yScale }) {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xTime(d0) > xTime(d1) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d.boost,
      tooltipLeft: x,
      tooltipTop: yScale(d.boost)
    });
  }
  render() {
    const {
      width,
      height,
      margin,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
			events,
			data,
		} = this.props;
		
		if (!data) return null;
    if (width < 10) return null;
		console.warn('yeet this.props', this.props);
    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, xTime)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, yBoost) + yMax / 3],
      nice: true
    });

    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="#32deaa" rx={14} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <AreaClosed
            data={data}
            x={d => xScale(xTime(d))}
            y={d => yScale(yBoost(d))}
            yScale={yScale}
            strokeWidth={1}
            stroke={'url(#gradient)'}
            fill={'url(#gradient)'}
            curve={curveMonotoneX}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            data={data}
            onTouchStart={event =>
              this.handleTooltip({
                event,
                xTime,
                xScale,
                yScale,
                data: data
              })
            }
            onTouchMove={event =>
              this.handleTooltip({
                event,
                xTime,
                xScale,
                yScale,
                data: data
              })
            }
            onMouseMove={event =>
              this.handleTooltip({
                event,
                xTime,
                xScale,
                yScale,
                data: data
              })
            }
            onMouseLeave={event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="rgba(92, 119, 235, 1.000)"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="rgba(92, 119, 235, 1.000)"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white'
              }}
            >
              {`${yBoost(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)'
              }}
            >
              {xTime(tooltipData)}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}

export default withTooltip(ChartWithTooltip);
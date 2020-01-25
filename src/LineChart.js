import React from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { extent, max } from 'd3-array';
import {
	time,
	afCorrection1,
	afLearning1,
	afRatio1,
	boost,
	load,
	feedbackKnock,
	fineKnockLearn,
	ignitionTiming,
	injDutyCycle,
	intakeTemp,
	maf,
	mafVoltage,
	primaryIgnition,
	rpm,
	throttlePosition,
	wastegateDuty,
} from './constants';

const LineChart = ({
	width,
	height,
	data,
	tooltipData,
	tooltipLeft,
	tooltipTop,
	tooltipOpen,
	hideTooltip,
	showTooltip,
}) => {
	console.warn('yeet time', time);
	if (data) {
		// accessors
		// these work
		const x = d => d[time];
		const y = d => d[boost];
		// these don't work, see line 84 for how they're being used
		// const x = (d, property) => d[property];
		// const y = (d, property) => d[property];

		// bounds
		const xMax = width;
		const yMax = height / 8;
	
		// scales
		const xScale = scaleTime({
			range: [0, xMax],
			domain: extent(data, x)
		});
		const yBoostScale = scaleLinear({
			range: [yMax, 0],
			domain: [0, max(data, yBoost)]
		});
		
		const handleMouseOver = (event, datum) => {
			console.warn('yeet event', event);
			const coords = localPoint(event.target.ownerSVGElement, event);
			showTooltip({
				tooltipLeft: coords.x,
				tooltipTop: coords.y,
				tooltipData: datum.boost
			});
		};
	
		return (
			<>
			<svg width={width} height={height}>
				<rect x={0} y={0} width={width} height={height} fill="#242424" rx={14} />
				{xMax > 8 && (
					<Group key={`lines-${1}`} top={1 * yMax / 2}>
						<LinePath
							data={data}
							x={d => xScale(x(d))}
							y={d => yBoostScale(y(d))}
							// these don't work
							// x={d => xScale(x(d, time))}
							// y={d => yScale(y(d, boost))}
							stroke={'#ffffff'}
							strokeWidth={1}
							curve={1 % 2 === 0 ? curveMonotoneX : undefined}
							// onMouseOver={(e) => handleMouseOver(e)}
							// onMouseOut={hideTooltip}
						/>
					</Group>
				)};
			</svg>
			{tooltipOpen && (
          <TooltipWithBounds
            // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            Data value <strong>{tooltipData}</strong>
          </TooltipWithBounds>
        )}
			</>
		);
	}
	return null;
};

export default withTooltip(LineChart);
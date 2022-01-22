// import React from 'react';
// import './BellSchedule.css';
// import Table from 'material-ui/Table/Table';
// import TableBody from 'material-ui/Table/TableBody';
// import TableCell from 'material-ui/Table/TableCell';
// import TableHead from 'material-ui/Table/TableHead';
// import TableRow from 'material-ui/Table/TableRow';
// import Paper from 'material-ui/Paper';
// import CircularProgress from 'material-ui/Progress/CircularProgress';
// import Typography from 'material-ui/Typography';
// import Loadable from './LCEComponent';
// import Card from './Card';
// import WeatherIcon from '../containers/WeatherIconContainer';
// export type Period = {
//   period: string,
//   time: string,
//   current: string,
//   progress: Number
// };
// type Props = {
//   loading: boolean,
//   periods: Period[],
//   error: any,
//   scheduleName: string
// };
// const Loading = (
//   <div className="card-padding center">
//     <CircularProgress />
//   </div>
// );
// const Empty = <div className="card-padding center">No school!</div>;
// const Error = (error: string) => (
//   <div className="card-padding center">{error}</div>
// );
// const BellSchedule = ({
//   periods,
//   loading,
//   error,
//   scheduleName,
//   date
// }: Props) => {
//   const backgroundColorBellSchedule =
//     scheduleName.split(' ')[1] === 'A'
//       ? '#8DE3FF'
//       : scheduleName.split(' ')[1] === 'B' ? '#E0DBFF' : '#ffddf4';
//   const bellBackground = {
//     backgroundColor: backgroundColorBellSchedule
//   };
//   return (
//     <div className="bell-schedule">
//       <Paper>
//         <Loadable
//           loading={loading}
//           data={periods}
//           error={error}
//           LoadingComponent={Loading}
//           EmptyComponent={Empty}
//           ErrorComponent={Error(error)}
//         >
//           <div>
//             {scheduleName !== 'none' && (
//               <Typography
//                 type="title"
//                 className="bell-schedule-name"
//                 style={bellBackground}
//               >
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   {scheduleName}
//                   <WeatherIcon
//                     date={date}
//                     style={{
//                       width: '20px',
//                       aspectRatio: '1',
//                       padding: '0.75em'
//                     }}
//                     class="weather"
//                   />
//                 </div>
//               </Typography>
//             )}
//             <Table id={'table'}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell numeric>Period</TableCell>
//                   <TableCell>Time</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {periods.map((n, i) => {
//                   return (
//                     <TableRow
//                       key={n.period}
//                       id={'period' + n.period}
//                       className={n.current ? 'bell-schedule-current' : ''}
//                     >
//                       {n.current && (
//                         <style>
//                           {`
//                         #period${n.period} {
//                           position: relative;
//                         }
//                         #period${n.period}::after {
//                           content: '';
//                           position: absolute;
//                           bottom: 0;
//                           right: 0;
//                           width: ${(1 - Math.min(Math.max(n.progress, 0), 1)) *
//                             100}%;
//                           height: 2px;
//                           background-color: #448AFF;
//                         }
//                       `}
//                         </style>
//                       )}
//                       <TableCell numeric>{n.period}</TableCell>
//                       <TableCell>{n.time}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </Loadable>
//       </Paper>
//     </div>
//   );
// };
// export default BellSchedule;

// @flow

import React from 'react';

import './BellSchedule.css';

import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Typography from 'material-ui/Typography';
import Loadable from './LCEComponent';
import Card from './Card';
import WeatherIcon from '../containers/WeatherIconContainer';

export type Period = {
  period: string,
  time: string,
  current: string,
  progress: Number
};

type Props = {
  loading: boolean,
  periods: Period[],
  error: any,
  scheduleName: string
};

const Loading = (
  <div className="card-padding center">
    <CircularProgress />
  </div>
);

const Empty = <div className="card-padding center">No school!</div>;

const Error = (error: string) => (
  <div className="card-padding center">{error}</div>
);

const BellSchedule = ({
  periods,
  loading,
  error,
  scheduleName,
  date
}: Props) => {
  // choosing the background color based on schedule (A, B, C, or irregular)
  const backgroundColorBellSchedule =
    scheduleName.split(' ')[1] === 'A'
      ? '#8DE3FF'
      : scheduleName.split(' ')[1] === 'B'
        ? '#E0DBFF'
        : scheduleName.split(' ')[1] === 'C' ? '#ffddf4' : '#ff8088';
  const bellBackground = {
    backgroundColor: backgroundColorBellSchedule
  };
  return (
    <div className="bell-schedule">
      <Paper>
        <Loadable
          loading={loading}
          data={periods}
          error={error}
          LoadingComponent={Loading}
          EmptyComponent={Empty}
          ErrorComponent={Error(error)}
        >
          <div>
            {scheduleName !== 'none' && (
              <Typography
                type="title"
                className="bell-schedule-name"
                style={bellBackground}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {scheduleName}
                  <WeatherIcon
                    date={date}
                    style={{ width: '20px', aspectRatio: '1', padding: '1em' }}
                    class="weather"
                  />
                </div>
              </Typography>
            )}

            <Table id={'table'}>
              <TableHead>
                <TableRow>
                  <TableCell numeric>Period</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {periods.map((n, i) => {
                  return (
                    <TableRow
                      key={n.period}
                      id={'period' + n.period}
                      className={n.current ? 'bell-schedule-current' : ''}
                    >
                      {n.current && (
                        <style>
                          {`
                        #period${n.period} {
                          position: relative;
                        }
                        #period${n.period}::after {
                          content: '';
                          position: absolute;
                          bottom: 0;
                          right: 0;
                          width: ${(1 - Math.min(Math.max(n.progress, 0), 1)) *
                            100}%;
                          height: 2px;
                          background-color: #448aff;
                        }
                      `}
                        </style>
                      )}
                      <TableCell numeric>{n.period}</TableCell>
                      <TableCell>{n.time}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Loadable>
      </Paper>
    </div>
  );
};

export default BellSchedule;

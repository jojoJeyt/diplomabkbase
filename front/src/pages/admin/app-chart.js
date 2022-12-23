import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../../app/admin';
import { selectUi } from '../../app/ui.reducer';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export const AppChart = () => {

  const list = useSelector(selectAdmin).userList;
  const role = useSelector(selectUi).user?.role;


  const chartData = useMemo(() => {

    const data = list.map(( { status }) => status);

    const isManager = role === 'MANAGER';

    const activeCount = data.filter((status) => status === 'ACTIVE').length;
    const closeCount = data.filter((status) => status === 'CLOSE').length;
    const openCount = data.filter((status) => status === 'PENDING').length;


    const colors = isManager ? ['#86cfda', '#8fd19e'] : ['#ed969e', '#86cfda', '#8fd19e'];

    return {
      labels: isManager ? ['Активных', 'Выполненных'] : ['Не назначенных','Активных', 'Выполненных'],
      datasets: [
        {
          data: isManager ? [activeCount, closeCount] : [openCount, activeCount, closeCount],
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    }
  }, [list, role]);


  return <div style={{ width: 400, height: 400, margin: '20px auto' }}>
    <Pie data={chartData} />
  </div>;
}

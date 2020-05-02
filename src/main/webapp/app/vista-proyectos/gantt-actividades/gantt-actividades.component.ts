import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-gantt-actividades',
  templateUrl: './gantt-actividades.component.html',
  styleUrls: ['./gantt-actividades.component.scss']
})
export class GanttActividadesComponent implements OnInit {
  name = 'Angular';

  customColorScheme = ['#DFD6A7', '#D4AFCD', '#F7CE5B', '#AC9969', '#A1D2CE', '#78CAD2', '#62A8AC', '#5497A7', '#50858B', '#2E6171'];
  ganttChartData = [
    {
      name: 'Market Team',
      timelines: {
        'Market Research': [
          { from: 'June 9, 2019', to: 'July 20, 2019', info: 'wtv' },
          { from: 'October 9, 2019', to: 'November 20, 2019', info: 'wtv' }
        ],
        'User Documentation': [{ from: 'August 10, 2019', to: 'September 15, 2019', info: 'wtv' }]
      }
    },
    {
      name: 'Development Team',
      timelines: {
        'Software Development': [{ from: 'July 9, 2019', to: 'October 20, 2019', info: 'wtv' }],
        Testing: [{ from: 'October 25, 2019', to: 'November 15, 2019', info: 'wtv' }],
        'User Documentation': [{ from: 'August 1, 2019', to: 'August 15, 2019', info: 'wtv' }]
      }
    },
    {
      name: 'Test Team A',
      timelines: {
        Testing: [{ from: 'August 1, 2019', to: 'August 15, 2019', info: 'wtv' }]
      }
    },
    {
      name: 'Test Team B',
      timelines: {
        Testing: [{ from: 'August 15, 2019', to: 'August 30, 2019', info: 'wtv' }]
      }
    },
    {
      name: 'Sales Team',
      timelines: {
        Pitching: [{ from: 'July 9, 2019', to: 'October 20, 2019', info: 'wtv' }],
        Sales: [{ from: 'October 25, 2019', to: 'November 15, 2019', info: 'wtv' }]
      }
    },
    {
      name: 'Planning Team',
      timelines: {
        Planning: [{ from: 'May 9, 2019', to: 'May 30, 2019', info: 'wtv' }]
      }
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}

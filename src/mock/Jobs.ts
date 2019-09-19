import { IJob } from '../models/Job';
import { MOCK_COMPANY } from './Companies';

export const MOCK_JOBS: Partial<IJob>[] = [{
  _id: '1',
  company: MOCK_COMPANY,
  name: 'Software Engineer',
  description: 'Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions. Documents and demonstrates solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.',
  education: [{ _id: '1', level: 'Master', field: 'Information Technology' }, { _id: '2', level: 'Bachelor', field: 'Food Science' }]
}, {
  _id: '2',
  company: MOCK_COMPANY,
  name: 'Developer',
  description: 'Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions. Documents and demonstrates solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.',
  education: [{ _id: '1', level: 'Master', field: 'Information Technology' }]
}, {
  _id: '3',
  company: MOCK_COMPANY,
  name: 'CTO',
  description: 'Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions. Documents and demonstrates solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.',
  education: [{ _id: '1', level: 'Master', field: 'Information Technology' }]
}, {
  _id: '4',
  company: MOCK_COMPANY,
  name: 'Project Manager',
  description: 'Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions. Documents and demonstrates solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.',
  education: [{ _id: '1', level: 'Master', field: 'Information Technology' }]
}];
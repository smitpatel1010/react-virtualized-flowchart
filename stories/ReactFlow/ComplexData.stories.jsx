import React from 'react';

import { vertices, edges } from '../complex/complexData';

import Flow from './ReactFlowExample';

const initialState = { vertices, edges };

export default {
  title: 'ReactFlow',
  component: Flow,
};

const Template = args => <Flow {...args} initialState={initialState} />;

export const ComplexData = Template.bind({});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom'; 
import CreateArea from '../CreateArea/Createarea';
import TaskItem from '../CreateArea/TaskItem';
import Home from '../Home';
import Login from '../Login/Login';
import Navbar from '../Navbar';
import {render} from '@testing-library/react' 
import "@testing-library/jest-dom";



it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div); 
  root.render(<CreateArea />); 
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div); 
    root.render(<TaskItem />); 
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div); 
    root.render(<Home/>); 
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div); 
    root.render(<Login />); 
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div); 
    root.render(<Navbar />); 
  });
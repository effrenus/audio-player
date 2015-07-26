/*eslint-disable no-unused-vars*/
import AudioBase from './AudioBase';
import AudioContext from './AudioContext';

const instance = ('AudioContext' in window) ? new AudioContext() : new AudioBase();

export default instance;

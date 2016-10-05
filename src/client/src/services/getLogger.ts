import {LogManager} from 'aurelia-framework';
import {Logger} from 'aurelia-logging';

export function getLogger(moduleId: string): Logger {
  return LogManager.getLogger(moduleId);
}
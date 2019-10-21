/*
  _
 | |__   ___  _ __  _ __   ___ _ __
 | '_ \ / _ \| '_ \| '_ \ / _ \ '__|
 | | | | (_) | |_) | |_) |  __/ |
 |_| |_|\___/| .__/| .__/ \___|_|
             |_|   |_|

  Description: Event builder
  Version: 1.0.1
  License: WTFPL
   Author: CFK <cradexco@gmail.com>
     Repo: https://github.com/cfkarakulak/HopperJS
*/

/* eslint-disable no-param-reassign */

export default class Events {
  constructor() {
    this.events = [];
  }

  add(event) {
    if (event.element) {
      $(document).on(event.event, event.element, (event.data || null), event.handler);
    }

    if (!event.element) {
      if (event.event === 'ready') {
        $(document).ready(event.handler);
      } else {
        $(document).on(event.event, event.handler);
      }
    }

    this.events.push(event);

    return this.events;
  }
}

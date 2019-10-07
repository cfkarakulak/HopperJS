/* eslint-disable no-param-reassign */

export default class Events {
  constructor() {
    this.events = [];
  }

  add(event) {
    if (!event.data) {
      event.data = null;
    }

    if (event.element) {
      $(document).on(event.event, event.element, event.data, event.handler);
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

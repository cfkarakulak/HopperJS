/*
  _
 | |__   ___  _ __  _ __   ___ _ __
 | '_ \ / _ \| '_ \| '_ \ / _ \ '__|
 | | | | (_) | |_) | |_) |  __/ |
 |_| |_|\___/| .__/| .__/ \___|_|
             |_|   |_|

  Description: Main hopper class
  Version: 1.0.1
  License: WTFPL
   Author: CFK <cradexco@gmail.com>
     Repo: https://github.com/cfkarakulak/HopperJS
*/

/* eslint-disable no-unused-vars */

import Defaults from './Helpers/Defaults';
import Events from './Events/Events';

export default class Hopper {
  constructor(options) {
    this.settings = $.extend({}, Defaults, options);

    const events = new Events();
    const act = [];

    $(this.settings.selector).each((i, el) => {
      const attribute = $(el).data(this.settings.selector.match(/\[data-(.*?)\]/)[1]);
      const data = Hopper.explode(attribute);

      if (!act[`${data.event}:${data.flow.join('-')}`]) {
        events.add({
          element: `[data-${data.flow[0]}]`,
          data: {
            selector: this.settings.selector,
            config: data,
          },
          event: data.event,
          handler: this.toggle,
        });

        act[`${data.event}:${data.flow.join('-')}`] = true;
      }
    });
  }

  toggle(event) {
    const $self = $(this);
    const args = event.data;
    const target = `[data-${args.config.flow[1]}='${$self.attr('href').replace('#', '')}']`;
    const $tabs = $self.closest(args.selector).find(`[data-${args.config.flow[0]}]`);
    const $fields = $self.closest(args.selector).find(`[data-${args.config.flow[1]}]`);

    if (typeof $self.data('redirect') !== 'undefined') {
      document.location.href = $self.attr('href');
    }

    if (args.config.recurrence === true) {
      $tabs.filter($self).toggleClass('active');
      $fields.filter(target).toggleClass('active');
    }

    if (args.config.recurrence === false) {
      $tabs.removeClass('active').filter($self).addClass('active');
      $fields.removeClass('active').filter(target).addClass('active');
    }

    if (args.config.lock === true) {
      $('body').toggleClass('no-scroll');
    }

    return false;
  }

  static explode(config) {
    const event = config.includes('with:') ? config.match(/with:\((.*?)\)/)[1] : 'click';
    const flow = config.includes('flow:') ? config.match(/flow:\((.*?)\)/)[1].split('->') : false;
    const recurrence = config.includes('recurrence:') ? Boolean(config.match(/recurrence:\((.*?)\)/)[1]) : false;
    const lock = config.includes('lock:') ? Boolean(config.match(/lock:\((.*?)\)/)[1]) : false;

    return {
      event, flow, recurrence, lock,
    };
  }
}

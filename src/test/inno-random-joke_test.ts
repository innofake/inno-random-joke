import { InnoRandomJoke } from '../inno-random-joke.js';

import { assert } from '@open-wc/testing';
// import { html } from 'lit/static-html.js';

suite('inno-random-joke', () => {
    test('is defined', () => {
        const el = document.createElement('inno-random-joko');
        assert.instanceOf(el, InnoRandomJoke);
      });
});
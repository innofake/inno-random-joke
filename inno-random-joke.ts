import { LitElement, html, nothing, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Displays a random joke, queried from https://v2.jokeapi.dev/.
 * 
 * @example 
 * <inno-random-joke interval="5"></inno-random-joke>
 * 
 * @element
 * inno-random-joke
 * 
 * @property {string} [interval=0] - Interval in seconds between displaying a new joke.
 * 
 * @cssprop --inno-random-joke-font-family - Font family to use.
 * @cssprop --inno-random-joke-font-size - Font size to use.
 * @cssprop --inno-random-joke-font-weight - Font weight to use.
 * @cssprop --inno-random-joke-text-align - Align text horizontally.
 */
@customElement('inno-random-joke')
export class InnoRandomJoke extends LitElement {

    @state()
    _joke = null;

    @property({ type: Number })
    interval = 0;

    override connectedCallback() {
        super.connectedCallback();

        this._getJoke();
    }

    private _getJoke() {

        fetch('https://v2.jokeapi.dev/joke/Programming?type=single&safe-mode')
            .then(response => response.json())
            .then(data => {
                this._joke = data.joke;
            });

            if (this.interval && this.interval > 0) {
                setTimeout(() => {
                    this._getJoke();
                }, this.interval * 1000);
            }
    }

    static override styles = css`
    
        div {
            font-family: var(--inno-random-joke-font-family, Arial);
            font-size: var(--inno-random-joke-font-size, 12px);
            font-weight: var(--inno-random-joke-font-weight, normal);
            text-align: var(--inno-random-joke-text-align, center);
        }
    `;

    override render() {

        return this._joke
            ? html`<div>${this._joke}</div>`
            : nothing;
    }
}
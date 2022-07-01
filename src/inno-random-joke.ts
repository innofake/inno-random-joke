import { LitElement, html, nothing, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
            text-align: center;
            /* ext-transform: uppercase;
            text-decoration: underline; */
        }
    `;

    override render() {

        return this._joke
            ? html`<div>${this._joke}</div>`
            : nothing;
    }
}